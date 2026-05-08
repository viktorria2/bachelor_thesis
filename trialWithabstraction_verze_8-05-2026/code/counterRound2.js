
//Graphical object created to vizualize the current count of beats 



sketch.default2d(); //inicialization of 2D mode
inlets = 1;
var val = 0;
var vbrgb = [0.31,0.145,0.369,1.]; //background color
var vfrgb = [0.788,0.643,0.839,1.]; //foreground color(color of quaters)
var vrgb2 = [0.7,0.7,0.7,1.]; //circle color
var last_x = 0;
var last_y = 0;
var bpm = 120;         //tempo
var beat = 1;          //beat 1-4
var active = false; //metronome is unactive while count stops
var metro = new Task(tick, this); //Task is object that starts a function with time interval

metro.interval = 60000 / bpm; // ms per BPM

draw();
onresize.local = 1;

function stop() {
    active = false;
    metro.cancel();
}


function draw() { //draw a circle with labels
	var theta;
	var width = box.rect[2] - box.rect[0];
	//the Sketch Object
	with (sketch) {
		shapeslice(180,1); //Sets the number of slices to use when rendering any of the "shape" drawing methods. 
		glclearcolor(vbrgb);
		glclear(); //clear			
		
		moveto(0,0);
		glcolor(vrgb2);
		circle(0.9); //draw a base circle(grey)
		
		glcolor(0,0,0,1);
		circle(0.9,-90-val*360,-90); //boundaries for active quaters						
		
		glcolor(vfrgb);
		circle(0.8,-90-val*360,-90); //fill active quaters					
		// draw rest of outline
			if (width<=32)
				gllinewidth(1);
			else
				gllinewidth(2);
			glcolor(0,0,0,1);
			moveto(0,0);
			lineto(0,-0.9);
			moveto(0,0);
		theta = (0.75-val)*2*Math.PI;
		lineto(0.8*Math.cos(theta),0.8*Math.sin(theta)); //draw a line from center to border

		if (val > 0) {
    		var stepnum = Math.round(val * 4); // 1–4
    		var label = stepnum + "/4";

    		var angle = (-90 - (stepnum - 0.5) * 90) * Math.PI / 180;
    		var r = 0.45; // how far from center
    		var labelx = r * Math.cos(angle);
    		var labely = r * Math.sin(angle); //label position
			var currentBeat = Math.round(val * 4); // 1–4
    		var label = currentBeat + "/4"; //1/4, 2/4, 3/4, 4/4

    		fontsize(20);
    		font("Arial");
    		glcolor(0, 0, 0, 1);
    		moveto(labelx, labely);
    		text(label);
		}
	}	
}

function onresize(w, h) { //saves proportions 1:1 for width and height
    if (w != h) h = w;
    box.size(w, h);
    bang();
}

function bang() { //refresh the circle with newcoming first inlet meaning
    draw();
    refresh();
    outlet(0, val);
}

function msg_float(v) { //analysis of incoming values from the inlet
        stop();
        val = Math.min(Math.max(0, v), 1);
        notifyclients();
        bang();
}

function tick() { //metronome function
    if (!active) return;
    beat = (beat % 4) + 1;
    val = beat * 0.25;
    bang();
}
