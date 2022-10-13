//QUEUE CLASS
class Queue{

    constructor(){
        this.items = []
    }

    // enqueue function
    enqueue(element){    
        // adding element to the queue
        this.items.push(element);
    }

    // dequeue function
    dequeue(){
        // removing element from the queue
        // returns underflow when called 
        // on empty queue
        if(this.isEmpty())
            return "ERR_UNDERFLOW";
        return this.items.shift();
    }

    // front function
    front(){
        // returns the Front element of 
        // the queue without removing it.
        if(this.isEmpty())
            return "ERR_EMPTY_QUEUE";
        return this.items[0];
    }

    // isEmpty function
    isEmpty(){
        // return true if the queue is empty.
        return this.items.length === 0;
    }

    //returns the length of the array 
    length(){
        return this.items.length;
    }
    
    // printQueue function
    printQueue(){
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }
}

// /// /// Utils functions /// /// //

//get elem by id short
function getElemById(x_id){
    return document.getElementById(x_id)
}

//get cordiniates of an element
function getPositionXY(element) {
    var elem = element.getBoundingClientRect();
    return {
        x: elem.x,
        y: elem.y
    }
}

//get cordiniates of seat by id
function gerCordsOfSeatById(seat_id){
    var c = seat_id.charAt(1)
    var r = seat_id.charAt(3)
    let res = seats[c][r].getCords()
    return {
        ...res,
        col: c,
        row: r
    }
}

function createSeatcontent(seat){
    return `<div class='seatContent'>
        <ul>
            ${seat.is_occupied?`<li>Passenger Name</li>`:`<li></li>`}
            <li>
                <span>S-#${seat._id}</span>
                <span>P-${seat.is_occupied?'ID':'Avaliable'}</span>
            </li>
            <li>${seat.is_occupied?'Year':''}</li>
            ${seat.is_occupied?`<li>p.from to p.to<li>`:``}
        </ul>
    </div>
    `
}

function createSeatcontentWithUser(seat, user){
    return `<div class='seatContent'>
        <ul>
            <li>${user.name}</li>
            <li>
                <span>S-#${seat._id}</span>
                <span>P-${user._id}</span>
            </li>
            <li>${user.age} | ${user.gender}</li>
            <li>${user.from} -- ${user.destination}<li>
        </ul>
    </div>
    `
}

function createUserContent(user){
    return `<div class='passengerContent'>
        <ul>
            <li>${user.name}</li>
            <li>
                <span title="Passenger-ID">P-#${user._id}</span>
            </li>
            <li><b>${user.age} | ${user.gender}</b></li>
            <li><b>From : </b><em>${user.from}</em><li>
            <li><b>Destination : </b><em>${user.destination}</em><li>
        </ul>
    </div>
    `
}
    
function createHTMLSeat(seat){
        let sc = createSeatcontent(seat);
        return `<div class='seat' id='${seat._id}'>
               ${sc}
            </div>`
}   

function updateSeatDataWithUser(user, seat){
    var element = getElemById(seat._id)
    let data = createSeatcontentWithUser(seat,user)
    element.innerHTML = data
}


// delay
const delay = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

//random int
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}