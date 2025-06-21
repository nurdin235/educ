document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const processingAnimation = document.getElementById('processingAnimation');

    const currentBooking = JSON.parse(localStorage.getItem('currentBooking'));

    if (!currentBooking) {
        alert('No booking data found. Please complete the booking form first.');
        window.location.href = 'booking.html';
        return;
    }

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        // Basic client-side validation
        if (!cardName || !cardNumber || !expiryDate || !cvv) {
            alert('Please fill in all payment details.');
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Card number must be 16 digits.');
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            alert('Expiry date must be in MM/YY format (e.g., 12/25).');
            return;
        }

        const [month, year] = expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100; // Get last two digits
        const currentMonth = new Date().getMonth() + 1; // 0-indexed month

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            alert('Card has expired.');
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert('CVV must be 3 digits.');
            return;
        }

        // Simulate payment processing
        paymentForm.style.display = 'none';
        processingAnimation.style.display = 'block';

        setTimeout(() => {
            // Generate a random booking ID
            const bookingId = 'MHW' + Math.random().toString(36).substr(2, 9).toUpperCase();

            // Store the complete booking information
            const completedBooking = {
                ...currentBooking,
                bookingId: bookingId,
                paymentDetails: {
                    cardName: cardName,
                    last4Digits: cardNumber.slice(-4),
                    // Do NOT store full card details in real applications!
                },
                bookingDate: new Date().toISOString().split('T')[0]
            };

            // Retrieve existing bookings or initialize an empty array
            let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
            allBookings.push(completedBooking);
            localStorage.setItem('allBookings', JSON.stringify(allBookings));
            localStorage.removeItem('currentBooking'); // Clear current booking after saving

            window.location.href = 'receipt.html';
        }, 3000); // Simulate 3-second processing
    });
});