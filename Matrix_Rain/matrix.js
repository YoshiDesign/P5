
var symbolSize = 20;

var streams = [];

// Init
function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(0);
	stream = new Stream();
	// Populate steams[] with Stream.symbols[] (2d array)
	var x = 0;
	for (var i = 0; i <= width / symbolSize; i++) {
		var stream = new Stream();
		//
		stream.generateSymbols(x, random(-500, 0));
		// add a stream to streams
		streams.push(stream);
		// increments width
		x += symbolSize;
	}
	textSize(symbolSize)
}



// The loop
function draw() {
	// background to simulate screen refresh
	// 2nd arg is opaqueness through refresh (Generates Contrails)
	background(0, 180);

	// Subsequently calls the symbol's rain()
	// stream is new here
	streams.forEach(function(stream) {
		stream.render();
	});
}

/*
/  Symbol is respopnsible for the vector, the encoded character,
/  its speed and the rate at which it switches characters
*/
function Symbol(x, y, speed, first) {
	// Positions
	this.x = x;
	this.y = y;
	this.value;
	this.first = first;
	// falling speed
	this.speed = speed;
	// character switching speed
	this.switchInterval = round(random(2, 40));
	// Generate Katakana https://en.wikipedia.org/wiki/Katakana_(Unicode_block)
	this.setToRandomSymbol = function() {
		/*
		/ frameCount is P5 native
		/ we are changing the character based on the frame count
		*/
		if (frameCount % this.switchInterval == 0) {
			// fromCharCode is JS Native (Obj function of String class)
			this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
			/*
			/  There are 96 available katakana characters(48 * 2).
			/  Above, we are Performing arithmetic upon hex values.
			/  0x30A0 is the lower bound of Unicode Katakana
			*/
		}
	}
	// falling translation
	this.rain = function() {
		// reset Y to 0 if running off page.
		this.y = (this.y >= height) ? 0 : this.y += this.speed
	}
}

/*
/  Stream is responsible for creating
/  & displaying each symbol.
*/
function Stream() {

	this.symbols = [];
	this.totalSymbols = round(random(5, 30));
	this.speed = random(5, 20);

	// create stream during init
	this.generateSymbols = function(x, y) {
		// cool bool
		var first = round(random(0, 1));
		for (var i = 0; i <= this.totalSymbols; i++) {
			/*
			/  Initializes a new Symbol object.
			/  The random y value (from setup) is maintained
			/  (and decremented) throughout creation of a single stream.
			/  This is where 'first' is 'booled'
			*/
			symbol = new Symbol(x, y, this.speed, first);
			// activates symbols identity
			symbol.setToRandomSymbol();
			// Places symbol onto array
			this.symbols.push(symbol);
			/*
			/ Places next symbol above contiguously
			/ by
			*/
			y -= symbolSize;
			first = false;
		}
	}

	// render is being called in every frame
	this.render = function() {

		this.symbols.forEach(function(symbol) {
			if (symbol.first) {
				fill(180, 255, 180);
			} else {
				fill(0, 255, 70);
			}
			// THIS IS NOT JQUERY'S TEXT() METHOD
			// https://p5js.org/reference/#/p5/text
			text(symbol.value, symbol.x, symbol.y);
			// Make it rain
			symbol.rain();
			symbol.setToRandomSymbol();
		});
	}
}