var seats = new Array()
let rows = 6
let cols = 10
let p_speed = 300
let doorCod ;
let queue = new Queue()
let passangers = new Array(6)
let is_running = false;
let is_auto = false;
const priority_order = [
    // #*# DO NOT TOUCH #*# //
    0,1,2,5,3
]
let stop_names_arr =  ['Ludhiana','Preet Palace','Dholewal','Sherpur','Gaspure','Sahnewal']

const stops = [
    {
        _id:00,
        title: 'Ludhiana',
        m:0
    },
    {
        _id:01,
        title: 'Preet Palace',
        m:1200
    },
    {
        _id:02,
        title: 'Dholewal',
        m:2500
    },
    {
        _id:03,
        title: 'Sherpur',
        m:5000
    },
    {
        _id:04,
        title: 'Gaspure',
        m:5450
    },
    {
        _id:05,
        title: 'Sahnewal',
        m:10000
    }
]

function setupSeats(){
    for(var i=0;i<cols;i++){
        let rowarr = []
        if(i===9){
            for(var j=0;j<rows;j++){
                rowarr.push(new Seat('C'+i+'R'+j, false, null))
            }
        }else{
            for(var j=0;j<rows;j++){
                if(j===3){
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
    let dest = stop_names_arr[randomIntFromInterval(1,stop_names_arr.length-1)]
    let pas = addPassenger(passenger.name, passenger.gender, passenger.age, curr_loc, dest, [],passenger.picture)
    move_to_queue(pas)
}

function move_to_queue(passenger){
    queue.enqueue(passenger)
    if(!is_running){
        is_running = true;
        setTimeout(follow_potocol, 1500)
    }
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



async function findPerfectSeat(passenger){

    let p_seat = new Promise(function(resolve, reject){
        var total_stops = stops.length
        var last_stop = stops[total_stops-1]
        var total_distance = last_stop.m
    
        var p_destination = stops.find((item)=> item.title == passenger.destination)
        var p_cover_distance_m = total_distance - p_destination.m
        var p_cover_distance_percentage = (p_destination.m/total_distance)*100
        let po = 0;
        if(Math.ceil(p_cover_distance_percentage) >= 95){
            po = 0
        }
        else if(Math.ceil(p_cover_distance_percentage) >= 76){
            po = 1
        }
        else if(Math.ceil(p_cover_distance_percentage) >=57){
            po = 2
        }
        else if(Math.ceil(p_cover_distance_percentage) >=38){
            po = 3
        }
        else if(Math.ceil(p_cover_distance_percentage) >=19){
            po = 4
        }
        else{
            po = 4
        }
        console.log(Math.ceil(p_cover_distance_percentage), po);
        resolve(checkSeatAvaliablity(po,0))
    })
    return await p_seat;
}

function checkSeatAvaliablity(priority_o){
    let chk_seat;
    let i;
    let po = priority_o>0?priority_o-1:priority_o;
    for (i=0;i<=9;i++){
        console.log('PO',po);
        chk_seat = seats[i][priority_order[po]]
        if(!chk_seat.is_occupied){
            if(chk_seat._id.includes('H')){
                po = priority_o>=5?priority_o -1:priority_o +1
                i=0
                continue
            }else{
                return chk_seat
            }
            
        }
    }
    checkSeatAvaliablity(po<5?po+1:po-1)
}

async function follow_potocol(){
    while(!queue.isEmpty()){
        let new_pass = queue.front()
        new_pass.enter()
        setTimeout(()=>new_pass.move_to_hallway(),3000)

        let perfect_seat = await findPerfectSeat(new_pass)

        console.log(perfect_seat);
        var p_id = perfect_seat._id
        var c = p_id.charAt(1)
        var r = p_id.charAt(3)

        seats[c][r].updatePassenger(new_pass)
        updateSeatDataWithUser(new_pass,perfect_seat)

        setTimeout(()=>new_pass.move_x(perfect_seat._x),6500)
        delay(1000)
        setTimeout(()=>new_pass.move_y(perfect_seat._y),9000)
        
        queue.dequeue()
    }
    is_running = false
}


let automation;

function automateTest(){
    if(!is_auto){
        is_auto=true;
        console.log('Automation start');
        getElemById('automateBtn').innerHTML='Stop-Test'
        automation = setInterval(() => {
            getElemById('addRandomBtn').click()
        }, 2000);
    }else{
        alert('Automation Stopped')
        getElemById('automateBtn').innerHTML='StartTest'
        is_auto=false;
        clearInterval(automation);
    }
}

window.onload = ()=>{
    setupSeats()
    displaySeats()
    updateElemLoactions()
}