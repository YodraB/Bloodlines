// add new code boxes to sketch, parent one and parent two, print chop from original code box

function show(){
	genotypeA = document.getElementById("Pet A").value;
	genotypeB = document.getElementById("Pet B").value;
	newGenotype = ''

	for(i = 0; i < genotypeA.length; i+=2){
		whichA = Math.floor(Math.random() *2);
		whichB = Math.floor(Math.random() *2);
		resultA = genotypeA[whichA + i];
		resultB = genotypeB[whichB + i];
		newGenotype += resultA + resultB;
	}

	results.innerHTML = newGenotype
}

function chopCode(){
	chop.innerHTML = ""
	genes = document.getElementById("codeForChop").value;
	
	print('PHAEOMELANIN<br>');
	
	var groundColorGenes = genes.slice(0,2);
	var groundColor = '?';
	if (groundColorGenes[0] == 'R' || groundColorGenes[1] == 'R'){
    	groundColor = 'Red';
  	} else if (groundColorGenes[0] == 'P' || groundColorGenes[1] == 'P'){
    	groundColor = 'Pink';
  	} else {
    	groundColor = 'White';
	}
    print('groundColorGenes : ' + groundColorGenes + ' - ground color ' + groundColor);
    
    var groundRecGenes = genes.slice(2,10);
	var groundRec = 0;
  	for (i = 0; i < groundRecGenes.length; i+= 2 ){
    	if (groundRecGenes[i] != 'A' && groundRecGenes[i + 1] != 'A'){
      		groundRec += 1;
    	}
	}
    print('groundRecGenes : ' + groundRecGenes + ' - ground intensity factor ' + groundRec);

    var yellowGroundGenes = genes.slice(10,14);
	var yellowGroundLayers = 0;
	if (yellowGroundGenes == 'aaaa'){
		yellowGroundLayers = 2;
  	} else if ((yellowGroundGenes[0] == 'a' && yellowGroundGenes[1] == 'a') || (yellowGroundGenes[2] == 'a' && yellowGroundGenes[3] == 'a')){
    	yellowGroundLayers = 1;
	}
	print('yellowGroundGenes : ' + yellowGroundGenes + ' - yellow layers ' + yellowGroundLayers);

    var desatGroundGenes = genes.slice(14, 16);
	var desatOn = 'Off';
	if (desatGroundGenes[0] == 'A' || desatGroundGenes[1] == 'A'){
		desatOn = 'On';
	}
    print('desatGroundGenes : ' + desatGroundGenes + ' - desaturation of ground layer ' + desatOn);

    var redPatchGenes = genes.slice(16, 18);
	var redPatchesOn = 'No'
	if (redPatchGenes[0] == 'A' || redPatchGenes[1] == 'A'){
    	redPatchesOn = 'Yes';
	}
    print('redPatchGenes : ' + redPatchGenes + ' - red patch factor ' + redPatchesOn);

    var redPatchAmountGenes = genes.slice(18, 26);
	var redPatchAmount = 0;
  	for (i = 0; i < redPatchAmountGenes.length; i+=2 ){
    	if (redPatchAmountGenes[i] == 'a' && redPatchAmountGenes[i + 1] == 'a'){
      		redPatchAmount += 1;
    	}
	}
	print('redPatchAmountGenes : ' + redPatchAmountGenes + ' - red patch amount ' + redPatchAmount);

    var yellowPatchGenes = genes.slice(26,30);
	var yellowOver = 'None';
	if (yellowPatchGenes == 'aaaa'){
		yellowOver = 'Additional yellow layer';
	} else if ((yellowPatchGenes[0] == 'a') && (yellowPatchGenes[1] == 'a') || (yellowPatchGenes[2] == 'a') && (yellowPatchGenes[3] == 'a')){
		yellowOver = 'Yellow patches layer';
	}
    print('yellowPatchGenes : ' + yellowPatchGenes + ' - yellow over factor ' + yellowOver);

    var blueGenes = genes.slice(30, 32);
	var blueStatus = 'Normal phaeomelanin';
	if ((blueGenes[0] == 'y' || blueGenes[1] == 'y') && (blueGenes[0] != 'B' && blueGenes[1] != 'B')){
			blueStatus = 'Phaeomelanin restricted to face and tail';
		} else if (blueGenes[0] == 'b' && blueGenes[1] == 'b'){
			blueStatus = 'No phaeomelanin';
		}
    print('blueGenes : ' + blueGenes + " - phaeomelanin restriction factor " + blueStatus);
	
	print('<br>EUMELANIN<br>');

    var extensionGenes = genes.slice(32, 34);
	var agoutiGenes = genes.slice(46, 48);
	var extensionFactor = 'None';
	if ((extensionGenes[0] == 'M' || extensionGenes[1] == 'M') && (agoutiGenes[0] != 'Y' && agoutiGenes[1] != 'Y')){
			extensionFactor = 'Face Mask';
		} else if (extensionGenes[0] == 'r' && extensionGenes[1] == 'r'){
			extensionFactor = 'No Eumelanin';
		}
    print('extensionGenes : ' + extensionGenes + ' - extension factor ' + extensionFactor);

    var domBlackGenes = genes.slice(34, 36);
	var domBlackOn = 'No';
	if (domBlackGenes[0] == 'A' || domBlackGenes[1] == 'A'){
		domBlackOn = 'Yes';
	}
    print('domBlackGenes : ' + domBlackGenes + " - dominant black " + domBlackOn);

    var blackPatchGenes = genes.slice(36, 38);
	var blackPatches = 'No';
	if (blackPatchGenes[0] == 'A' || blackPatchGenes[1] == 'A'){
		blackPatches = 'Yes';
	}
	print('blackPatchGenes : ' + blackPatchGenes + ' - black patches on ' + blackPatches);

    var blackPatchAmountGenes = genes.slice(38, 44);
	var blackPatchAmount = 0;
	for (i = 0; i < blackPatchAmountGenes.length; i+=2 ){
    	if (blackPatchAmountGenes[i] == 'a' && blackPatchAmountGenes[i + 1] == 'a'){
      	blackPatchAmount += 1;
    	}
	}
    print('blackPatchAmountGenes : ' + blackPatchAmountGenes + ' - black patch amount ' + blackPatchAmount);

    var brownGenes = genes.slice(44, 46);
	var brownOn = 'No';
	if (brownGenes[0] == 'a' && brownGenes[1] == 'a'){
		brownOn = 'Yes';
	}
    print('brownGenes : ' + brownGenes + ' - brown factor ' + brownOn);

    var agoutiGenes = genes.slice(46, 48);
	var agoutiPattern = 'None';
	if (agoutiGenes[0] == 'Y' || agoutiGenes[1] == 'Y'){
    	agoutiPattern = 'Black tips';
	} else if (agoutiGenes[0] == 'W' || agoutiGenes[1] == 'W'){
	    agoutiPattern = 'Agouti';
  } else if (agoutiGenes[0] == 't' || agoutiGenes[1] == 't'){
    	agoutiPattern = 'Tan tips';
	}
    print('agoutiGenes : ' + agoutiGenes + " - agouti pattern " + agoutiPattern);

    var liverGenes = genes.slice(48, 50);
	var liverOn = 'No';
	if (liverGenes[0] == 'a' && liverGenes[1] == 'a'){
		liverOn = 'Yes';
	}
    print('liverGenes : ' + liverGenes + ' - liver factor ' + liverOn);
	
	print('<br>ULTRASTRUCTURE<br>');

    var birdDiluteGenes = genes.slice(50, 52);
	var birdDilution = 'None';
	
	if (birdDiluteGenes[0] == 'S' || birdDiluteGenes[1] == 'S'){
    //nothing happens
  	} else if ((birdDiluteGenes[0] == 'c' && birdDiluteGenes[1] == 'g') || (birdDiluteGenes[0] == 'g' && birdDiluteGenes[1] == 'c')){
    	birdDilution = 'Eumelanin minus 87%, ultrastructure to 40%'; 
  	} else if (birdDiluteGenes[0] == 'c' || birdDiluteGenes[1] == 'c'){
    	birdDilution = 'Eumelanin minus 75%, ultrastructure to 90%';
  	} else if (birdDiluteGenes[0] == 'g' || birdDiluteGenes[1] == 'g'){
    	birdDilution = 'Eumelanin minus 50%, ultrastructure to 50%';
  	} else {
    	birdDilution = 'Eumelanin minus 50%, ultrastructure to 10%';
	}
    print('birdDiluteGenes : ' + birdDiluteGenes + ' - bird dilution ' + birdDilution);

    var greyGenes = genes.slice(52, 54);
	var greyOn = 'No';
	if (greyGenes[0] == 'a' && greyGenes[1] == 'a'){
		greyOn = 'Yes'
	}
    print('greyGenes : ' + greyGenes + ' - grey factor ' + greyOn);

    var violetGenes = genes.slice(54, 56);
	var violetAmount = 'None';
	if (violetGenes[0] == 'a' && violetGenes[1] == 'a'){
		//nothing happens
	} else if (violetGenes[0] == 'a' || violetGenes[1] == 'a'){
		violetAmount = 'Violet tint';
	} else {
		violetAmount = 'Bright violet';
	}
    print('violetGenes : ' + violetGenes + ' - violet ' + violetAmount);

    var darkGenes = genes.slice(56, 58);
	var darkAmount = 'None';
	if (darkGenes[0] == 'A' && darkGenes[1] == 'A'){
		darkAmount = '25% darker';
	} else if (darkGenes[0] == 'A' || darkGenes[1] == 'A'){
		darkAmount = '12% darker';
	}
    print('darkGenes : ' + darkGenes + ' - dark amount ' + darkAmount);

    var anthraciteGenes = genes.slice(58, 60);
	var anthraciteAmount = 'None';
	if (anthraciteGenes[0] == 'A' && anthraciteGenes[1] == 'A'){
		anthraciteAmount = '75% darker';
	} else if (anthraciteGenes[0] == 'A' || anthraciteGenes[1] == 'A'){
		anthraciteAmount = '37% darker';
	}
    print('anthraciteGenes : ' + anthraciteGenes + ' - anthracite amount ' + anthraciteAmount);

    var clearGenes = genes.slice(60, 62);
	var clear = 'Active';
	if (clearGenes[0] == 'a' && clearGenes[1] == 'a'){
		clear = 'Inactive';
	} else if (clearGenes[0] == 't' && clearGenes[1] == 't'){
		clear = 'Restricted to face and tail';
	}
    print('clearGenes : ' + clearGenes + ' - ultrastructure ' + clear);

    var opalescentGenes = genes.slice(62, 64);
	var opalescentOn = 'No'
	if (opalescentGenes[0] == 'a' && opalescentGenes[1] == 'a'){
    	var opalescent = 'Yes';
	} 
    print('opalescentGenes : ' + opalescentGenes + " - opalescent factor " + opalescent);
	
	print('<br>WHITE<br>');
	

    var tobianoGenes = genes.slice(64,66);
	var tobianoOn = 'No';
	if (tobianoGenes[0] == 'a' && tobianoGenes[1] == 'a'){
    	tobianoOn = 'Yes';
	}
    print('tobianoGenes : ' + tobianoGenes + ' - tobiano on ' + tobianoOn);

    var tobianoTweakGenes = genes.slice(66, 70);
	var tobianoAmount = 0;
  	for (i = 0; i < tobianoTweakGenes.length; i+=2 ){
    	if (tobianoTweakGenes[i] == 'A' || tobianoTweakGenes[i + 1] == 'A'){
      	tobianoAmount += 1;
    	}
	}
    print('tobianoTweakGenes : ' + tobianoTweakGenes + ' - tobiano amount ' + tobianoAmount);

    var overoGenes = genes.slice(70, 72);
	var overoOn = 'No';
	if (overoGenes[0] == 'a' && overoGenes[1] == 'a') {
    	overoOn = true;
	}
    print('overoGenes : ' + overoGenes + ' - overo on ' + overoOn);

    var overoTweakGenes = genes.slice(72, 76);
	var overoAmount = 0;
	for (i = 0; i < overoTweakGenes.length; i+=2 ) {
    	if (overoTweakGenes[i] == 'a' && overoTweakGenes[i + 1] == 'a') {
    		overoAmount += 1;
    	}
	}
    print('overoTweakGenes : ' + overoTweakGenes + ' - overo amount ' + overoAmount);

    var diluteGenes = genes.slice(76, 78);
	diluteOn = 'No';
	if (diluteGenes[0] == 'a' && diluteGenes[1] == 'a'){
		diluteOn = 'Yes';
	}
    print('diluteGenes : ' + diluteGenes + ' - dilution on ' + diluteOn);

    var whiteFaceGenes = genes.slice(78, 86);
	var faceWhite = 'None';
	var whiteFaceAmount = 0;
  	for (i = 0; i < whiteFaceGenes.length; i+=2 ){
    	if (whiteFaceGenes[i] == 'a' && whiteFaceGenes[i + 1] == 'a'){
      		whiteFaceAmount += 1;
    	}
	}
	if (whiteFaceAmount == 1){
    	faceWhite = 'Star';
	} else if (whiteFaceAmount == 2){
		faceWhite = 'Stripe';
	} else if (whiteFaceAmount == 3){
    	faceWhite = 'Blaze';
	} else if (whiteFaceAmount == 4){
    	faceWhite = 'Mask';
	}
    print('whiteFaceGenes : ' + whiteFaceGenes + ' - face white ' + faceWhite);

    var frontLeftSockGenes = genes.slice(86, 90);
	var frontLeftSock = 'No';
	if (frontLeftSockGenes == 'aaaa'){
		frontLeftSock = 'Yes';
	}
    print('frontLeftSockGenes : ' + frontLeftSockGenes + ' - front left sock ' + frontLeftSock);

    var frontRightSockGenes = genes.slice(90, 94);
	var frontRightSock = 'No';
	if (frontRightSockGenes == 'aaaa'){
		frontRightSock = 'Yes';
	}
    print('frontRightSockGenes : ' + frontRightSockGenes + ' - front right sock ' + frontRightSock);

    var backLeftSockGenes = genes.slice(94, 98);
	var backLeftSock = 'No';
	if (backLeftSockGenes == 'aaaa'){
		backLeftSock = 'Yes';
	}
    print('backLeftSockGenes : ' + backLeftSockGenes + ' - back left sock ' + backLeftSock);

    var backRightSockGenes = genes.slice(98, 102);
	var backRightSock = 'No';
	if (backRightSockGenes == 'aaaa'){
		backRightSock = 'Yes';
	}
    print('backRightSockGenes : ' + backRightSockGenes + ' - back right sock ' + backRightSock);

    var sockHeightGenes = genes.slice(102, 106);
	var sockHeight = 'Low';
	var sockHeightNum = 0;
	for (i = 0; i < sockHeightGenes.length; i++){
    	if (sockHeightGenes[i] == 'a'){
      	sockHeightNum += 1;
    	}
	}
	if (sockHeightNum == 1){
		sockHeight = 'Medium';
	} else if (sockHeightNum == 2){
		sockHeight = 'High';
	}
    print('sockHeightGenes : ' + sockHeightGenes + ' - sock height ' + sockHeight);
	
	print('<br>MANE<br>');

    var maneLightGreyGenes = genes.slice(106, 108);
	var maneLightGrey = "No";
	if (maneLightGreyGenes[0] == 'A' || maneLightGreyGenes[1] == 'A'){
		maneLightGrey = 'Yes';
	}
    print('maneLightGreyGenes : ' + maneLightGreyGenes + ' - light grey layer ' + maneLightGrey);

    var maneDarkGreyGenes = genes.slice(108, 110);
	var maneDarkGrey = 'No';
	if (maneDarkGreyGenes[0] == 'A' || maneDarkGreyGenes[1] == 'A'){
		maneDarkGrey = 'Yes';
	}
    print('maneDarkGreyGenes : ' + maneDarkGreyGenes + ' - dark grey layer ' + maneDarkGrey);
	
	var maneDominantWhite = 'No';
	if (sockHeightNum >= 1 && (frontLeftSockGenes == 'aaaa' || backLeftSockGenes == 'aaaa' || frontRightSockGenes == 'aaaa' || backRightSockGenes == 'aaaa')){
		maneDonimantWhite = 'Yes';
	}
	print('mane dominant white ' + maneDominantWhite)
	
	print('<br>EYES<br>');

    var orangeTintGenes = genes.slice(110, 120);
    print('orangeTintGenes : ' + orangeTintGenes);

    var eyeYellowGenes = genes.slice(120, 122);
    print('eyeYellowGenes : ' + eyeYellowGenes);

    var tealTintGenes = genes.slice(122, 130);
    print('tealTintGenes : ' + tealTintGenes);

    var eyeBlueGenes = genes.slice(130, 132);
    print('eyeBlueGenes : ' + eyeBlueGenes);
}

function print(text){
	chop.innerHTML += " " + text + "<br>"
}