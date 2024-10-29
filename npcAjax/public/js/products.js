document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const backToUsersBtn = document.getElementById('back-to-users-btn');
    const editFormContainer = document.getElementById('edit-form-container');
    const editProductForm = document.getElementById('edit-product-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    let currentEditProductId = null;

    // Cargar productos al cargar la página
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.code}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.price}</td>
                    <td>
                        <button class="delete-btn btn red" data-id="${product.id}">Eliminar</button>
                        <button class="edit-btn btn" data-id="${product.id}">Editar</button>
                    </td>
                `;
                productList.appendChild(tr);
            });
        });
    
        
    // Agregar nuevo producto con AJAX
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const code = document.getElementById('product-code').value;
        const quantity = document.getElementById('product-quantity').value;
        const price = document.getElementById('product-price').value;

        fetch('http://localhost:3000/api/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, code, quantity, price })
        })
        .then(response => response.json())
        .then(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.code}</td>
                <td>${product.quantity}</td>
                <td>$${product.price}</td>
                <td>
                    <button class="delete-btn btn red" data-id="${product.id}">Eliminar</button>
                    <button class="edit-btn btn" data-id="${product.id}">Editar</button>
                </td>
            `;
            productList.appendChild(tr);
        });
    });

    // Eliminar producto con AJAX
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const productId = event.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                fetch(`http://localhost:3000/api/products/delete/${productId}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    productList.removeChild(event.target.parentElement.parentElement);
                });
            }
        }
    });
    // Mostrar formulario de edición con AJAX
productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const productId = event.target.getAttribute('data-id');
        currentEditProductId = productId;
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                return response.json();
            })
            .then(product => {
                document.getElementById('edit-product-name').value = product.name;
                document.getElementById('edit-product-code').value = product.code;
                document.getElementById('edit-product-quantity').value = product.quantity;
                document.getElementById('edit-product-price').value = product.price;
                editFormContainer.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al obtener el producto');
            });
    }
});

    // Editar producto con AJAX
    editProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('edit-product-name').value;
        const code = document.getElementById('edit-product-code').value;
        const quantity = document.getElementById('edit-product-quantity').value;
        const price = document.getElementById('edit-product-price').value;

        fetch(`http://localhost:3000/api/products/update/${currentEditProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, code, quantity, price })
        })
        .then(response => response.json())
        .then(() => {
            const tr = productList.querySelector(`button[data-id="${currentEditProductId}"]`).parentElement.parentElement;
            tr.innerHTML = `
                <td>${name}</td>
                <td>${code}</td>
                <td>${quantity}</td>
                <td>$${price}</td>
                <td>
                    <button class="delete-btn btn red" data-id="${currentEditProductId}">Eliminar</button>
                    <button class="edit-btn btn" data-id="${currentEditProductId}">Editar</button>
                </td>
            `;
            editFormContainer.style.display = 'none';
        });
    });

    // Cancelar edición
    cancelEditBtn.addEventListener('click', () => {
        editFormContainer.style.display = 'none';
    });

    // Redirigir a la vista de usuarios
    document.getElementById('back-to-users-btn').addEventListener('click', () => {
        window.location.href = '/';
    });
});