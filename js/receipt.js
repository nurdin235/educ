document.addEventListener('DOMContentLoaded', () => {
    const receiptBookingId = document.getElementById('receiptBookingId');
    const receiptGuestName = document.getElementById('receiptGuestName');
    const receiptRoomType = document.getElementById('receiptRoomType');
    const receiptLocation = document.getElementById('receiptLocation');
    const receiptCheckIn = document.getElementById('receiptCheckIn');
    const receiptCheckOut = document.getElementById('receiptCheckOut');
    const receiptNumGuests = document.getElementById('receiptNumGuests');
    const receiptTotalPaid = document.getElementById('receiptTotalPaid');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    // Get the last completed booking from localStorage
    const allBookings = JSON.parse(localStorage.getItem('allBookings'));
    const lastBooking = allBookings[allBookings.length - 1];

    if (!lastBooking) {
        alert('No recent booking found.');
        window.location.href = 'index.html';
        return;
    }

    console.log("Booking ID", lastBooking.bookingId);

    // Populate receipt details
    receiptBookingId.textContent = lastBooking.bookingId;
    receiptGuestName.textContent = lastBooking.fullName;
    receiptRoomType.textContent = lastBooking.room.type;
    receiptLocation.textContent = lastBooking.room.location;
    receiptCheckIn.textContent = lastBooking.checkInDate;
    receiptCheckOut.textContent = lastBooking.checkOutDate;
    receiptNumGuests.textContent = lastBooking.numGuests;
    receiptTotalPaid.textContent = lastBooking.totalPrice.toFixed(2);

    downloadPdfBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text("Mawa Hotel - Booking Receipt", 105, 20, null, null, "center");

        doc.setFontSize(12);
        doc.line(20, 30, 190, 30); // Horizontal line

        let yOffset = 40;
        const addText = (label, value) => {
            doc.text(`${label}:`, 20, yOffset);
            doc.text(value, 80, yOffset);
            yOffset += 10;
        };

        addText("Booking ID", lastBooking.bookingId);
        addText("Guest Name", lastBooking.fullName);
        addText("Email", lastBooking.email);
        addText("Phone", lastBooking.phone);
        yOffset += 5; // Add some space

        doc.setFontSize(14);
        doc.text("Room Details:", 20, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        addText("Room Type", lastBooking.room.type);
        addText("Location", lastBooking.room.location);
        addText("Price per night", `$${lastBooking.room.price.toFixed(2)}`);
        yOffset += 5;

        doc.setFontSize(14);
        doc.text("Stay Details:", 20, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        addText("Check-in Date", lastBooking.checkInDate);
        addText("Check-out Date", lastBooking.checkOutDate);
        addText("Number of Guests", lastBooking.numGuests.toString());
        yOffset += 5;

        doc.setFontSize(16);
        doc.text(`Total Paid: $${lastBooking.totalPrice.toFixed(2)}`, 20, yOffset);
        yOffset += 20;

        doc.setFontSize(10);
        doc.text("Thank you for choosing Mawa Hotel!", 105, yOffset, null, null, "center");
        doc.text("We look forward to welcoming you.", 105, yOffset + 7, null, null, "center");

        doc.save(`MawaHotel_Receipt_${lastBooking.bookingId}.pdf`);
    });
});