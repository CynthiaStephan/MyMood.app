let stagiaires = [
    {
        id : '1',
        nom : 'stagiaire 1',
        mood : 30,
        call : false
    },
    {
        id : '2',
        nom : 'stagiaire 2',
        mood : 100,
        call : true
    },
    {
        id : '3',
        nom : 'stagiaire 3',
        mood : 10,
        call : false
    },
    {
        id : '4',
        nom : 'stagiaire 4',
        mood : 60,
        call : false
    },
    {
        id : '5',
        nom : 'stagiaire 5',
        mood : 10,
        call : false
    },
    {
        id : '6',
        nom : 'stagiaire 6',
        mood : 90,
        call : true
    },
    {
        id : '7',
        nom : 'stagiaire 7',
        mood : 40,
        call : false
    },
    {
        id : '8',
        nom : 'stagiaire 8',
        mood : 15,
        call : false
    },
    {
        id : '9',
        nom : 'stagiaire 9',
        mood : 35,
        call : false
    },
    {
        id : '10',
        nom : 'stagiaire 10',
        mood : 50,
        call : false
    },
    {
        id : '11',
        nom : 'stagiaire 11',
        mood : 1,
        call : false
    },
    {
        id : '12',
        nom : 'stagiaire 12',
        mood : 1,
        call : false
    },
    {
        id : '13',
        nom : 'stagiaire 13',
        mood : 1,
        call : false
    },
    {
        id : '14',
        nom : 'stagiaire 14',
        mood : 1,
        call : false
    },
    {
        id : '15',
        nom : 'stagiaire 15',
        mood : 35,
        call : false
    },
    {
        id : '16',
        nom : 'stagiaire 16',
        mood : 85,
        call : true
    }

]

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

for (let people of stagiaires) {
    console.log(people.id);
    let infoPerson = document.createElement('div');
    infoPerson.classList.add('infoPerson');
    infoPerson.setAttribute('id', `${people.id}`)
    let namePerson = document.createElement('div');
    namePerson.classList.add('namePerson');
    let moodPerson = document.createElement('div');
    moodPerson.classList.add('moodPerson');
    let moodscore = document.createElement('p');
    

    namePerson.textContent = people.nom;
    infoPerson.appendChild(namePerson);

    moodscore.textContent = people.mood;
    moodPerson.appendChild(moodscore);
    infoPerson.appendChild(moodPerson);

    studentStatus.appendChild(infoPerson);

    moodPerson.style.backgroundColor = moodColor(people.mood);

    if (people.call == true) {
            document.getElementById(`${people.id}`).style.backgroundColor = '#FF6B6E';
        } else {
            document.getElementById(`${people.id}`).style.backgroundColor = '#EFF2FF';
    }

    averageMood+=people.mood;

    document.getElementById(`${people.id}`).addEventListener('click', () => moodPopUp(people.nom, people.mood, people.call))

}

document.querySelector('.slider').value = (Math.floor(averageMood/stagiaires.length))
document.querySelector('.sliderValue').textContent = (Math.floor(averageMood/stagiaires.length))

const moodPopUp = (personName, personMood, personCall) => {
    console.log(personName, personMood, personCall);
    modal.classList.add("open");

    document.querySelector('.nom-stagiaire').textContent = personName;

    document.getElementById('cancel').addEventListener('click', () => {
        modal.classList.remove("open");
    })

    document.getElementById('resetMood').addEventListener('click', () => {
        
        modal.classList.remove("open");
    })

    document.getElementById('resetCall').addEventListener('click', () => {

        modal.classList.remove("open");
    })

}


