const requestUsers = 'http://localhost:3650/user';

fetch(requestUsers)
    .then(
        response => response.json()
    )
    .then(
        data => showUsers(data)
    )
    .catch(
        error => console.log(error)
)

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min
}


let studentStatus = document.querySelector('#studentStatus');
let moodPerson = document.querySelector('.moodPerson');

const moodColor = (mColor) => {

   let color;

     switch(true) {
        case mColor <= 10 :
            color = '#64BCEB';
            break;
        case mColor >= 11 && mColor <= 25 :
            color = '#0FFC4E';
            break;
        case mColor >= 26 && mColor <= 50 :
            color = '#F1D45D';
            break;
        case mColor >= 51 && mColor <= 75 :
            color = '#FF9C46';
            break;
        case mColor >= 76 && mColor <= 100 :
            color = '#FF0F07';
            break;
        default :
            color = '#000000';
     }
     return color;
}

let averageMood = 0

const showUsers = (data) => {
    
    for (let people of data) {
        let infoPerson = document.createElement('div');
        infoPerson.classList.add('infoPerson');
        infoPerson.setAttribute('id', `${people.user_id}`)
        let namePerson = document.createElement('div');
        namePerson.classList.add('namePerson');
        let moodPerson = document.createElement('div');
        moodPerson.classList.add('moodPerson');
        let moodscore = document.createElement('p');
        moodscore.classList.add('moodscore');

        namePerson.textContent = `${people.first_name} ${people.last_name}`;
        infoPerson.appendChild(namePerson);
    
        moodscore.value = Math.floor(getRandomNumber(0, 100));
        moodPerson.appendChild(moodscore);
        infoPerson.appendChild(moodPerson);
    
        studentStatus.appendChild(infoPerson);

        moodPerson.style.backgroundColor = moodColor(moodscore.textContent);

        // if (people.call == true) {
        //     document.getElementById(`${people.id}`).style.backgroundColor = '#FF6B6E';
        // } else {
        //     document.getElementById(`${people.id}`).style.backgroundColor = '#EFF2FF';
        // }

        averageMood+=`${moodscore}`;
 
    }
        console.log(averageMood);
    
        // document.querySelector('.slider').value = (Math.floor(averageMood/i))
        // document.querySelector('.sliderValue').textContent = (Math.floor(averageMood/i))
}

