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
        mood : 50,
        call : false
    },
    {
        id : '3',
        nom : 'stagiaire 3',
        mood : 20,
        call : true
    },
    {
        id : '4',
        nom : 'stagiaire 4',
        mood : 80,
        call : false
    },
    {
        id : '5',
        nom : 'stagiaire 5',
        mood : 60,
        call : false
    },
    {
        id : '6',
        nom : 'stagiaire 6',
        mood : 90,
        call : false
    },
    {
        id : '7',
        nom : 'stagiaire 7',
        mood : 100,
        call : true
    },
    {
        id : '8',
        nom : 'stagiaire 8',
        mood : 15,
        call : false
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



for (let people of stagiaires) {
    console.log(people.id);
    let infoPerson = document.createElement('div');
    infoPerson.classList.add('infoPerson');
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

}

// for (let )
// if (people.call = true) {
//         document.querySelector('.infoPerson').style.backgroundColor = '#FF6B6E';
//     } else {
//         document.querySelector('.infoPerson').style.backgroundColor = '#EFF2FF';
//     }
