// Plant nursery code
const plants = [
    { id: 1, name: 'Rose', price: 10 },
    { id: 2, name: 'Lily', price: 8 },
    { id: 3, name: 'Sunflower', price: 12 },
    // Add more plant options as needed
];

let cart = [];

function renderPlantList() {
    const plantSelection = document.getElementById('plant-selection');

    plants.forEach(plant => {
        const option = document.createElement('option');
        option.value = plant.id;
        option.textContent = `${plant.name} - $${plant.price}`;
        plantSelection.appendChild(option);
    });
}

function addToCart() {
    const plantSelection = document.getElementById('plant-selection');
    const quantityInput = document.getElementById('quantity');
    const selectedPlantId = parseInt(plantSelection.value, 10);
    const quantity = parseInt(quantityInput.value, 10);

    const selectedPlant = plants.find(plant => plant.id === selectedPlantId);
    if (selectedPlant) {
        const existingCartItem = cart.find(item => item.id === selectedPlant.id);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            cart.push({ id: selectedPlant.id, name: selectedPlant.name, price: selectedPlant.price, quantity });
        }

        updateCartUI();
    }
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function removeFromCart(plantId) {
    cart = cart.filter(item => item.id !== plantId);
    updateCartUI();
}

function checkout() {
    // Implement the checkout logic, e.g., send the order to the server, etc.
    alert('Thank you for your order!');
    cart = [];
    updateCartUI();
}

// Initial setup
renderPlantList();


// Initialize the FirebaseUI Widget using Firebase.
//var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});

// Create a new user account
function createAccount() {
    var newEmail = document.getElementById('newEmail').value;
    var newPassword = document.getElementById('newPassword').value;

    firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User account created:', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Account creation error:', errorCode, errorMessage);
        });
}

// Email Sign-in
function signInWithEmail() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Email/password sign-in error:', errorCode, errorMessage);
        });
}

// Google Sign-in
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User signed in with Google:', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Google sign-in error:', errorCode, errorMessage);
        });
}

// Facebook Sign-in
function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User signed in with Facebook:', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Facebook sign-in error:', errorCode, errorMessage);
        });
}

// Sidebar function
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const menuIcon = document.createElement('div');
    menuIcon.classList.add('menu-icon');
    menuIcon.textContent = '☰';

    menuIcon.addEventListener('click', function () {
        const sidebarVisible = sidebar.style.left === '0px';
        sidebar.style.left = sidebarVisible ? '-250px' : '0';
        content.style.marginLeft = sidebarVisible ? '0' : '250px';
    });

    document.body.appendChild(menuIcon);
});

let isSidebarOpen = false;

function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (isSidebarOpen) {
        sidebar.style.transform = 'translateX(0)';
        content.style.marginLeft = '250px';
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        content.style.marginLeft = '0';
    }
}

function navigateTo(page) {
    console.log(`Navigating to ${page}`);
}
