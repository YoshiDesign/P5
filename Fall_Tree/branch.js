function Branch(begin, end) {
    // our passed-in init vector
    this.begin = begin;
    this.end = end;
    // A simple flag
    this.finished = false;
    
    // Currently not being called. This makes the tree jiggle (simulate a breeze?)
    this.jitter = function() {
        this.end.x += random(-1, 1);
        this.end.y += random(-1, 1);
    }

    this.show = function() {
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    // to the right
    this.branchA = function() {
        // Vector pointing from bottom to top of branch
        var dir = p5.Vector.sub(this.end, this.begin);
        // 45 degrees rotation and shrink it a bit
        dir.rotate(PI/6);
        dir.mult(0.67)
        // add the end point of the previous vector with the direction
        var newEnd = p5.Vector.add(this.end, dir)
        // set up the new Branch with our new metrics.
        var b = new Branch(this.end, newEnd);
        // get it
        return b;
    }
    // to the left
    this.branchB = function() {
        // Vector pointing from bottom to top of branch
        var dir = p5.Vector.sub(this.end, this.begin);
        // 45 degrees rotation
        dir.rotate(-PI/4);
        dir.mult(0.67);
        // add the end point of the previous vector with the direction
        var newEnd = p5.Vector.add(this.end, dir)
        // set up the new Branch with our new metrics.
        var b = new Branch(this.end, newEnd);
        // get it
        return b;
    }
}
