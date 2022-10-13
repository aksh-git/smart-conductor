var seats = new Array()
let rows = 6
let cols = 10
let p_speed = 300
let doorCod ;
let queue = new Queue()
let passangers = new Array(6)


function setupSeats(){
    for(var i=0;i<cols;i++){
        let rowarr = []
        if(i===9){
            for(var j=0;j<rows;j++){
                rowarr.push(new Seat('C'+i+'R'+j, false, null))
            }
        }else{
            for(var j=0;j<rows;j++){
                if(j===2){
                    rowarr.push(new Seat('H'+i+'R'+j, false, null));
                }else{
                    rowarr.push(new Seat('C'+i+'R'+j, false, null))
                }
            }
        }
        
        seats.push(rowarr)
    }
    
}

function displaySeats(){
    let seatsHTMl = document.getElementById('seats');
    var i = 0
    let htmlCol ='';
    seats.map((col)=>{
        var scols='';
        col.map((seat)=>{
            scols += seat._id.includes('H')?`<div class='hallway' id='${seat._id}'></div>`:createHTMLSeat(seat)
        })
        htmlCol += `<div class='col c${i}' id='c${i}'>${scols}</div>`
        scols=' ';
        i++;
    })
    seatsHTMl.innerHTML = htmlCol;
}

function updateElemLoactions(){
    let seat_elem_arr  = document.getElementsByClassName('seat');
    doorCod = getPositionXY(getElemById('door'))
    Array.prototype.forEach.call(seat_elem_arr, function(seat_elem) {
        var {x ,y} = getPositionXY(seat_elem)
        elem_id = seat_elem.id
        var c = elem_id.charAt(1)
        var r = elem_id.charAt(3)
        seats[c][r].updatePosition(x, y)
    });
}

async function addRandomPassenger(){
    let user = await fetch('https://randomuser.me/api/',{
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        return data.results[0]
    })

    let { name, gender, picture, dob } = user

    let passenger = {
        name : name.first+' '+name.last,
        gender: gender,
        picture : picture.thumbnail,
        age : dob.age
    }

    let curr_loc = 'Ludhiana'
    let dest = 'GGI'
    let pas = addPassenger(passenger.name, passenger.gender, passenger.age, curr_loc, dest, [],passenger.picture)
    console.log(pas);
    move_to_queue(pas)
}

function move_to_queue(passenger){
    queue.enqueue(passenger)
    setTimeout(follow_potocol, 1500)
}

function addPassenger(name, gender, age, from, destination, with_someone, picture){
    let pas = new Passenger(
        genrateID(),
        name, 
        gender,
        age, 
        from,
        destination,
        with_someone===undefined?[]:with_someone,
        picture===null?'':picture,
    )

    var usercontent = createUserContent(pas)
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    let elem = document.createElement('div')
    elem.classList.add('passenger')
    elem.id = pas._id
    elem.style.background=picture===null?'#'+randomColor:`url('${picture}')`;
    document.body.appendChild(elem)
    elem.innerHTML = usercontent

    document.getElementById(pas._id).style.left=Math.ceil(pas._x)+'px'
    document.getElementById(pas._id).style.top=Math.ceil(pas._y)+'px'
    
    return pas;
}

window.onload = ()=>{
    setupSeats()
    displaySeats()
    updateElemLoactions()   
}

function findPerfectSeat(){

}

function follow_potocol(){
    if(!queue.isEmpty()){
        let user = queue.front()
        user.enter()
    }else{
        console.log('NO PASSENGERS');
    }
}

