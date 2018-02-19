
// Create Array
var tree = [];
var leaves = [];
var count = 0;

function setup() {
    createCanvas(400, 400);
    var a = createVector(width/2, height);
    var b = createVector(width/2, height - 100);
    // Put the Root in the array
    var root = new Branch(a, b);

    tree[0] = root;

}

function mousePressed() {
    for (var i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished){
            // return new Branch from our constructor, Branch, with applied metrics
            tree.push(tree[i].branchA());
            tree.push(tree[i].branchB());
        }
        // to avoid unnecessary redundancies.
        tree[i].finished = true;
    }

    // tracking for... reasons
    count++;

    // Reset Condition
    if(tree.length > 720){
        tree = [];
        leaves = [];
        count = 0;
        setup();
    }

    // Designates when to generate leaves.
    // again, count is the number of times we clicked
    if(!(count % 2)) {
        for (var i = 0; i < tree.length; i++)
        {
            if(!tree[i].finished) {
                var leaf = tree[i].end.copy();
                leaves.push(leaf);
            }
        }
    }
}

function draw() {

    background(33);
    // Display the Array
    for (var i = 0; i < tree.length; i++){
        tree[i].show();
        // bbq
        //tree[i].jitter();
    }

    // Leave generation
    for (var i = 0; i < leaves.length; i++) {
        var fall = 0;
        if (leaves.length == 1) {
            fill(0, 0, 0, 0.5);
        }
        else{
            fill(255, 0, 100, 100);
        }
        noStroke();
        ellipse(leaves[i].x, leaves[i].y, 8, 5);
        // falling motion
        if(i % random(2, 3) == 0) {
            leaves[i].y += random(0, 1);
            leaves[i].x += random(0, -1);
        }
    }
}

