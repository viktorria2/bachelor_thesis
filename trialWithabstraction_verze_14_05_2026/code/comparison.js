inlets = 1
outlets = 1

var first2 = true;
function list(v1,v2,v3,v4){
	if(v1 == 1 && v3 == 1) first2 = true;
	if(v1==v2 && v3==v4 && first2){
		outlet(0,1);
		first2 = false;
		}
	}