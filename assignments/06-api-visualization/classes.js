class Frogs { //frog class
	constructor(x, y) {
		this.x = x;
		this.y = y; 
		this.padY = y; //base y value
		this.p = random(360); //phase value
	}

	createFrog() { //frog drawing
		noStroke();
		
		fill(hue, sat, bright);
		arc(this.x, this.y, w, h, start, end, CHORD);
		ellipse(this.x, this.y, 80, 30);
		circle(this.x-20, this.y-50, 20);
		circle(this.x+20, this.y-50, 20);
	
		fill(hue-30, sat, bright);
		arc(this.x, this.y+8, w-20, h-20, start, end, CHORD);
		ellipse(this.x, this.y+8, 80-20, 30-20);
		
		fill(0, 0, 85);
		circle(this.x-20, this.y-50, 10);
		circle(this.x+20, this.y-50, 10);

		fill(0, 0, 0);
		circle(this.x-20, this.y-50, 7);
		circle(this.x+20, this.y-50, 7);

		fill(0, 0, 0);
		ellipse(this.x-3, this.y-40, 2, 4);
		ellipse(this.x+3, this.y-40, 2, 4);
	}

	frogJump(h) { //takes a height, makes the frog jump
		this.p += 3; //adds three to the phase
		this.y = this.padY - max(0, sin(this.p) * h); //base height subtracted by specified max() values
	} //x max is 0, y max is the sin of the phase * the height given

	dontJump() {
		this.y = this.padY; //defaults the frogs y value to the base height
	}
}

class Fly { //fly class
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.speed = random(1, 5); //randomized speed
	}

	createFly() { //draws the fly
		noStroke();

		fill(0, 0, 0);
		ellipse(this.x, this.y, 20, 10);

		fill(0, 0, 65, 50);
		arc(this.x, this.y - 5, 5, 10, 180, 360);
	}

	moveFly() { //moves the flies
		this.x += random(-this.speed, this.speed); //first two lines create the shaky movement in x and y directions
		this.y += random(-this.speed, this.speed);
		this.x = constrain(this.x, 0, width); //last two make sure the flies stay within the constraints
		this.y = constrain(this.y, 150, 480); //x direction spans from 0-width, y direction spans from 150-480
	}

	touched(frog) { //takes a variable, confines the distance to the area of the frogs
		return dist(this.x, this.y, frog.x, frog.y) < 50; //the "bubble" is 50px
	}
}

class Cloud { //cloud class
	constructor(x, y) {
		this.cloudX = x;
		this.cloudY = y;
		this.speed = random(1, 2); //randomized speed
	}
	
	createCloud(b) { //draws cloud
		noStroke();
		
		fill(0, 0, b);
		ellipse(this.cloudX + 10, this.cloudY, 200, 90);
		ellipse(this.cloudX - 20, this.cloudY + 20, 200, 70);
		ellipse(this.cloudX + 40, this.cloudY + 20, 200, 70);
	}

	moveCloud() { //moves cloud in the x direction
		this.cloudX += this.speed;
	}
}

class Rain { //rain class
	constructor(cloud, offset) {
		this.cloud = cloud; //relative cloud object
		this.offset = offset; //offset of the rain
		this.y = random(cloud.cloudY + 50, 500); //y span of rain on cloud
	}

	createRain() { //creates rain
		let x = this.cloud.cloudX + this.offset; //x span of rain, length of cloud plus the offset
		stroke(210, 100, 75);
		strokeWeight(2);
		line(x, this.y - 10, x, this.y + 5);
	}

	rainDown(speed) { //allows the rain to rain down
		this.y += speed; //moves rain down
		if (this.y >= 550) { //if y span is or greater than the specified length
			this.y = this.cloud.cloudY + 50; //equals the span of the y minus 50
		}
	}
}