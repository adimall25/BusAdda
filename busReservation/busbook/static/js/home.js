
let searchBtnElement = document.querySelector('.search-btn');
let fromInputElement = document.querySelector('.from-input');
let toInputElement = document.querySelector('.to-input');
let tableElement = document.querySelector('.search-result table')
let searchDivElement = document.querySelector('.search-result')


function sendAndReceiveData(fromPlace, toPlace)
{
    return fetch('/home/', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : csrftoken,
        },
        body : JSON.stringify({'fromPlace' : fromPlace, 'toPlace' : toPlace})
    })
    .then(response => response.json())
    .then(data => 
        {
            return data;
        })
}

searchBtnElement.addEventListener('click', function(event)
{
    event.preventDefault();
    let fromPlace = fromInputElement.value, toPlace = toInputElement.value;
    sendAndReceiveData(fromPlace, toPlace).then(function(matched_buses)
    {
        let availableBusElements = document.querySelectorAll('.available-bus') 
        
        for(let i = 0; i < availableBusElements.length; i++)
        {
            tableElement.style.display = 'none';
            availableBusElements[i].remove();
        }
        tableElement.style.display = 'none';
        console.log(matched_buses);
        for(let i = 0; i < matched_buses.length; i++)
        {
            tableElement.style.display = 'inline-block';
            ticket_url = `http://localhost:8000/book/${matched_buses[i].pk}`
            let template =
            `
                <tr class = "available-bus">
                    <td>${matched_buses[i].fields.name}</td>
                    <td>${matched_buses[i].fields.fromPlace}</td>
                    <td>${matched_buses[i].fields.toPlace}</td>
                    <td>${matched_buses[i].fields.arrivalTime}</td>
                    <td>${matched_buses[i].fields.departureTime}</td>
                    <td>${matched_buses[i].fields.price}</td>
                    <td><a class = "btn" href = "${ticket_url}">Book Now</a></td>
                </tr>
                    
            `
            tableElement.insertAdjacentHTML('beforeend', template)
        }
        if(matched_buses.length == 0)
        {
            let template = `
            <h3 class = "available-bus">
                No bus found!
            </h3>
            `
            searchDivElement.insertAdjacentHTML('beforeend', template);
        }
    })
    
})

// let availableBusElements

// searchBtnElement.addEventListener('click', function()
// {
//     fromPlace = fromInputElement.value;//if we want to get only values then we use .value after selecting
//     toPlace = toInputElement.value;//if we want to get only values then we use .value after selecting if we don't this we wont select value but whole input box.

    
//     if(fromPlace !== "" && toPlace !== "")
//     {
        // availableBusElements = document.querySelectorAll('.available-bus') 
        
        // for(let i = 0; i < availableBusElements.length; i++)
        // {
        //     tableElement.style.display = 'none';
        //     availableBusElements[i].remove();
        // }

        

//         let found = false;
        
//         busesData.forEach(function(bus)
//         {
//             if(bus.to.toLowerCase() === toPlace.toLowerCase() && bus.from.toLowerCase() === fromPlace.toLowerCase())
//             {
//                 tableElement.style.display = 'inline-block';
//                 found = true;
//                 console.log('matched')
                // let template = `
                // <tr class = "available-bus">
                //     <td>${bus.name}</td>
                //     <td>${bus.from}</td>
                //     <td>${bus.to}</td>
                //     <td>${bus.arrival}</td>
                //     <td>${bus.departure}</td>
                //     <td>${bus.price}</td>
                //     <td><a class = "btn" href = "form11.html">Book Now</a></td>
                // </tr>
                // `
                // tableElement.insertAdjacentHTML('beforeend', template)
//             }
//         })
        
//         if(!found)
//         {
            // let template = `
            // <h3 class = "available-bus">
            //     No bus found!
            // </h3>
            // `
            // searchDivElement.insertAdjacentHTML('beforeend', template)
//         }
//     }
// })






// let busesData = [

//     {
//         "name" : "Amritsar Express",
//         "from" : "Jalandhar",
//         "to" : "Ludhiana",
//         "price" : 250,
//         "arrival" : "9:30AM",
//         "departure" : "9:45AM"
//     },

//     {
//         "name" : "Shuttl",
//         "from" : "Amritsar",
//         "to" : "Jalandhar",
//         "price" : 359,
//         "arrival" : "21:30PM",
//         "departure" : "19:30PM"
//     },

//     {
//         "name" : "Prince Travels",
//         "from" : "Amritsar",
//         "to" : "Chandigarh",
//         "price" : 499,
//         "arrival" : "21:50PM",
//         "departure" : "20:00PM"
//     },

