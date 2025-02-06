const requestUsers = 'http://localhost:3650/user/trainees';

// Requête fetch pour récupérer les utilisateurs
fetch(requestUsers)
    .then(
        response => response.json()
    )
    .then(
        data => {
            showUsers(data); //Fonction pour les utilisateurs
            callMood(data); // Fonction pour le mood
        }
    )
    .catch(
        error => console.log(error)
    )



let studentStatus = document.querySelector('#studentStatus');
let moodPerson = document.querySelector('.moodPerson');

// Fonction pour déterminer la couleur de la pastille en fonction du score de l'humeur
const moodColor = (mColor) => {

   let color;

     switch(true) {
        case mColor <= 10 :
            color = '#0FFC4E';
            break;
        case mColor >= 11 && mColor <= 20 :
            color = '#79E955';
            break;
        case mColor >= 21 && mColor <= 30 :
            color = '#A4E258';
            break;
        case mColor >= 31 && mColor <= 40 :
            color = '#CBDB5A';
            break;
        case mColor >= 41 && mColor <= 50 :
            color = '#F2D45D';
            break;
        case mColor >= 51 && mColor <= 60 :
            color = '#FFB250';
            break;
        case mColor >= 61 && mColor <= 70 :
            color = '#FF8E40';
            break;
        case mColor >= 71 && mColor <= 80 :
            color = '#FF5D2A';
            break;
        case mColor >= 81 && mColor <= 90 :
            color = '#FF3919';
            break;
        case mColor >= 91 && mColor <= 100 :
            color = '#FF0D06';
            break;
        default :
            color = '#000000';
     }
     return color;
}

// Fonction qui crée et affiche des informations sur chaque utilisateur
const showUsers = (data) => {
    
    for (let people of data) {
        let infoPerson = document.createElement('div');
        infoPerson.classList.add('infoPerson');
        infoPerson.setAttribute('id', `${people.user_id}`)
        let namePerson = document.createElement('div');
        namePerson.classList.add('namePerson');
        let moodPerson = document.createElement('div');
        moodPerson.classList.add('moodPerson');
        let moodScore = document.createElement('p');
        moodScore.classList.add('moodscore');

        namePerson.textContent = `${people.first_name} ${people.last_name}`;
        infoPerson.appendChild(namePerson);

    
        studentStatus.appendChild(infoPerson);

        // Passe la case de l'utilisateur en rouge si celui-ci déclenche une alerte
        if (people.has_alert == true) {
            document.getElementById(`${people.user_id}`).style.backgroundColor = '#FF6B6E';
        } else {
            document.getElementById(`${people.user_id}`).style.backgroundColor = '#EFF2FF';
        }
        
    }
    

}

// Fonction qui récupère et affiche l'humeur de chaque utilisateur
const callMood = (users) => {
    users.forEach(user => {
        fetch(`http://localhost:3650/mood/${user.user_id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }})
        .then(response => response.json()) 
        .then(data => 
            {console.log(user, data);
            showMood(user, data)
        })
        .catch(error => console.error('Erreur:', error));
    });
}

// Variable qui servira a afficher la moyenne de mood de la formation sélectionnée
let averageMood = 0

// Fonction afichant le numéro correspondant a l'humeur de l'utilisateur
const showMood = (user, moodResult) => {

    const userId = document.getElementById(user.user_id);
    let moodPerson = document.createElement('div');
    moodPerson.classList.add('moodPerson');
    let moodScore = document.createElement('p');
    moodScore.classList.add('moodscore');
    moodScore.value = moodResult.score;
    moodScore.textContent = moodScore.value;
    moodScore.style.color = '#FFFFFF';

    moodPerson.appendChild(moodScore);
    userId.appendChild(moodPerson);

    // Applique la couleur en fonction du score de l'humeur
    moodPerson.style.backgroundColor = moodColor(moodScore.textContent);
    
    // Manipulation de la variable contenant la moyenne de mood de la formation
    if (isNaN(moodScore.value)) {
        averageMood+=0;
    } else {
        averageMood+=moodScore.value;
    }

    // Affiche la moyenne de mood sur un slider et met à jour la valeur du slider
    document.querySelector('.slider').value = (Math.floor(averageMood/user.length));
    document.querySelector('.sliderValue').textContent = document.querySelector('.slider').value;

}

// Se deconnecter
function logout(){
    localStorage.clear(); // Vide tout le localStorage
    fetch(`${apiUrlLogout}`, {
      method: 'POST',
    })
    .catch(error => console.error('Problème lors de la déconnexion', error));
  }