let slider = document.querySelector('.slider');
let callBtn = document.querySelector('.callBtn');

const sendSliderValue = (user) => {
    let sliderValue = slider.value;
    fetch(`http://localhost:3650/mood/new/${user}`, {
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

slider.addEventListener("mouseup", () => sendSliderValue(1));