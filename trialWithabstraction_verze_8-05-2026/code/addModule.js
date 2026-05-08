inlets = 1;
outlets = 0;

function msg() {
    var vname = arguments[0]; //scripting name to create an individual module
    var file = arguments[1]; //MIDI file
    var x = arguments[2] || 50; //x position 
    var y = arguments[3] || 50; //y position

    var sub = this.patcher.getnamed("modules"); //location

    if (!sub) {
        post("'modules'is not found\n");
        return;
    }

    var p = sub.subpatcher();

    var obj = p.newdefault(x, y, file); //creates new object
    obj.varname = vname; //defines scriptning name

    //post("Object", vname, is created "\n");
}
