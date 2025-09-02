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
        colors.forEach(c => c.style.borderColor = "transparent");
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
  const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  cart.push({ item, price });
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  alert(`${item} added to cart.`);
}
const pages = {
  "Apple": "apple.html",
  "Shirts": "shirts.html",
  "Sweaters": "sweaters.html",
  "Caps": "caps-catalog.html",
  "Hoodies": "hoodies.html",
  "Sweatpants" : "sweatpants-catalog.html"
};

function openSearch() {
  document.getElementById('searchOverlay').style.display = 'flex';
  document.getElementById('searchInput').focus();
}

function closeSearch() {
  document.getElementById('searchOverlay').style.display = 'none';
  document.getElementById('suggestions').style.display = 'none';
}

function searchItems() {
  let input = document.getElementById('searchInput').value.toLowerCase();
  let suggestions = document.getElementById('suggestions');
  suggestions.innerHTML = '';

  if (input === '') {
      suggestions.style.display = 'none';
      return;
  }

  let matches = Object.keys(pages).filter(item => item.toLowerCase().includes(input));

  if (matches.length === 0) {
      suggestions.style.display = 'none';
      return;
  }

  matches.forEach(item => {
      let li = document.createElement('li');
      li.textContent = item;
      li.onclick = () => {
          window.location.href = pages[item];
      };
      suggestions.appendChild(li);
  });

  suggestions.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', function() {
  var centerImage = document.getElementById('center-image');
  var navbar = document.getElementById('navbar');
  var footer = document.getElementById('footer');

  // Show the center image after 1.5 seconds with a left-to-right transition
  setTimeout(function() {
      centerImage.classList.remove('hidden');
      centerImage.style.width = '300px'; // Expand the width
      centerImage.style.opacity = '1'; // Fade in the image
  }, 1500); // 1.5-second delay

  // Show the navbar and footer after 3 seconds
  setTimeout(function() {
      navbar.classList.remove('hidden');
      footer.classList.remove('hidden');

      // Trigger the sliding animations
      setTimeout(function() {
          navbar.style.top = '0'; // Slide navbar down
          footer.style.bottom = '0'; // Slide footer up
      }, 10); // Small delay to ensure the elements are visible before animating
  }, 3000); // 3-second delay
});


function displayTotalPrice() {
  const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  
  document.getElementById('total-price').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  window.onload = displayTotalPrice;
}

function clearCart() {
  localStorage.removeItem('shoppingCart'); 
  displayTotalPrice(); 
  alert("Cart has been cleared!");
}

function getPrices() {
  const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  return cart.map(item => ({ item: item.item, price: item.price }));
}