//     {
//         "name" : "Orbit Aviation",
//         "from" : "Amritsar",
//         "to" : "Patiala",
//         "price" : 224,
//         "arrival" : "16:00PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Orbit Aviation",
//         "from" : "Bathinda",
//         "to" : "Chandigarh",
//         "price" : 500,
//         "arrival" : "23:30PM",
//         "departure" : "19:30PM"
//     },

//     {
//         "name" : "Zimindara Travels",
//         "from" : "Bathinda",
//         "to" : "Jalandhar",
//         "price" : 699,
//         "arrival" : "6:00AM",
//         "departure" : "00:45AM"
//     },

//     {
//         "name" : "New Deep Travels",
//         "from" : "Bathinda",
//         "to" : "Patiala",
//         "price" : 300,
//         "arrival" : "18:40PM",
//         "departure" : "16:15PM"
//     },

//     {
//         "name" : "Shekhar Travels",
//         "from" : "Barnala",
//         "to" : "Jalandhar",
//         "price" : 450,
//         "arrival" : "21:30PM",
//         "departure" : "19:30PM"
//     },

//     {
//         "name" : "Yellow Pedal",
//         "from" : "Barnala",
//         "to" : "Chandigarh",
//         "price" : 449,
//         "arrival" : "23:30PM",
//         "departure" : "19:45PM"
//     },

//     {
//         "name" : "Pepsu",
//         "from" : "Barnala",
//         "to" : "Patiala",
//         "price" : 224,
//         "arrival" : "16:00PM",
//         "departure" : "14:35PM"
//     },

//     {
//         "name" : "Shekhar Travels",
//         "from" : "Fatehgrarh Sahib",
//         "to" : "Jalandhar",
//         "price" : 450,
//         "arrival" : "21:30PM",
//         "departure" : "19:30PM"
//     },

//     {
//         "name" : "Yellow Pedal",
//         "from" : "Fatehgrarh Sahib",
//         "to" : "Chandigarh",
//         "price" : 449,
//         "arrival" : "23:30PM",
//         "departure" : "19:45PM"
//     },

//     {
//         "name" : "Pepsu",
//         "from" : "Fatehgrarh Sahib",
//         "to" : "Patiala",
//         "price" : 224,
//         "arrival" : "16:00PM",
//         "departure" : "14:35PM"
//     },

//     {
//         "name" : "Amit Travels",
//         "from" : "Fazilka",
//         "to" : "Jalandhar",
//         "price" : 750,
//         "arrival" : "5:30PM",
//         "departure" : "11:30PM"
//     },

//     {
//         "name" : "Yellow Pedal",
//         "from" : "Fazilka",
//         "to" : "Chandigarh",
//         "price" : 700,
//         "arrival" : "2:00AM",
//         "departure" : "19:45PM"
//     },

//     {
//         "name" : "Pepsu",
//         "from" : "Fazilka",
//         "to" : "Patiala",
//         "price" : 1000,
//         "arrival" : "18:00PM",
//         "departure" : "14:35PM"
//     },

//     {
//         "name" : "Shekhar Travels",
//         "from" : "Firozpur",
//         "to" : "Jalandhar",
//         "price" : 450,
//         "arrival" : "21:30PM",
//         "departure" : "19:30PM"
//     },

//     {
//         "name" : "New Deep Bus Service",
//         "from" : "Firozpur",
//         "to" : "Chandigarh",
//         "price" : 424,
//         "arrival" : "7:50AM",
//         "departure" : "4:15AM"
//     },

//     {
//         "name" : "Jujhar Travels",
//         "from" : "Firozpur",
//         "to" : "Patiala",
//         "price" : 224,
//         "arrival" : "16:00PM",
//         "departure" : "14:35PM"
//     },

//     {
//         "name" : "Sangnam travels",
//         "from" : "Gurdaspur",
//         "to" : "Jalandhar",
//         "price" : 450,
//         "arrival" : "23:00PM",
//         "departure" : "19:50PM"
//     },

//     {
//         "name" : "Yellow Pedal",
//         "from" : "Gurdaspur",
//         "to" : "Chandigarh",
//         "price" : 225,
//         "arrival" : "20:00PM",
//         "departure" : "17:45PM"
//     },

