// Shared Data (Simulate a database using localStorage)
let items = JSON.parse(localStorage.getItem('items')) || [];

// Report Form Submission
document.getElementById('reportForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const status = document.getElementById('status').value;
    const itemName = document.getElementById('itemName').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const email = document.getElementById('email').value;
    const image = document.getElementById('imagePreview').src || null;

    const newItem = { status, itemName, description, location, email, image };
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));

    alert('Item reported successfully!');
    window.location.href = 'browse.html'; // Redirect to Browse page
});

// Image Upload Preview
function previewImage(event) {
    const reader = new FileReader();
    const preview = document.getElementById('imagePreview');
    reader.onload = function () {
        preview.src = reader.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Display Items on Browse Page
function displayItems() {
    const itemsList = document.getElementById('items-list');
    if (itemsList) {
        itemsList.innerHTML = items
            .map(
                (item, index) => `
                <div class="item">
                    <strong style="color: ${item.status === 'lost' ? 'red' : 'green'};">${item.status.toUpperCase()}: ${item.itemName}</strong>
                    ${item.image ? `<img src="${item.image}" alt="${item.itemName}" class="image-preview">` : ''}
                    <p>${item.description}</p>
                    <small><strong>Location:</strong> ${item.location}</small>
                    <div class="actions">
                        ${item.status === 'lost' ? `<button class="found-btn" onclick="markAsFound(${index})">Mark as Found</button>` : ''}
                        <button class="contact-btn" onclick="contactOwner('${item.email}')">Contact</button>
                        <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
                    </div>
                </div>
            `
            )
            .join('');
    }
}

// Mark Item as Found
function markAsFound(index) {
    items[index].status = 'found';
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
}

// Delete Item
function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
}

// Contact Owner
function contactOwner(email) {
    window.location.href = `mailto:${email}`;
}

// Search Items
function searchItems() {
    const query = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.item').forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
}

// Initialize
displayItems();