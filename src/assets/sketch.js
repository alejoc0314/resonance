function sketch(p) {
    p.setup = function() {
        p.createCanvas(400, 400);
        p.background(200);
    };

    p.draw = function() {
        p.fill(255, 0, 0);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
}