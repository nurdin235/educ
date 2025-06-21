// Mock Room Data
const rooms = [
    {
        id: 'r101',
        location: 'Mile 1',
        type: 'Standard Single',
        description: 'Cozy single room with a garden view.',
        price: 80,
        imageUrl: 'images/juniorsiute.png'
    },
    {
        id: 'r102',
        location: 'Mile 6',
        type: 'Deluxe Double',
        description: 'Spacious double room with modern amenities.',
        price: 12000,
        imageUrl: 'images/standardRoom.jpg'
    },
    {
        id: 'r103',
        location: 'Mile 6',
        type: 'Executive Suite',
        description: 'Luxury suite with a separate living area and city view.',
        price: 75000,
        imageUrl: 'images/superiorRoom.png'
    },
    {
        id: 'r201',
        location: 'Mile 2',
        type: 'Standard Double',
        description: 'Comfortable double room near the main road.',
        price: 95000,
        imageUrl: 'images/Standard.jpg'
    },

    {
        id: 'r201',
        location: 'Mile 1',
        type: 'Standard Double',
        description: 'Comfortable double room near the main road.',
        price: 95000,
        imageUrl: 'images/Standard.jpg'
    },

    {
        id: 'r202',
        location: 'Mile 2',
        type: 'Family Room',
        description: 'Large room suitable for families with children.',
        price: 100000,
        imageUrl: 'images/FamilyRoom.jpg'
    },
    {
        id: 'r301',
        location: 'Mile 3',
        type: 'Economy Single',
        description: 'Budget-friendly single room with essential comforts.',
        price: 10000,
        imageUrl: 'images/EconomySingle.jpg'
    },
    {
        id: 'r302',
        location: 'Mile 3',
        type: 'Superior Double',
        description: 'Refined double room with enhanced services.',
        price: 50000,
        imageUrl: 'images/superiorDouble.jpg'
    },


    {
        id: 'r121',
        location: 'Mile 1',
        type: 'Standard Single',
        description: 'Cozy single room with a garden view.',
        price: 80,
        imageUrl: 'images/juniorsiute.png'
    },
    {
        id: 'r122',
        location: 'Mile 6',
        type: 'Deluxe Double',
        description: 'Spacious double room with modern amenities.',
        price: 12000,
        imageUrl: 'images/standardRoom.jpg'
    },
    {
        id: 'r113',
        location: 'Mile 6',
        type: 'Executive Suite',
        description: 'Luxury suite with a separate living area and city view.',
        price: 75000,
        imageUrl: 'images/superiorRoom.png'
    },
    {
        id: 'r211',
        location: 'Mile 2',
        type: 'Standard Double',
        description: 'Comfortable double room near the main road.',
        price: 95000,
        imageUrl: 'images/Standard.jpg'
    },
    {
        id: 'r222',
        location: 'Mile 1',
        type: 'Family Room',
        description: 'Large room suitable for families with children.',
        price: 100000,
        imageUrl: 'images/FamilyRoom.jpg'
    },
    {
        id: 'r321',
        location: 'Mile 6',
        type: 'Economy Single',
        description: 'Budget-friendly single room with essential comforts.',
        price: 10000,
        imageUrl: 'images/EconomySingle.jpg'
    },
    {
        id: 'r312',
        location: 'Mile 4',
        type: 'Superior Double',
        description: 'Refined double room with enhanced services.',
        price: 50000,
        imageUrl: 'images/superiorDouble.jpg'
    },



];

document.addEventListener('DOMContentLoaded', () => {
    const locationSelect = document.getElementById('locationSelect');
    const roomSearchInput = document.getElementById('roomSearchInput');
    const roomListingsGrid = document.getElementById('roomListingsGrid');
    const noRoomsMessage = document.getElementById('noRoomsMessage');

    const displayRooms = (filteredRooms) => {
        roomListingsGrid.innerHTML = ''; // Clear previous listings
        if (filteredRooms.length === 0) {
            noRoomsMessage.style.display = 'block';
            return;
        }
        noRoomsMessage.style.display = 'none';

        filteredRooms.forEach(room => {
        const formattedPrice = new Intl.NumberFormat('en-CM', {
        style: 'currency',
        currency: 'XAF', // XAF is the ISO currency code for Central African CFA franc
        minimumFractionDigits: 0, // No decimal places for whole numbers
        maximumFractionDigits: 0
      }).format(room.price);



            const roomCard = document.createElement('div');
            roomCard.classList.add('room-card');
            roomCard.innerHTML = `
                <img src="${room.imageUrl}" alt="${room.type} at ${room.location}">
                <div class="room-card-content">
                    <h3>${room.type}</h3>
                    <p><strong>Location:</strong> ${room.location}</p>
                    <p>${room.description}</p>
                    <p class="price">${formattedPrice} per night</p>
                    <button class="btn btn-primary book-now-btn" data-room-id="${room.id}">Book Now</button>
                </div>
            `;
            roomListingsGrid.appendChild(roomCard);
        });

        // Add event listeners to "Book Now" buttons
        document.querySelectorAll('.book-now-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const roomId = event.target.dataset.roomId;
                const selectedRoom = rooms.find(room => room.id === roomId);
                if (selectedRoom) {
                    localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
                    window.location.href = 'booking.html';
                }
            });
        });
    };

    const filterRooms = () => {
        const selectedLocation = locationSelect.value;
        const searchTerm = roomSearchInput.value.toLowerCase();

        let filtered = rooms;

        if (selectedLocation) {
            filtered = filtered.filter(room => room.location === selectedLocation);
        }

        if (searchTerm) {
            filtered = filtered.filter(room =>
                room.type.toLowerCase().includes(searchTerm) ||
                room.description.toLowerCase().includes(searchTerm)
            );
        }
        displayRooms(filtered);
    };

    // Initial display based on localStorage or all rooms
    const initialLocation = localStorage.getItem('selectedLocation');
    if (initialLocation) {
        locationSelect.value = initialLocation;
        filterRooms();
        localStorage.removeItem('selectedLocation'); // Clear after use
    } else {
        displayRooms(rooms); // Display all rooms initially
    }

    locationSelect.addEventListener('change', filterRooms);
    roomSearchInput.addEventListener('input', filterRooms);
});