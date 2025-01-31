// URL API
const apiUrlCohort = 'http://localhost:3650/cohort';
const apiUrlCohortNew = 'http://localhost:3650/cohort/new';
const apiUrlCohortUpdate = 'http://localhost:3650/cohort/update';
const apiUrlCohortDelete = 'http://localhost:3650/cohort/delete';


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
            <button onclick="editCohort(${cohort.cohort_id})">Editer</button>
            <button onclick="deleteCohort(${cohort.cohort_id})">Supprimer</button>
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

// Charger les cohortes au chargement de la page
window.onload = getCohorts;