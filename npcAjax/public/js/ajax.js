document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const newProductBtn = document.getElementById('new-product-btn');

    // Cargar usuarios al cargar la página
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><button class="delete-btn btn red" data-id="${user.id}">Eliminar</button></td>
                `;
                userList.appendChild(tr);
            });
        });

    // Agregar nuevo usuario con AJAX
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('http://localhost:3000/api/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><button class="delete-btn btn red" data-id="${user.id}">Eliminar</button></td>
            `;
            userList.appendChild(tr);
        });
    });

    // Eliminar usuario con AJAX
    userList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const userId = event.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                fetch(`http://localhost:3000/api/users/delete/${userId}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    userList.removeChild(event.target.parentElement.parentElement);
                });
            }
        }
    });

    // Redirigir a la vista de productos
    newProductBtn.addEventListener('click', () => {
        window.location.href = '/products';
    });
});