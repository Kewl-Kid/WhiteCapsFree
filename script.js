// script.js

// Your UI interaction code (colors, sizes, cart, search, animations)
document.addEventListener("DOMContentLoaded", () => {
  const colors = document.querySelectorAll(".color");
  const sizes = document.querySelectorAll(".size");
  const mainImage = document.getElementById("main-image");

  // Change image when a color is clicked
  colors.forEach(color => {
    color.addEventListener("click", () => {
      const image = color.getAttribute("data-image");
      mainImage.src = image;

      // Highlight the selected color
      colors.forEach(c => (c.style.borderColor = "transparent"));
      color.style.borderColor = "black";
    });
  });

  // Select size
  sizes.forEach(size => {
    size.addEventListener("click", () => {
      sizes.forEach(s => s.classList.remove("selected"));
      size.classList.add("selected");
    });
  });
});

function addToCart(item, price) {
  const selectedSize = document.querySelector(".size.selected")?.textContent;
  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  cart.push({ item, price, size: selectedSize });
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  alert(`${item} (Size: ${selectedSize}) added to cart.`);
}

const pages = {
  Shirts: "shirts.html",
  Tops: "shirts.html",
  Caps: "caps-catalog.html",
  Overwear: "hoodiesw.html",
  Hoodies: "hoodies.html",
  "pants, bottoms": "sweatpants-catalog.html",
};

function openSearch() {
  document.getElementById("searchOverlay").style.display = "flex";
  document.getElementById("searchInput").focus();
}

function closeSearch() {
  document.getElementById("searchOverlay").style.display = "none";
  document.getElementById("suggestions").style.display = "none";
}

function searchItems() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (input === "") {
    suggestions.style.display = "none";
    return;
  }

  let matches = Object.keys(pages).filter((item) =>
    item.toLowerCase().includes(input)
  );

  if (matches.length === 0) {
    suggestions.style.display = "none";
    return;
  }

  matches.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = item;
    li.onclick = () => {
      window.location.href = pages[item];
    };
    suggestions.appendChild(li);
  });

  suggestions.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  var centerImage = document.getElementById("center-image");
  var navbar = document.getElementById("navbar");
  var footer = document.getElementById("footer");

  setTimeout(function () {
    centerImage.classList.remove("hidden");
    centerImage.style.width = "300px";
    centerImage.style.opacity = "1";
  }, 1500);

  setTimeout(function () {
    navbar.classList.remove("hidden");
    footer.classList.remove("hidden");

    setTimeout(function () {
      navbar.style.top = "0";
      footer.style.bottom = "0";
    }, 10);
  }, 3000);
});

function displayTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  document.getElementById("total-price").textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}
window.onload = displayTotalPrice;

function clearCart() {
  localStorage.removeItem("shoppingCart");
  displayTotalPrice();
  alert("Cart has been cleared!");
}

function getPrices() {
  const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  return cart.map((item) => ({ item: item.item, price: item.price }));
}

// Page fade animations for internal navigation
document.body.classList.add("fade-in");
document.querySelectorAll('a[href]').forEach((link) => {
  const url = new URL(link.href);
  const isSameOrigin = url.origin === window.location.origin;

  if (isSameOrigin && !url.hash && !link.target) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  }
});

// ----------- FIREBASE & FIRESTORE SETUP -------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9R9FrxGGjDzLy5AgAU4B36vDUHrgKxSE",
  authDomain: "white-caps-reviews.firebaseapp.com",
  projectId: "white-caps-reviews",
  storageBucket: "white-caps-reviews.appspot.com",  // fixed this line
  messagingSenderId: "292714304838",
  appId: "1:292714304838:web:4285324e98f7f4047d8147",
  measurementId: "G-7ZQQT0BERV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Simple Firestore test: fetch documents from "reviews" collection and log count
async function testFirestore() {
  try {
    const snapshot = await getDocs(collection(db, "reviews"));
    console.log("Firestore connected! Number of documents:", snapshot.size);
  } catch (error) {
    console.error("Firestore test error:", error);
  }
}

testFirestore();

import { addDoc, collection } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Function to add a review to Firestore
async function addReview(reviewText, rating) {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      text: reviewText,
      rating: rating,
      timestamp: new Date()
    });
    alert("Review added with ID: " + docRef.id);
  } catch (e) {
    console.error("Error adding review: ", e);
    alert("Failed to add review.");
  }
}

