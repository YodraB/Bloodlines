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
	genes = document.getElementById("codeForChop").value;
	var groundColorGenes = genes.slice(0,2);
    print('groundColorGenes : ' + groundColorGenes);
    
    var groundRecGenes = genes.slice(2,10);
    print('groundRecGenes : ' + groundRecGenes);

    var yellowGroundGenes = genes.slice(10,14);
    print('yellowGroundGenes : ' + yellowGroundGenes);

    var desatGroundGenes = genes.slice(14, 16);
    print('desatGroundGenes : ' + desatGroundGenes);

    var redPatchGenes = genes.slice(16, 18);
    print('redPatchGenes : ' + redPatchGenes);

    var redPatchAmountGenes = genes.slice(18, 26);
    print('redPatchAmountGenes : ' + redPatchAmountGenes);

    var yellowPatchGenes = genes.slice(26,30);
    print('yellowPatchGenes : ' + yellowPatchGenes);

    var blueGenes = genes.slice(30, 32);
    print('blueGenes : ' + blueGenes);

    var extensionGenes = genes.slice(32, 34);
    print('extensionGenes : ' + extensionGenes);

    var domBlackGenes = genes.slice(34, 36);
    print('domBlackGenes : ' + domBlackGenes);

    var blackPatchGenes = genes.slice(36, 38);
    print('blackPatchGenes : ' + blackPatchGenes);

    var blackPatchAmountGenes = genes.slice(38, 44);
    print('blackPatchAmountGenes : ' + blackPatchAmountGenes);

    var brownGenes = genes.slice(44, 46);
    print('brownGenes : ' + brownGenes);

    var agoutiGenes = genes.slice(46, 48);
    print('agoutiGenes : ' + agoutiGenes);

    var liverGenes = genes.slice(48, 50);
    print('liverGenes : ' + liverGenes);

    var birdDiluteGenes = genes.slice(50, 52);
    print('birdDiluteGenes : ' + birdDiluteGenes);

    var greyGenes = genes.slice(52, 54);
    print('greyGenes : ' + greyGenes);

    var violetGenes = genes.slice(54, 56);
    print('violetGenes : ' + violetGenes);

    var darkGenes = genes.slice(56, 58);
    print('darkGenes : ' + darkGenes);

    var anthraciteGenes = genes.slice(58, 60);
    print('anthraciteGenes : ' + anthraciteGenes);

    var clearGenes = genes.slice(60, 62);
    print('clearGenes : ' + clearGenes);

    var opalescentGenes = genes.slice(62, 64);
	if (opalescentGenes[0] == 'a' && opalescentGenes[1] == 'a'){
    	var opalescent = 'Positive';
	} else {
		var opalescent = 'Negative';
	}
    print('opalescentGenes : ' + opalescentGenes + " - opalescent factor " + opalescent);
	

    var tobianoGenes = genes.slice(64,66);
    print('tobianoGenes : ' + tobianoGenes);

    var tobianoTweakGenes = genes.slice(66, 70);
    print('tobianoTweakGenes : ' + tobianoTweakGenes);

    var overoGenes = genes.slice(70, 72);
    print('overoGenes : ' + overoGenes);

    var overoTweakGenes = genes.slice(72, 76);
    print('overoTweakGenes : ' + overoTweakGenes);

    var diluteGenes = genes.slice(76, 78);
    print('diluteGenes : ' + diluteGenes);

    var whiteFaceGenes = genes.slice(78, 86);
    print('whiteFaceGenes : ' + whiteFaceGenes);

    var frontLeftSockGenes = genes.slice(86, 90);
    print('frontLeftSockGenes : ' + frontLeftSockGenes);

    var frontRightSockGenes = genes.slice(90, 94);
    print('frontRightSockGenes : ' + frontRightSockGenes);

    var backLeftSockGenes = genes.slice(94, 98);
    print('backLeftSockGenes : ' + backLeftSockGenes);

    var backRightSockGenes = genes.slice(98, 102);
    print('backRightSockGenes : ' + backRightSockGenes);

    var sockHeightGenes = genes.slice(102, 106);
    print('sockHeightGenes : ' + sockHeightGenes);

    var maneLightGreyGenes = genes.slice(106, 108);
    print('maneLightGreyGenes : ' + maneLightGreyGenes);

    var maneDarkGreyGenes = genes.slice(108, 110);
    print('maneDarkGreyGenes : ' + maneDarkGreyGenes);

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