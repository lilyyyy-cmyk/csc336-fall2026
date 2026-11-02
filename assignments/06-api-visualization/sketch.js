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
	canvas.parent("#p5Sketch"); //add sketch to parent div

	colorMode(HSB, 360, 100, 100);
	angleMode(DEGREES);

	topOfCanvas = (windowHeight - height) / 2;
	leftOfCanvas = (windowWidth - width) / 2;

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
	addBug.position(leftOfCanvas - 302, topOfCanvas + 45);
	addBug.size(70, 30);
	addBug.style("background-color", "gray");
	addBug.style("font-family", "lucida console");
	addBug.parent("#p5Sketch"); //add button to parent div

	addBug.mousePressed(addFly); //when button pressed a new fly is added to its corresponding array
}

function draw() {
	if (weatherMode === "clear") { //if clear
		background(196, 100, 100); //lighter background

		sun(75);
		pond();
		lilyPads();

		for (let f of frogArray) { //iterates through frog array, creates frog, frogs jump at low height
			f.createFrog();
			f.frogJump(50);
		}

		for (let c of cloudArray) { //iterates through array, makes sure clouds restart after reaching end of canvas while moving
			c.cloudX = c.cloudX % width;
			c.cloudX = c.cloudX % width;
			c.createCloud(75);
			c.moveCloud();
		}
	} else if (weatherMode === "overcast") { //if overcast
		background(196, 100, 75); //darker background

		sun(75);
		pond();
		lilyPads();
		
		for (let f of frogArray) { //higher frog jump
			f.createFrog();
			f.frogJump(100);
		}

		for (let c of cloudArray) { //same as first condition
			c.cloudX = c.cloudX % width;
			c.createCloud(70); //darker cloud
			c.moveCloud();
		}
	} else if (weatherMode === "drizzle") { //if drizzle
		background(196, 75, 50); //darker background

		pond();
		lilyPads();
		
		for (let f of frogArray) { //higher frog jump
			f.createFrog();
			f.frogJump(150);
		}

		for (let c of cloudArray) { //same as first condition
			c.cloudX = c.cloudX % width;
			c.createCloud(50); //darker cloud
			c.moveCloud();
		}
		
		for (let r of rainArray) { //iterates through array, creates rain and rain down
			r.rainDown(random(1, 4));
			r.createRain();
		}
	} else if (weatherMode === "rain") { //if rain
		background(196, 50, 50); //darker background

		pond();
		lilyPads();
		
		for (let f of frogArray) { //frogs jump at their highest height
			f.createFrog();
			f.frogJump(200);
		}

		for (let c of cloudArray) { //same as first condition
			c.cloudX = c.cloudX % width;
			c.createCloud(50);
			c.moveCloud();
		}
		
		for (let r of rainArray) { //rains down at faster speeds
			r.rainDown(random(4, 7));
			r.createRain();
		}
	} 
	drawFly(); //calls function that draws the flies
}