document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const selectedRoomType = document.getElementById('selectedRoomType');
    const selectedRoomLocation = document.getElementById('selectedRoomLocation');
    const selectedRoomPrice = document.getElementById('selectedRoomPrice');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkInDateInput = document.getElementById('checkInDate');
    const checkOutDateInput = document.getElementById('checkOutDate');
    const numGuestsInput = document.getElementById('numGuests');

    let selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'));

    if (!selectedRoom) {
        alert('No room selected. Please go back to search rooms.');
        window.location.href = 'search.html';
        return;
    }

    // Populate room details
    selectedRoomType.textContent = selectedRoom.type;
    selectedRoomLocation.textContent = selectedRoom.location;
    selectedRoomPrice.textContent = selectedRoom.price.toFixed(2);

    const calculateTotalPrice = () => {
        const checkIn = new Date(checkInDateInput.value);
        const checkOut = new Date(checkOutDateInput.value);

        if (checkIn && checkOut && checkOut > checkIn) {
            const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const total = selectedRoom.price * diffDays;
            totalPriceElement.textContent = total.toFixed(2);
        } else {
            totalPriceElement.textContent = '0.00';
        }
    };

    checkInDateInput.addEventListener('change', calculateTotalPrice);
    checkOutDateInput.addEventListener('change', calculateTotalPrice);
    numGuestsInput.addEventListener('input', calculateTotalPrice); // Recalculate if guests influence price (not implemented in this mock, but good to have)

    // Set min date for check-in to today
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    checkInDateInput.min = todayString;

    // Set min date for check-out (at least one day after check-in)
    checkInDateInput.addEventListener('change', () => {
        const checkIn = new Date(checkInDateInput.value);
        checkOutDateInput.min = new Date(checkIn.setDate(checkIn.getDate() + 1)).toISOString().split('T')[0];
        calculateTotalPrice(); // Recalculate if check-in changes
    });

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const checkInDate = checkInDateInput.value;
        const checkOutDate = checkOutDateInput.value;
        const numGuests = parseInt(numGuestsInput.value);
        const totalPrice = parseFloat(totalPriceElement.textContent);

        // Basic validation
        if (!fullName || !email || !phone || !checkInDate || !checkOutDate || !numGuests) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!isValidPhone(phone)) {
            alert('Please enter a valid phone number (e.g., +237 6XX XXX XXX).');
            return;
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkOut <= checkIn) {
            alert('Check-out date must be after check-in date.');
            return;
        }
        
        if (checkIn < today) {
            alert('Check-in date cannot be in the past.');
            return;
        }

        const bookingData = {
            fullName,
            email,
            phone,
            checkInDate,
            checkOutDate,
            numGuests,
            room: selectedRoom,
            totalPrice
        };

        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        window.location.href = 'payment.html';
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        // Simple regex for phone with optional + and spaces/dashes
        return /^\+?\d[\d\s-]{7,}\d$/.test(phone);
    }
});