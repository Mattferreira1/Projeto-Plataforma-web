document.addEventListener("DOMContentLoaded", loadUsers);

function addUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();

    if (name === "" || email === "" || age === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const users = getUsers();
    users.push({ name, email, age });
    saveUsers(users);
    clearInputs();
    renderUsers();
}

function editUser(index) {
    const users = getUsers();
    const user = users[index];

    const newName = prompt("Editar Nome:", user.name);
    const newEmail = prompt("Editar E-mail:", user.email);
    const newAge = prompt("Editar Idade:", user.age);

    if (newName && newEmail && newAge) {
        users[index] = { name: newName.trim(), email: newEmail.trim(), age: newAge.trim() };
        saveUsers(users);
        renderUsers();
    }
}

function deleteUser(index) {
    const users = getUsers();
    users.splice(index, 1);
    saveUsers(users);
    renderUsers();
}

function loadUsers() {
    renderUsers();
}

function renderUsers() {
    const userList = document.getElementById("userList");
    const users = getUsers();

    userList.innerHTML = "";
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td class="actions">
                <span class="btn btn-primary" onclick="editUser(${index})">Editar</span>
                <span class="btn btn-danger" onclick="deleteUser(${index})">Excluir</span>
            </td>
        `;
        userList.appendChild(row);
    });
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
