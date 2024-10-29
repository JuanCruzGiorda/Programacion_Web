document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const newProductBtn = document.getElementById('new-product-btn');
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');

    let currentDeleteUserId = null;

    // Inicializar el modal de Materialize
    const modalInstance = M.Modal.init(deleteModal);

    // Cargar usuarios al cargar la página
    function buscarUsuario() {
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => {
                userList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
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
    }

    buscarUsuario();

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
        .then(response => {
            if (response.ok) {
                M.toast({html: 'Usuario añadido exitosamente', classes: 'green'});
                buscarUsuario();
            } else {
                M.toast({html: 'Error al añadir usuario', classes: 'red'});
            }
        });
    });

    // Mostrar modal de confirmación de eliminación
    userList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            currentDeleteUserId = event.target.getAttribute('data-id');
            modalInstance.open();
        }
    });

    // Confirmar eliminación de usuario
    confirmDeleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/api/users/delete/${currentDeleteUserId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                const tr = userList.querySelector(`button[data-id="${currentDeleteUserId}"]`).parentElement.parentElement;
                userList.removeChild(tr);
                M.toast({html: 'Usuario eliminado exitosamente', classes: 'green'});
            } else {
                M.toast({html: 'Error al eliminar usuario', classes: 'red'});
            }
        });
    });

    // Redirigir a la vista de productos
    newProductBtn.addEventListener('click', () => {
        window.location.href = '/products';
    });
});