let slider = document.querySelector('.slider');
let callBtn = document.querySelector('.callBtn');
let send = document.querySelector('.send');

const userDataString = localStorage.getItem("userData");
const userData = JSON.parse(userDataString);

const sendSliderValue = () => {
    let sliderValue = slider.value;
    fetch(`http://localhost:3650/mood/new/${userData.id}`, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            "score": sliderValue
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error)) 
}

send.addEventListener("click", () => sendSliderValue());

// Se deconnecter
function logout(){
    fetch(`${apiUrlLogout}`, {
      method: 'POST',
    })
    .catch(error => console.error('Problème lors de la déconnexion', error));
    localStorage.clear(); // Vide tout le localStorage
  }