//     {
//         "name" : "Pepsu",
//         "from" : "Gurdaspur",
//         "to" : "Patiala",
//         "price" : 550,
//         "arrival" : "20:00PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Shekhar Travels",
//         "from" : "Hoshiarpur",
//         "to" : "Jalandhar",
//         "price" : 160,
//         "arrival" : "11.30AM",
//         "departure" : "10:05AM"
//     },
//     {
//         "name" : "Shekhar Travels",
//         "from" : "Hoshiarpur",
//         "to" : "Jalandhar",
//         "price" : 160,
//         "arrival" : "11.30AM",
//         "departure" : "10:05AM"
//     },
//     {
//         "name" : "Yellow Pedal",
//         "from" : "Hoshiarpur",
//         "to" : "Chandigarh",
//         "price" : 90 ,
//         "arrival" : "17.00PM",
//         "departure" : "15:45PM"
//     },
//     {
//         "name" : "Pepsu",
//         "from" : "Hoshiarpur",
//         "to" : "Patiala",
//         "price" : 224,
//         "arrival" : "16.00PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Laxmi holidays",
//         "from" : "Jalandhar",
//         "to" : "Amritsar",
//         "price" : 522,
//         "arrival" : "08:00AM",
//         "departure" : "05:55AM"
//     },
//     {
//         "name" : "Guardian Tour and Travels",
//         "from" : "Jalandhar",
//         "to" : "Chandigarh",
//         "price" : 385 ,
//         "arrival" : "09:00AM",
//         "departure" : "06:50AM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Jalandhar",
//         "to" : "Patiala",
//         "price" : 205 ,
//         "arrival" : "18:20PM",
//         "departure" : "13:30PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Faridkot",
//         "to" : "Jalandhar",
//         "price" : 200 ,
//         "arrival" : "21.00PM",
//         "departure" : "19:30PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Faridkot",
//         "to" : "Chandigarh",
//         "price" : 449  ,
//         "arrival" : "21.30PM",
//         "departure" : "19:45PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Faridkot",
//         "to" : "Patiala",
//         "price" : 224 ,
//         "arrival" : "16.15PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Shekhar Travels",
//         "from" : "Kapurthala",
//         "to" : "Jalandhar",
//         "price" : 100 ,
//         "arrival" : "20.00PM",
//         "departure" : "19:30PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Kapurthala",
//         "to" : "Chandigarh",
//         "price" : 449 ,
//         "arrival" : "16.00PM",
//         "departure" : "11:25PM"
//     },
//     {
//         "name" : "Pepsu",
//         "from" : "Kapurthala",
//         "to" : "Patiala",
//         "price" : 524  ,
//         "arrival" : "18.00PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Ludhiana ",
//         "to" : "Jalandhar",
//         "price" : 85  ,
//         "arrival" : "11.30AM",
//         "departure" : "09:26AM"
//     },
//     {
//         "name" : "Jujhar Travels",
//         "from" : "Ludhiana ",
//         "to" : "Chandigarh",
//         "price" : 250  ,
//         "arrival" : "11.20PM",
//         "departure" : "9:20AM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Ludhiana ",
//         "to" : "Patiala",
//         "price" : 450,
//         "arrival" : "17.00PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Mansa ",
//         "to" : "Jalandhar",
//         "price" : 450 ,
//         "arrival" : "21.30PM",
//         "departure" : "19:30PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Mansa  ",
//         "to" : "Chandigarh",
//         "price" : 449  ,
//         "arrival" : "23.30PM",
//         "departure" : "19:45PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Mansa  ",
//         "to" : "Patiala",
//         "price" : 448  ,
//         "arrival" : "09:30AM",
//         "departure" : "06:10AM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Moga ",
//         "to" : "Jalandhar",
//         "price" : 200  ,
//         "arrival" : " 22.30PM",
//         "departure" : "19:30PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Moga ",
//         "to" : "Chandigarh",
//         "price" : 429  ,
//         "arrival" : "19:15PM",
//         "departure" : "15:40PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Moga  ",
//         "to" : "Patiala",
//         "price" : 224 ,
//         "arrival" : "17.00PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Pathankot ",
//         "to" : "Jalandhar",
//         "price" : 450  ,
//         "arrival" : "10.00PM",
//         "departure" : "7:55AM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Pathankot ",
//         "to" : "Chandigarh",
//         "price" : 616  ,
//         "arrival" : "19:10PM",
//         "departure" : "14:30PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Pathankot  ",
//         "to" : "Patiala",
//         "price" : 299 ,
//         "arrival" : "17.00PM",
//         "departure" : "14:35PM"
//     },
//     {
//         "name" : "Libra Bus Service",
//         "from" : "Patiala ",
//         "to" : "Jalandhar",
//         "price" : 450  ,
//         "arrival" : "10.30AM",
//         "departure" : "06:48AM"
//     },
//     {
//         "name" : "Pepsu Pcert",
//         "from" : "Patiala  ",
//         "to" : " Chandigarh",
//         "price" : 152 ,
//         "arrival" : "15.30PM",
//         "departure" : "13:45PM"
//     },
//     {
//         "name" : "Pepsu ",
//         "from" : "Patiala  ",
//         "to" : "Amritsar",
//         "price" : 417 ,
//         "arrival" : " 21.20PM",
//         "departure" : " 16:35PM<"
//     },

// ]