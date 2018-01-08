class point {	
	constructor(x,y) {
		this.x = x
		this.y = y
	}
	show() {
		noStroke()
		fill(255)
		ellipse(this.x, this.y, 5, 5)
		noFill()
		stroke(255, 100)
		strokeWeight(2)
		ellipse(this.x, this.y, 15, 15)
	}
	getDist(a) {
		let delta_x = a.x - this.x
		let delta_y = a.y - this.y
		return sqrt(delta_x*delta_x+delta_y*delta_y)
	}
}