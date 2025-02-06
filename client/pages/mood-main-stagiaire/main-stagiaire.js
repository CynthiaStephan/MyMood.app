let slider = document.querySelector('.slider');
let callBtn = document.querySelector('.callBtn');
let send = document.querySelector('.send');

// Récupération des données utilisateur à partir du localStorage et les convertir
const userDataString = localStorage.getItem("userData");
const userData = JSON.parse(userDataString);

// Fonction pour envoyer la valeur du slider
const sendSliderValue = () => {
    let sliderValue = slider.value;

    // Envoi de la requête POST pour sauvegarder la valeur du slider
    fetch(`http://localhost:3650/mood/new/${userData.id}`, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json' // Spécifie que le corps de la requête est en JSON
        },
        body: JSON.stringify({ //// Corps de la requête, contenant la valeur du slider sous forme de JSON
            "score": sliderValue
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error)) 
}

// Ajout d'un écouteur d'événements sur le bouton d'envoi
send.addEventListener("click", () => sendSliderValue());

// Se deconnecter
function logout(){
    localStorage.clear(); // Vide tout le localStorage
    fetch(`${apiUrlLogout}`, {
      method: 'POST',
    })
    .catch(error => console.error('Problème lors de la déconnexion', error));
  }