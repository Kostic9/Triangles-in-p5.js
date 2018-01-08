class Triangle {
	constructor(A, B, C) {
		this.A = A
		this.B = B
		this.C = C
		this.sides = this.calculateSides()
	}
	update() {
		this.sides = this.calculateSides();
	}
	show() {
		stroke(255, 180)
		strokeWeight(3)
		line(this.A.x, this.A.y, this.B.x, this.B.y)
		line(this.B.x, this.B.y, this.C.x, this.C.y)
		line(this.C.x, this.C.y, this.A.x, this.A.y)
	}	
	getPerimiter() {
		return (this.A.getDist(this.B) + this.B.getDist(this.C) + this.C.getDist(this.A))
	}
	getArea() {
		let s = this.getPerimiter() / 2
		return (sqrt(s*(s-this.getSide(0))*(s-this.getSide(1))*(s-this.getSide(2))))
	}
	calculateSides() {
		let side_a = new Line(this.A.x, this.A.y, this.B.x, this.B.y)
		let side_b = new Line(this.B.x, this.B.y, this.C.x, this.C.y)
		let side_c = new Line(this.C.x, this.C.y, this.A.x, this.A.y)
		return ([side_a, side_b, side_c])
	}
	getSide(i) {
		if (i == 0) {
			return this.A.getDist(this.B)
		} else if (i == 1) {
			return this.B.getDist(this.C)
		} else if (i == 2) {
			return this.C.getDist(this.A)
		}
	}
}