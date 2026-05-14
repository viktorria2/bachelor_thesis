var lastTickData = [];

function bang(v) {
	var objects = [];
	var counter = 0;
	var mainObj = -1;
	var objCount = this.patcher.parentpatcher.getnamed('objectCounter').getvalueof();
	//post(objCount);
	while (counter <= objCount) { //collects data for each module
		var tempObj = {
			num: counter, //identificator
			ms: this.patcher.getnamed(counter + 'timerms').getvalueof(), //timer dat in ms
			isMain: this.patcher.getnamed(counter + 'leadOrPassive').getvalueof() == 1,//is it main file or it will be modificated
			koefObj: this.patcher.getnamed(counter + 'koef'), //coefficient to multiply
			origTempoObj: this.patcher.getnamed(counter + 'originalSeqTempo'), //original sequence tempo to multiply 
			newTempoObj: this.patcher.getnamed(counter + 'newTempo'), //new tempo for transport
			currentBarsObj: this.patcher.getnamed(counter + 'bars'), //bars
			targetBarsObj: this.patcher.getnamed(counter + 'barToFind'), //user defined bars 
			currentBeatsObj: this.patcher.getnamed(counter + 'beats'),
			targetBeatsObj: this.patcher.getnamed(counter + 'beatToFind'),
			overrideTempObj: this.patcher.getnamed(counter + 'buttonToControlTempo')//tempo of this MIDI is his own or tempo of the lead MIDI file
		}
		if (tempObj.isMain) { //only one module can be selected as main
			if (mainObj == -1) mainObj = counter;
			else throw "Multiple objects are selected as main.";
		}
		objects.push(tempObj);
		counter++;
	}
	if (mainObj == -1) throw "No Object is selected as main."; //at least one module should be chosen as main
	if (objects[mainObj].ms == 0) return; //throw "Not calculated!";
	//post(objects.length);

	for (var i = 0; i < objects.length; i++) {
		if (!Number(objects[i].ms)) continue;//if value is not a number
		var currentBars = Number(objects[i].currentBarsObj.getvalueof());
		var currentBeats = Number(objects[i].currentBeatsObj.getvalueof());
		if (lastTickData[i] && lastTickData[i][0] == currentBars && lastTickData[i][1] > currentBeats) continue;//if the bar is the same, but the beat is lower than before, then don't count this combination
		lastTickData[i] = [currentBars, currentBeats];
		objects[i].koef = Number(objects[i].ms) / Number(objects[mainObj].ms); //timer value for main module devided by timer value of modificated module
		//post(objects[i].koef);
		if (objects[i].koefObj.getvalueof() == 0) { //if koef = 0 then koef = 1
			//post(i + ' koef set to ' + 1 + '; ');
			objects[i].koefObj.setvalueof(1);
		}
		if (objects[i].koefObj.getvalueof() == 1 && objects[i].koef != 1) { //if koef = 1 then koef = new counted
			//post(i + ' koef set to ' + objects[i].koef + '; ');
			objects[i].koefObj.setvalueof(objects[i].koef);
		}

		if (currentBars * 1000 + currentBeats >= Number(objects[i].targetBarsObj.getvalueof()) * 1000 + Number(objects[i].targetBeatsObj.getvalueof())) {
			if (objects[i].overrideTempObj.getvalueof() == 0) {//CHECK1: if tempo does not change after meeating point
				if (Number(objects[i].newTempoObj.getvalueof()) != Number(objects[i].origTempoObj.getvalueof())) {//CHECK2: if newTempo <> seqTempo then set seqTempo as newTempo
					objects[i].newTempoObj.setvalueof(objects[i].origTempoObj.getvalueof());
				}
			} else if (Number(objects[i].newTempoObj.getvalueof()) != Number(objects[mainObj].origTempoObj.getvalueof())) {//CHECK1: if tempo CHANGES after meeting point
				objects[i].newTempoObj.setvalueof(objects[mainObj].origTempoObj.getvalueof()); //after meet the chosen bar and beat, tempo takes the main MIDI tempo
				post(i + ' (1) changed to ' + objects[mainObj].origTempoObj.getvalueof() + '; ');
				post();
			}
		} else {
			if (Number(objects[i].newTempoObj.getvalueof()) != Number(objects[i].origTempoObj.getvalueof()) * Number(objects[i].koefObj.getvalueof())) {//when thebar and beat still not found
				objects[i].newTempoObj.setvalueof(Number(objects[i].origTempoObj.getvalueof()) * Number(objects[i].koefObj.getvalueof()));//take the koef and multiply by origtempo
				post(i + ' (2) changed to ' + Number(objects[i].origTempoObj.getvalueof()) * Number(objects[i].koefObj.getvalueof()) + '; ');
				post();
			}
		}
	}
}