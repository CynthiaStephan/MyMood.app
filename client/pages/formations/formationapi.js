const requestUsers = 'http://localhost:3650/user/trainee-users';

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
        let moodScore = document.createElement('p');
        moodScore.classList.add('moodscore');

        namePerson.textContent = `${people.first_name} ${people.last_name}`;
        infoPerson.appendChild(namePerson);
    
        moodScore.value = Math.floor(getRandomNumber(0, 100));
        moodScore.textContent = moodScore.value;
        moodPerson.appendChild(moodScore);
        infoPerson.appendChild(moodPerson);
    
        studentStatus.appendChild(infoPerson);

        moodPerson.style.backgroundColor = moodColor(moodScore.textContent);

        // if (people.call == true) {
        //     document.getElementById(`${people.id}`).style.backgroundColor = '#FF6B6E';
        // } else {
        //     document.getElementById(`${people.id}`).style.backgroundColor = '#EFF2FF';
        // }

        averageMood+=moodScore.value;
    }

    document.querySelector('.slider').value = (Math.floor(averageMood/data.length))
    document.querySelector('.sliderValue').textContent = (Math.floor(averageMood/data.length))
}

