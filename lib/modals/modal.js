class Seat {
     
    constructor(_id, is_occupied, passenger){
        this._id = _id
        this.is_occupied = is_occupied
        this.passenger = passenger
        this._x
        this._y
    }

    updatePosition(x,y){
        this._x = x
        this._y = y
    }

    updatePassenger(passenger){
        this.is_occupied = true
        this.passenger=passenger
    }
    getCords(){
        return {
            x: this._y,
            y: this._y
        }
    }
}

function genrateID(){
    const length = 8;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var id = '';
    for (var i = length; i > 0; --i) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

class Passenger{

    constructor(id, name, gender, age, from, to , with_someone, picture){
        this._id = id
        this.name = name
        this.gender = gender
        this.age = age
        this.picture = picture
        this.from = from
        this.destination = to
        this.with_someone = with_someone
        this._x = (window.innerWidth * 1/3) - (Math.random()*80)
        this._y = (window.innerHeight * 8/9 )- (Math.random()*80)
        this.seatId
    }

    updatePosition(x, y){
        this._x = x
        this._y = y
    }

    move(x, y){
        document.getElementById(this._id).style.left=Math.ceil(x)+'px'
        document.getElementById(this._id).style.top=Math.ceil(y)+'px'
        this.updatePosition(x,y)
    }
    
    enter(){
        //enters in the bus
        this.move(doorCod.x, doorCod.y)
    }

    leave(){
        //leavs the bus
    }

    move_to_hallway(){
        let {x, y} = getPositionXY(getElemById('H0R2'))
        this.move(x-20,y-30)
    }

    move_in_hallway(){
        //leaves the seat and move to hallway
    }

}