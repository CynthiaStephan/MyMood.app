// URL API
const apiUrlCohort = 'http://localhost:3650/cohort';
const apiUrlCohortNew = 'http://localhost:3650/cohort/new';
const apiUrlCohortUpdate = 'http://localhost:3650/cohort/update';
const apiUrlCohortDelete = 'http://localhost:3650/cohort/delete';
const apiUrlUser = 'http://localhost:3650/user/admin/user-info';
const apiUrlUserDelete = 'http://localhost:3650/user/delete';
const apiUrlCohortAsign = 'http://localhost:3650/cohort/asign-user';
const apiUrlCohortUnasign = 'http://localhost:3650/cohort/unasign-user';
const apiUrlUserCreate = 'http://localhost:3650/user/new';
const apiUrlUserUpdate = 'http://localhost:3650/user/update';



// Récupérer les cohortes depuis l'API
function getCohorts() {
  fetch(apiUrlCohort)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#cohortTable tbody');
      tableBody.innerHTML = ''; 
      data.forEach(cohort => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cohort.cohort_id}</td>
          <td>${cohort.name}</td>
          <td>
            <button onclick="editCohort(${cohort.cohort_id})">Editer le nom de la cohorte</button>
            <button onclick="deleteCohort(${cohort.cohort_id})">Supprimer la cohorte</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erreur lors de la récupération:', error));
}

// Créer une nouvelle cohorte
function createCohort() {
  const name = document.getElementById('name').value;
  if (!name) {
    alert('Le nom de la cohorte est requis.');
    return;
  }

  const newCohort = { name: name };
  
  fetch(apiUrlCohortNew, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCohort),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cohorte créée:', data);
    getCohorts(); // Rafraîchir la liste
  })
  .catch(error => console.error('Erreur lors de la création:', error));
  
  document.getElementById('name').value = ''; 
}

// Mettre à jour une cohorte
function editCohort(cohortId) {
  const newName = prompt('Entrez le nouveau nom de la cohorte :');
  if (!newName) {
    return;
  }

  const updatedCohort = { name: newName };
  
  fetch(`${apiUrlCohortUpdate}/${cohortId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCohort),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cohorte mise à jour:', data);
    getCohorts(); // Rafraîchir la liste
  })
  .catch(error => console.error('Erreur lors de la mise à jour:', error));
}

// Supprimer une cohorte
function deleteCohort(cohortId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette cohorte ?')) {
    fetch(`${apiUrlCohortDelete}/${cohortId}`, {
      method: 'DELETE',
    })
    .then(() => {
      console.log(`Cohorte avec ID ${cohortId} supprimée`);
      getCohorts(); // Rafraîchir la liste
    })
    .catch(error => console.error('Erreur lors de la suppression:', error));
  }
}

// Récupérer les users depuis l'API
function getUser() {
  fetch(apiUrlUser)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#userTable tbody');
      tableBody.innerHTML = ''; 
      data.forEach(user => {
        const cohorts = user.Cohorts.map(cohort => `${cohort.name} (ID:${cohort.cohort_id})`).join(', ') || 'Non attribué'
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.user_id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>${cohorts}</td>
          <td>
            <button onclick="editUserRole(${user.user_id})">Editer le rôle</button>
            <button onclick="editUserCohort(${user.user_id})">Ajouter une cohorte</button>
            <button onclick="deleteUserCohort(${user.user_id})">Supprimer une cohorte</button>
            <button onclick="deleteUser(${user.user_id})">Supprimer utilisateur</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erreur lors de la récupération:', error));
}

// Charger les cohortes au chargement de la page
window.onload = function () {
  getCohorts();
  getUser();
};

// Créer un nouvel utilisateur
function createUser() {
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  if (!firstName || !lastName || !email || !password || !role) {
    alert('Tous les champs sont requis.');
    return;
  }

  const newUser = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    role: role
  };

  console.log(newUser);
  

  fetch(apiUrlUserCreate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Utilisateur créé:', data);
    getUser(); // Rafraîchir la liste des utilisateurs
  })
  .catch(error => console.error('Erreur lors de la création de l\'utilisateur:', error));

  // Réinitialiser les champs du formulaire
  document.getElementById('first_name').value = '';
  document.getElementById('last_name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('role').value = '';
}

// Editer le role d'un user
function editUserRole(userId) {
  const newRole = prompt('Entrez le nouveau rôle de l\'utilisateur (trainee, supervisor, admin) :');
  const validRoles = ['trainee', 'supervisor', 'admin'];

  if (!newRole || !validRoles.includes(newRole)) {
    alert('Rôle invalide. Veuillez saisir un rôle valide.');
    return;
  }

  const updatedRole = { role: newRole };

  console.log({updatedRole,apiUrlUserUpdate,userId});
  

  fetch(`${apiUrlUserUpdate}/${userId}`, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedRole),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur : ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Rôle utilisateur mis à jour:', data);
    getUser(); // Rafraîchir la liste
  })
  .catch(error => console.error('Erreur lors de la mise à jour du rôle:', error));
}


// Ajouter cohorte d'un user
function editUserCohort(userId) {
  const newCohort = prompt('Entrez l\'ID de la cohorte pour l\'utilisateur :');
  if (!newCohort || isNaN(newCohort)) {
    alert('Cohorte invalide. Veuillez saisir un identifiant valide.');
    return;
  }

  const updatedCohort = {
    user_id: userId,
    cohort_id: parseInt(newCohort, 10)
  };

  fetch(apiUrlCohortAsign, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCohort),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Cohorte utilisateur mise à jour:', data);
      getUser();
    })
    .catch(error => console.error('Erreur lors de l\'assignation de la cohorte:', error));
}

// Supprimer cohorte d'un user
function deleteUserCohort(userId) {
  const deleteCohort = prompt('Entrez l\'ID de la cohorte pour l\'utilisateur :');
  if (!deleteCohort || isNaN(deleteCohort)) {
    alert('Cohorte invalide. Veuillez saisir un identifiant valide.');
    return;
  }

  const deletedCohort = {
    user_id: userId,
    cohort_id: parseInt(deleteCohort, 10)
  };

  fetch(apiUrlCohortUnasign, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deletedCohort),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Cohorte utilisateur mise à jour:', data);
      getUser();
    })
    .catch(error => console.error('Erreur lors de la suppression de la cohorte:', error));
}

// Supprimer un utilisateur 
function deleteUser(userId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    fetch(`${apiUrlUserDelete}/${userId}`, {
      method: 'DELETE',
    })
    .then(() => {
      console.log(`User avec ID ${userId} supprimée`);
      getUser(); // Rafraîchir la liste
    })
    .catch(error => console.error('Erreur lors de la suppression:', error));
  }
}