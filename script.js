const apiURL = 'https://calendar.pitt.edu/api/2';
// const apiKey = 'actual key will go here eventually';

// const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//     },
// };

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log("today: ", today);

const outputElement = document.getElementById('content');

let currURL = apiURL + '/events?start='+today+'&venue_id=514161';

// alt: fetch(apiUrl, requestOptions)
fetch(currURL)
    .then(response => {

        if(!response.ok){
            if (response.status === 404) {
                throw new Error('Data not found');
              } else if (response.status === 500) {
                throw new Error('Server error');
              } else {
                throw new Error('Network response was not ok');
              }
        }
        return response.json();

    })
    .then(data => {
        console.log(data.events);
        const contDiv = document.getElementById("content");
        for(let i = 0; i < data.events.length; i++){

            const newArt = document.createElement("article");
            curr = data.events[i]['event'];

            console.log(curr);

            const photo = document.createElement("img");
            const title = document.createElement("h4");
            const room = document.createElement("small");
            const day = document.createElement("small");
            const time = document.createElement("small");
            const desc = document.createElement("p");

            photo.setAttribute('src',curr.photo_url);
            title.innerHTML = curr.title;
            room.innerHTML = curr.room_number;
            desc.innerHTML = curr.description_text;
            // time in ISO-8601 format
            var date = new Date((curr.event_instances[0]).event_instance.start);

            var dateStr = new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'medium',
              timeZone: 'America/New_York',
            }).format(date);

            day.innerHTML = dateStr;

            var hour = date.getHours() % 12;
            var mins = date.getMinutes();
            if(mins === 0){
              mins = '00';
            }
            var tod = '';
            if(date.getHours() <= 11){
              tod = 'AM';
            }else{
              tod = 'PM';
            }
            var convTime = hour+":"+mins+" "+tod;

            time.innerHTML = convTime;

            newArt.appendChild(photo);
            newArt.appendChild(title);
            newArt.appendChild(room);
            newArt.appendChild(day);
            newArt.appendChild(time);
            newArt.appendChild(desc);
            contDiv.appendChild(newArt);

        }
        
    })
    .catch(error => {
        console.error("Error:", error);
    });