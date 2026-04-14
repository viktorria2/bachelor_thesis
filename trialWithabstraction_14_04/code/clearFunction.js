var keep = ["startPlaying", "toSave", "toSave[1]", "toSave[2]", "startTimeBang", "bangToCountNewTempo", "newTempoAlgorythmObject", "comments", "rModulesScript", "thispatcher[0]","graphAllModules","clearTheGraphButton","recieveBangToCompare"]; //list of objects which should keep

function bang() {
	var sub = this.patcher.getnamed("modules");
    var p = sub.subpatcher();
    var obj = p.firstobject;

    while (obj) {
        var next = obj.nextobject; // next object link

        if (!obj.varname || keep.indexOf(obj.varname) === -1) {
            p.remove(obj);
        }

        obj = next;
    }
}

