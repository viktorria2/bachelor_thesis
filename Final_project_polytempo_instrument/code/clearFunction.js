var keep = ["startPlaying", "toSave", "toSave[1]", "toSave[2]", "startTimeBang", "bangToCountNewTempo", "newTempoAlgorythmObject", "comments", "rModulesScript", "thispatcher[0]","graphAllModules","clearTheGraphButton","recieveBangToCompare","rStartPLAYING","copyCreateNewModule","copyClearThePlayground","SENDclearThePlaygroundFromP","SENDcreateNewModuleFromP"]; //list of objects which should keep

function bang() {
	var sub = this.patcher.getnamed("modules"); //search od p modules
    var p = sub.subpatcher(); //set p modules a patch in which we are going to delete objects
    var obj = p.firstobject; //find the first object

    while (obj) {
        var next = obj.nextobject; // save next object link

        if (!obj.varname || keep.indexOf(obj.varname) === -1) {
            p.remove(obj);
        }

        obj = next;
    }
}

