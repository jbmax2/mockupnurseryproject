// Plant nursery code
const plants = [
    { id: 1, name: 'Rose', price: 20 },
    { id: 2, name: 'Azelea', price: 15 },
    { id: 3, name: 'Viburnum', price: 15 },
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

document.addEventListener('DOMContentLoaded' , function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});

// Initialize the FirebaseUI Widget using Firebase.

const firebaseConfig = {
    apiKey: "AIzaSyDq50l-F1bkwMauR5DYys3jwK5U1ePkDho",
    authDomain: "mockupnurseryproject.firebaseapp.com",
    projectId: "mockupnurseryproject",
    storageBucket: "mockupnurseryproject.appspot.com",
    messagingSenderId: "331647935948",
    appId: "1:331647935948:web:ff38ad2452dbbf42cea969",
    measurementId: "G-Y5VCELV60F"
  };

var ui = new firebaseui.auth.AuthUI(firebase.auth());

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


function navigateTo(page) {
    console.log(`Navigating to ${page}`);
}
