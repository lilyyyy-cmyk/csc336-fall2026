function pond() { //draws pond
	noStroke();
	
	fill(196, 60, 100);
	ellipse(300, 500, 400, 100);
	ellipse(220, 540, 350, 100);
	ellipse(370, 530, 350, 100);
}

function lilyPads() { //draws lily pads
	stroke(143, 100, 50);
	strokeWeight(1);
	fill(143, 100, 75);

	for (let p of padArray) { //uses predefined values for position
		arc(p.x, p.y, 100, 30, 45, 360);
	}
}

function addFly() { //creates a new fly, pushes it to the array, positioning is random
	flyArray.push(new Fly(random(100, 500), random(200, 500)));
}

function drawFly() { //loop starts at end of array, creates and moves flies
	for (let i = flyArray.length - 1; i >= 0; i--) {
		let fly = flyArray[i];
		fly.createFly();
		fly.moveFly();

		for (let f of frogArray) { //if a fly touches a frog that fly gets spliced
			if (fly.touched(f)) {
				flyArray.splice(i, 1);
				break; //stops the function after execution completes
			}
		}
	}
}