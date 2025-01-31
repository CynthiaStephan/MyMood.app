// Requete pour afficher les cohorts
const requestCohort = 'http://localhost:3650/cohort/';

fetch(requestCohort)
.then((response) => response.json()) 
.then((data) => {
    console.log(data)
    let cohortListContainer = document.getElementById('liste-formation');
    let myUl = document.createElement('ul');
    myUl.className = 'ul-formation-style';
    cohortListContainer.appendChild(myUl);
    //boucle pour afficher les cohorts avec une checkbox
    for (let cohort of data){
        let myLi = document.createElement('li');
        myLi.className = 'list-formation-style';
        myUl.appendChild(myLi);
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'myCheckbox-formation';
        checkbox.className = 'checkbox-formation-style';
        let label = document.createElement('label');
        label.htmlFor = 'myCheckbox-formation';
        label.textContent = `${cohort.name}`;
        label.className = 'label-formation-style';   
        myLi.appendChild(label);
        myLi.appendChild(checkbox);
     }
})
.catch((error) => console.log(error))


// requete pour afficher les users
const requestUsers = 'http://localhost:3650/user/';

fetch(requestUsers)
.then((response)=>response.json())
.then((data) =>{
    console.log(data);
    let userListContainer = document.getElementById('container-gestion-users');
    let myUl = document.createElement('ul');
    myUl.className = 'ul-user-style';
    userListContainer.appendChild(myUl);
    //boucle pour afficher les users
    for (let user of data) {
        let myLi = document.createElement('li');
        myLi.className = 'list-user-style';
        myUl.appendChild(myLi);
    
        let userFirstName = document.createElement('p');
        userFirstName.textContent = `${user.first_name}`;
    
        let userLastName = document.createElement('p');
        userLastName.textContent = `${user.last_name}`;
    
        let userEmail = document.createElement('p');
        userEmail.textContent = `${user.email}`;
    
        let userRole = document.createElement('p');
        let select = document.createElement('select');
        select.name = 'rôle';
    
        // Mappage entre les rôles internes et les valeurs affichées dans le select
        let roles = {
            "trainee": "Stagiaire",
            "supervisor": "Superviseur",
            "admin": "Administrateur"
        };
    
        let options = ["--Choisir une catégorie--", "Stagiaire", "Superviseur", "Administrateur"];
        
        for (let optionText of options) {
            let option = document.createElement('option');
            option.value = optionText.toLowerCase();  
            option.textContent = optionText;
    
           
            if (user.role && option.value === roles[user.role.toLowerCase()]?.toLowerCase()) {
                option.selected = true; 
            }
    
            select.appendChild(option);
        }
    
        userRole.appendChild(select);
    
        myLi.appendChild(userFirstName);
        myLi.appendChild(userLastName);
        myLi.appendChild(userEmail);
        myLi.appendChild(userRole);
    }
    
    
    
    })