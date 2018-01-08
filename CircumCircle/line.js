class Line {
	constructor(x1,y1,x2,y2) {
		this.x1 = x1
		this.y1 = y1
		this.x2 = x2
		this.y2 = y2
		this.slope = (y1-y2)/(x1-x2)
		this.n = y1 - this.slope * x1		
	}

	intersects(l) {
		let xi = (l.n - this.n)/(this.slope - l.slope)
		let yi = xi * this.slope + this.n
		let v = createVector(xi,yi)
		return v
	}

	show() {
		line(this.x1,this.y1,this.x2,this.y2)
	}
}