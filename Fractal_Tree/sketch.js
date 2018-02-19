var angle = 0;

var slider;

function setup() {
    createCanvas(400, 400);
    // From 0 to 2(PI). Start at PI/4. Increment by 0.01
    slider = createSlider(0, TWO_PI, PI/4, 0.01);
    slider.size(450);

}

function draw() {

    background(33);
    angle = slider.value();
    stroke(255);
    translate(200, height);
    branch(100);

}

function branch(len) {

    line(0, 0, 0, -len);
    // Translate Origin
    translate(0, -len);
    if (len > 4) {
        push();
        rotate(angle);
        branch(len * 0.67);
        pop();
        push();
        rotate(-angle);
        branch(len * 0.67);
        pop();
    }

}