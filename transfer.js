document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        items: document.getElementById('items').value,
        totalPrice: document.getElementById('totalPrice').value
    };

    fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Order submitted successfully!');
        document.getElementById('orderForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});