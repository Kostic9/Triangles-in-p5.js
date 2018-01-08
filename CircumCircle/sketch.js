let points
let dragged
let draggedPoint
let lines1
let lines2
let checkBox1, checkBox2, checkBox3, checkBox4
let triangle

function setup() {
	createCanvas(500,500)
	background(21)
	points = []
	lines1 = []
	lines2 = []
	dragged = false
	let alphaInc = PI * 2 / pointCount
	let alpha = PI / 2	
	for (let i = 0; i < 3; i++) {
		points.push(new point(cos(alpha) * 200 + width/2, sin(alpha) * 200 + height/2));
		alpha += alphaInc		
	}
	triangle = new Triangle(points[0], points[1], points[2])	
	checkBox1 = createCheckbox("Circumcircle",true)
	checkBox2 = createCheckbox("Side bisectors",true)
	checkBox3 = createCheckbox("Incircle",false)
	checkBox4 = createCheckbox("Angle bisectors",false)
}

function draw() {	
  	background(21)
  	triangle.show();
  	triangle.update()
	for (let i = 0; i < 3; i++) {
		stroke(255, 180)
		strokeWeight(3)
		lines1[i] = perpendicular(triangle.sides[i])
		lines2[i] = midVector(triangle.sides[i], triangle.sides[getNeighbours(i)[0]])
	}

	if (checkBox1.checked()) {
		circumCircle()		
	}
	if (checkBox2.checked()) {		
		strokeWeight(2)
		stroke(160,0,100)
		for(let i = 0; i < lines1.length; i++) {
			lines1[i].show()
		}
	}
	if (checkBox3.checked()) {
		inCircle()
	}	
	if (checkBox4.checked()) {
		strokeWeight(2)
		stroke(0,140,140)
		for(let i = 0; i < lines2.length; i++) {
			lines2[i].show()
		}
	}
  	for (let i = 0; i < points.length; i++) {
  		points[i].show()
  	}
  	triangle.show()
}

function mousePressed() {
	let closest = closestPoint(mouseX, mouseY)
	if (!dragged && sqrt(getDistSqr(closest.x, closest.y, mouseX, mouseY)) < 25) {
		draggedPoint = closest
		dragged = true	
	}
}

function mouseDragged() {
	if (draggedPoint != null) {
		if (mouseX > 0 && mouseX < width) {
			draggedPoint.x = mouseX
		}
		if (mouseY > 0 && mouseY < height) {
			draggedPoint.y = mouseY	
		}
	}
}

function mouseReleased() {
	dragged = false;
	draggedPoint = null
}

function closestPoint(x, y) {
	//finds the point in array "points" closest to the given pair (x,y)
	let closest;
	let closestDist = -1;
	for (let i = 0; i < 3; i++) {
		let dist = getDistSqr(points[i].x, points[i].y, x, y)
		if (closestDist == -1 || dist < closestDist) {
			closestDist = dist
			closest = points[i]
		}
	}
	return closest
}

function perpendicular(a) {
	let mid = createVector(a.x1+a.x2,a.y1+a.y2).mult(0.5)
	let ang = createVector(a.x2-a.x1,a.y2-a.y1).heading() + HALF_PI	
	return new Line(mid.x+cos(ang)*-1000, mid.y+sin(ang)*-1000, mid.x+cos(ang)*1000, mid.y+sin(ang)*1000);
}


function midVector(a,b) {
	let v1 = createVector(a.x2-a.x1,a.y2-a.y1)
	let v2 = createVector(b.x1-b.x2,b.y1-b.y2)
	let sum = p5.Vector.add(v1.normalize(), v2.normalize())
	return new Line(a.x1,a.y1,a.x1+sum.x*1000,a.y1+sum.y*1000)	
}

function inCircle() {
	let intersect = lines2[0].intersects(lines2[1])
	stroke(0,140,140)	
	fill(0,140,140,130)	
	strokeWeight(3)
	ellipse(intersect.x, intersect.y, 7, 7)
	let r = triangle.getArea() / (triangle.getPerimiter()/4)
	noFill()
	ellipse(intersect.x, intersect.y, r, r)
}

function circumCircle() {
	let intersect = lines1[0].intersects(lines1[1])
	stroke(160,0,100)	
	fill(160,0,100,130)
	strokeWeight(3)
	ellipse(intersect.x, intersect.y, 7, 7)
	let r = triangle.getSide(0)*triangle.getSide(1)*triangle.getSide(2) / (triangle.getArea() * 2)	
	noFill()
	ellipse(intersect.x, intersect.y, r, r)	
}

function getDistSqr(x1, y1, x2, y2) {
	return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
}

function setPoint(i, x, y) {
	points[i].x = x
	points[i].y = y
}

function getNeighbours(i) {
	let left
	let right
	if (i-1 < 0) {
		left = pointCount - 1
	} else {
		left = i - 1
	}
	if (i+1 > pointCount-1) {
		right = 0
	} else {
		right = i + 1
	}
	return [left, right]
}
