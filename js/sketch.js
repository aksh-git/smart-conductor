let seats = [
    [
        {
            _id:3,
            isFull:true,
            passenger:{
                _id :263842,
                name :"A",
            },
        },
        {
            _id:5,
            isFull:true,
            passenger:{
                _id :263842,
                name :"B",
            },
        },
        {
            _id:0,
            isFull:false,
            passenger:{},
        },
        {
            _id:4,
            isFull:true,
            passenger:{
                _id :263842,
                name :"D",
            },
        },
        {
            _id:2,
            isFull:true,
            passenger:{
                _id :263842,
                name :"E",
            },
        },
        {
            _id:1,
            isFull:true,
            passenger:{
                _id :263842,
                name :"F",
            },
        }
    ],
    [
        {
            _id:3,
            isFull:true,
            passenger:{
                _id :263842,
                name :"A",
            },
        },
        {
            _id:5,
            isFull:true,
            passenger:{
                _id :263842,
                name :"B",
            },
        },
        {
            _id:0,
            isFull:false,
            passenger:{},
        },
        {
            _id:4,
            isFull:true,
            passenger:{
                _id :263842,
                name :"D",
            },
        },
        {
            _id:2,
            isFull:true,
            passenger:{
                _id :263842,
                name :"E",
            },
        },
        {
            _id:1,
            isFull:true,
            passenger:{
                _id :263842,
                name :"F",
            },
        }
    ]
]



function setup(){
    createCanvas(windowWidth*2/3, windowHeight);
    background(55);
    frameRate(30);
}

function draw(){
    let gap = 50
    let r1 = 100;
    let c1 = 100;
    seats.map((row)=>{
        row.map((seat)=>{
            if(seat._id===0){   
                c1 += gap+gap;
            }else{
                fill(255, 204, 0);
                circle(c1, r1, 20);        
                c1 += gap;
            }
        })
        r1 += gap
        c1 = 100
    })
}