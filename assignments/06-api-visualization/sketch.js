//global variables
let topOfCanvas = 0; //for the button to be constrained within the canvas
let leftOfCanvas = 0;

let hue = 120; //variables for frog drawing
let sat = 65;
let bright = 75;
let w = 80;
let h = 100;
let start = 180; 
let end = 360;

let padArray = [ //lily pad array with predefined values
	{x: 130, y: 535},
	{x: 220, y: 500},
	{x: 330, y: 530},
	{x: 450, y: 520}
];
let frogArray = []; //other object arrays
let flyArray = [];
let cloudArray = [];
let rainArray = [];

async function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent("#p5Sketch");

	colorMode(HSB, 360, 100, 100);
	angleMode(DEGREES);

	topOfCanvas = (windowHeight - height)/2;
	leftOfCanvas = (windowWidth - width)/2;

	for (let i = 0; i < 3; i++) { //creates three clouds at different positions
		cloudArray.push(new Cloud(150 + i * 200, 70 + i * 35));
	}

	for (let c of cloudArray) { //attaches 25 raindrops per cloud, varying positioning
		for (let j = 0; j < 25; j++) {
			let raindrops = new Rain(c, random(-80, 80));
			rainArray.push(raindrops);
		}	
	}
	
	for (let p of padArray) { //uses the predefined values of the array to place the frogs exactly on top
		let frogs = new Frogs(p.x, p.y);
		frogArray.push(frogs);
	}

	let addBug = createButton("Add Fly"); //button creation
	addBug.position(leftOfCanvas - 310, topOfCanvas + 30);
	addBug.size(70, 30);
	addBug.style("background-color", "gray");
	addBug.style("font-family", "lucida console");
	addBug.parent("#p5Sketch");

	addBug.mousePressed(addFly); //when button pressed a new fly is added to its corresponding array
}

function draw() {
	//if (!Background) { //if the toggler is false
		background(196, 100, 75); //darker background

		pond();
		lilyPads();
		
		for (let f of frogArray) { //iterates through array, creates frog, allows for height to be changed with slider
			f.createFrog();
			f.frogJump(200);
		}

		for (let c of cloudArray) { //iterates through array, makes sure clouds restart after reaching end of canvas while moving
			c.cloudX = c.cloudX % width;
			c.createCloud();
			c.moveCloud();
		}
		
		for (let r of rainArray) { //iterates through array, creates rain and rain down
			r.rainDown();
			r.createRain();
		}
	// } else {
	// 	background(196, 100, 100); //lighter background

	// 	pond();
	// 	lilyPads();

	// 	for (let f of frogArray) { //stops the jumping
	// 		f.createFrog();
	// 		f.dontJump();
	// 	}

	// 	for (let c of cloudArray) { //same as first condition
	// 		c.cloudX = c.cloudX % width;
	// 		c.createCloud();
	// 		c.moveCloud();
	// 	}
	// }
	drawFly(); //calls function that draws the flies
}