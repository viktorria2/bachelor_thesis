//Graphical object created to vizualize the changes in tempo in real time - graph tempo per time/beat

mgraphics.init(); //initialization
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

inlets = 4;

var idleTime = 0; // how long the application was idle (inactive)

var times = []; // values X time
var data = []; //values Y BPM
var startTime = 0;

var maxBPM = 300;
var minBPM = 0; //range for BPM

var marginLeft = 50;
var marginRight = 10;
var marginTop = 10;
var marginBottom = 40;


function paint() { //main function
    var rectangular = this.box.rect; //main container
    var width = rectangular[2] - rectangular[0];
    var height = rectangular[3] - rectangular[1]; //dimensions of main container

    mgraphics.set_source_rgba(0.1, 0.1, 0.1, 1);
    mgraphics.rectangle(0, 0, width, height);
    mgraphics.fill(); //black background

    drawAxes(width, height);
    drawGraph(width, height);
}


function drawAxes(w, h) { //draw two lines with axis ticks and labels
    mgraphics.set_line_width(1);
    mgraphics.set_source_rgba(0.8, 0.8, 0.8, 1);

    // X
    mgraphics.move_to(marginLeft, h - marginBottom);
    mgraphics.line_to(w - marginRight, h - marginBottom); //end of axis
    mgraphics.stroke();

    // Y
    mgraphics.move_to(marginLeft, h - marginBottom);
    mgraphics.line_to(marginLeft, marginTop);
    mgraphics.stroke();

    // write X-axis Labels
    if (times.length >= 2) { //if times is 2 or more elements 
        mgraphics.set_source_rgba(1, 1, 1, 1);
        mgraphics.set_font_size(14);

        var t0 = times[0];
        var tN = times[times.length - 1];
        var totalSec = (tN - t0) / 1000; //length in sec

        if (totalSec < 1) totalSec = 1;
        outlet(0, totalSec + 0.0);

        // time step
        var approxStep = totalSec / 8; //rough approximation
        var step = Math.max(1, Math.round(approxStep)); //min step is 1(never 0)

        for (var s = 0; s <= totalSec; s += step) { //every step increases by step value
            var x = mapTime_px(s, w, totalSec);

            // x-axis ticks
            mgraphics.move_to(x, h - marginBottom);
            mgraphics.line_to(x, h - marginBottom + 6); // 6 pixels down
            mgraphics.stroke();

            // labels X
            mgraphics.move_to(x - 10, h - marginBottom + 20); //20 pixels down
            mgraphics.show_text(s.toFixed(0) + "s"); // round number 
        }

        mgraphics.move_to(w - 70, h - marginBottom + 35);
        mgraphics.show_text("Time"); //label for x-axis
    }



    // write Y-axis Labels
    mgraphics.set_source_rgba(1, 1, 1, 1);
    mgraphics.set_font_size(12);

    for (var bpm = 0; bpm <= maxBPM; bpm += 20) { //step is 20 from 0 BPM to 200 BPM
        var y = mapBPM_px(bpm, w, h);

        // y-axis ticks
        mgraphics.move_to(marginLeft - 5, y);
        mgraphics.line_to(marginLeft, y);
        mgraphics.stroke();

        // labels Y
        mgraphics.move_to(8, y + 4);
        mgraphics.show_text(bpm.toString());
    }

    mgraphics.move_to(8, marginTop + 22);
    mgraphics.show_text("BPM");

}





function drawGraph(w, h) { //draw points with position x,y and connect it
    if (data.length < 2) return; //if it is less than two points cycle doesn't work

    mgraphics.set_source_rgba(0.67, 0.75, 0.76, 1);
    mgraphics.set_line_width(3);

    var t0 = times[0];
    var tN = times[times.length - 1];
    var totalSec = (tN - t0) / 1000;

    // first point
    mgraphics.move_to(
        mapTime_px(0, w, totalSec),
        mapBPM_px(data[0], w, h));

    for (var i = 1; i < data.length; i++) {
        var sec = (times[i] - t0) / 1000;
        mgraphics.line_to(
            mapTime_px(sec, w, totalSec),
            mapBPM_px(data[i], w, h));
    }

    mgraphics.stroke();
}



function mapBPM_px(bpm, w, h) { //BPM -> y-axis in pixels
    var borders = Math.max(minBPM, Math.min(bpm, maxBPM)); //set the value always between min and max
    var norm = borders / maxBPM; //normalization for dynamic range in pixels
    var top = marginTop;
    var bottom = h - marginBottom;
    var height = bottom - top; //available height

    return bottom - norm * height; //normalized value to pixels
}



function mapTime_px(sec, w, totalSec) { //time in sec -> x-axis in pixels
    var x0 = marginLeft;
    var x1 = w - marginRight;
    return x0 + (x1 - x0) * (sec / totalSec); //start value + free width space * coefficient
}



function msg_float(v) { // get incoming value from the first inlet
    if (this.inlet === 0) {
        currentBPM = v;
    }
}


function bang() { // when inlet detects value BPM => data, time => times, new point, then redraw graph
    if (this.inlet === 1) {
        var now = Date.now() - idleTime; //counts a new point
        if (times.length === 0)
            startTime = now;

        data.push(currentBPM);
        times.push(now);

        refresh();
    }
    if (this.inlet === 2) { // if the 3rd inlet bang, controls if length > 0(means that it was already run) so continuing time
        idleTime = times.length > 0 ? (Date.now() - times[times.length - 1]) : 0;
    }
    if (this.inlet === 3) { // clean the graph
        data = [];
        times = [];
        refresh();
    }
}
