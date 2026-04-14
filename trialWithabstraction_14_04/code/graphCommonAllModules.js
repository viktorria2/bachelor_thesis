//Graphical object created to vizualize the changes in tempo in real time - graph tempo per time/beat

mgraphics.init(); //initialization
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;
mgraphics.set_font_size(12);

inlets = 2;

var objCountObj = this.patcher.parentpatcher.getnamed('objectCounter');

var idleTime = 0; // how long the application was idle (inactive)

var data = [
    {
        color: [1.0, 0.0, 0.0],
        width: 8,
        text: 'First MIDI(red)',
        vals: [],
        enabled: true
    },
    {
        color: [0.0, 1.0, 0.0],
        width: 6,
        text: 'Second MIDI(green)',
        vals: [],
        enabled: true
    },
    {
        color: [0.0, 0.0, 1.0],
        width: 4,
        text: 'Third MIDI(blue)',
        vals: [],
        enabled: true
    },
    {
        color: [1.0, 1.0, 1.0],
        width: 2,
        text: 'Fourth MIDI(white)',
        vals: [],
        enabled: true
    }
];


var times = []; // values X time
var startTime = 0;

var maxBPM = 300;
var minBPM = 0; //range for BPM

var marginLeft = 50;
var marginRight = 10;
var marginTop = 10;
var marginBottom = 40;

var currentBPM1, currentBPM2;


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
    if (times.length < 2) return; //if it is less than two points cycle doesn't work

    var t0 = times[0];
    var tN = times[times.length - 1];
    var totalSec = (tN - t0) / 1000;

    var objCount = Number(objCountObj.getvalueof()) + 1;


    for (i = 0; i < objCount; i++) {
        mgraphics.set_source_rgba(data[i].color[0], data[i].color[1], data[i].color[2], 1);
        mgraphics.move_to(w / 2, 20 + i * 20);
        mgraphics.show_text(data[i].text);
        if (!data[i].enabled) {
            mgraphics.set_line_width(2);
            mgraphics.move_to(w / 2, 15 + i * 20);
            mgraphics.line_to((w / 2) + (data[i].text.length * 8), 15 + i * 20);
            mgraphics.stroke();
        }
        mgraphics.set_line_width(data[i].width);
        //mgraphics.set_source_rgba(data[i].color[0], data[i].color[1], data[i].color[2], 1);
        if (data[i].enabled) {
            mgraphics.move_to(
                mapTime_px(0, w, totalSec),
                mapBPM_px(data[i].vals[0], w, h));
            for (var j = 1; j < times.length; j++) {
                if (data[i].vals[j] != 0) {
                    mgraphics.line_to(
                        mapTime_px((times[j] - t0) / 1000, w, totalSec),
                        mapBPM_px(data[i].vals[j], w, h));
                }
            }
        }
        mgraphics.stroke();
    }



    for (var i = 1; i < times.length; i++) { //the point of meeting two MIDI files in the defined place
        var met = -1;
        for (j = 0; j < objCount; j++) {
            for (k = 0; k < objCount; k++) {
                if (j == k) continue;
                if (data[j].vals[i] == data[k].vals[i] && data[j].vals[i - 1] !== data[k].vals[i - 1] && data[j].vals[i] && data[k].vals[i]) {
                    met = j;
                }
            }
        }
        if (met > -1) {
            mgraphics.set_line_width(3);
            mgraphics.set_source_rgba(0.0, 1.0, 0.0, 1);
            mgraphics.set_font_size(12);
            mgraphics.move_to(
                mapTime_px((times[i] - t0) / 1000, w, totalSec),
                mapBPM_px(data[met].vals[i] + 10, w, h));
            mgraphics.line_to(
                mapTime_px((times[i] - t0) / 1000, w, totalSec),
                mapBPM_px(data[met].vals[i] + 15, w, h));
            mgraphics.stroke();
            mgraphics.move_to(
                mapTime_px((times[i] - t0) / 1000, w, totalSec),
                mapBPM_px(data[met].vals[i] + 20, w, h));
            mgraphics.show_text(String((times[i] - t0) / 1000));
        }

    }




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


function bang() { // when inlet detects value BPM => data, time => times, new point, then redraw graph
    var objCount = Number(objCountObj.getvalueof()) + 1;

    if (this.inlet === 0) {
        var now = Date.now() - idleTime; //counts a new point
        if (times.length === 0)
            startTime = now;

        for (i = 0; i < objCount; i++) {
            if (!data[i].tempoObj) data[i].tempoObj = this.patcher.getnamed(i + 'tempo');
            if (!data[i].isDoneObj) data[i].isDoneObj = this.patcher.getnamed(i + 'runningOrStopped');
            data[i].vals.push(data[i].isDoneObj.getvalueof() == 0 ? 0 : Number(data[i].tempoObj.getvalueof()));
        }
        //if(data[1].vals.length>2 && data[1].vals[data[1].vals.length-1]!=data[1].vals[data[1].vals.length-2]) post(data[1].vals[data[1].vals.length-1]);
        times.push(now);

        refresh();
    }

    if (this.inlet === 1) { // clean the graph
        for (i = 0; i < objCount; i++) {
            data[i].vals = [];
        }
        times = [];
        refresh();
    }
}


function onclick(x, y) {
    //post(x, y); post();
    var objCount = Number(objCountObj.getvalueof()) + 1;
    var rectangular = this.box.rect;
    var w = rectangular[2] - rectangular[0];

    for (i = 0; i < objCount; i++) {
        if (x >= w / 2 && x <= (w / 2) + (data[i].text.length * 8) && y >= 0 + i * 20 && y <= 20 + i * 20) {
            data[i].enabled = !data[i].enabled;
            refresh();
        }
    }
}