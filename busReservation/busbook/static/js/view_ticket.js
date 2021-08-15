let viewBtnElement = document.querySelector('.btn-primary')
let ticketIDElement = document.querySelector('.input')
let searchResultElement = document.querySelector('.search-result')

function sendAndRecieveData(ticketID)
{
    return fetch('/view_ticket/', {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'X-CSRFToken' : csrftoken
        },
        body:JSON.stringify({'ticketID' : ticketID})
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    
}

viewBtnElement.addEventListener('click', function(event)
{
    event.preventDefault();
    console.log('YO')
    let ticketID = ticketIDElement.value;
    sendAndRecieveData(ticketID).then(ticketAndBus=>{
        console.log(ticketAndBus)
        let temp = document.querySelector('.display-result')
        if(temp)temp.remove();
        let template;
        if(ticketAndBus.notFound)
        {
            template = 
            `
            <div class = "container display-result">
                <h3>No Ticket Found!</h3>
            </div>
            `
        }
        else
        {
            let ticket = ticketAndBus[0];
            let bus = ticketAndBus[1];
            template =
            `
            <div class = "container display-result">
                <h2>Passenger Ticket</h2>
                <h3>Bus Details</h3>
                <div class="row">
                    <div class="col-md-2">
                        <strong>Bus Name : </strong><br>${bus.fields.name}
                    </div>
                    <div class="col-md-2">
                        <strong>From : </strong><br>${bus.fields.fromPlace}
                    </div>
                    <div class="col-md-2">
                        <strong>To : </strong><br>${bus.fields.toPlace}
                    </div>
                    <div class="col-md-2">
                        <strong>Departure : </strong><br>${bus.fields.departureTime}
                    </div>
                    <div class="col-md-2">
                        <strong>Arrival : </strong><br>${bus.fields.arrivalTime}
                    </div>
                    <div class="col-md-2">
                        <strong>Price : </strong><br>${bus.fields.price}
                    </div>
                </div>

                <h3>Passenger Details</h3>
                <div class="row">
                    <div class="col-md-2">
                        <strong>First Name : </strong><br>${ticket.fields.passengerFirstName} 
                    </div>
                    <div class="col-md-2">
                        <strong>Last Name : </strong><br>${ticket.fields.passengerLastName}
                    </div>
                    <div class="col-md-2">
                        <strong>Gender : </strong><br>${ticket.fields.passengerGender}
                    </div>
                    <div class="col-md-2">
                        <strong>Age : </strong><br>${ticket.fields.passengerAge}
                    </div>
                    <div class="col-md-2">
                        <strong>Mobile : </strong><br>${ticket.fields.passengerPhone}
                    </div>
                    <div class="col-md-2">
                        <strong>Email : </strong><br>${ticket.fields.passengerEmail}
                    </div>
                </div>

                <h3>Seat Details</h3>
                <div class="row">
                    <div class="col-md-2">
                        <strong>Seat Number : </strong><br>${ticket.fields.seatNumber}
                    </div>
                </div>
            </div>      
            `;
            
        }
        searchResultElement.insertAdjacentHTML('beforeend', template)
    })
})