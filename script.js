// document.getElementById("content").innerHTML = "This is Javascript";
const apiURL = 'https://calendar.pitt.edu/api/2';
const apiKey = 'actual key will go here eventually';

const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
};

const outputElement = document.getElementById('content');

let currURL = apiURL + '/events/search?search=Sennott';

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
        // console.log(data);
        // outputElement.textContent = JSON.stringify(data, null, 2);
        // outputElement.textContent = data.events.length;
        // console.log(JSON.stringify(data.events, null, 2));
        for(let i = 0; i < data.events.length; i++){
            curr = data.events[i]['event'];
            console.log(curr);
            document.getElementById('event_name').innerHTML = curr.title;
            document.getElementById('location').innerHTML = curr.room_number;
            document.getElementById('event_desc').innerHTML = curr.description_text;
        }
        
    })
    .catch(error => {
        console.error("Error:", error);
    });