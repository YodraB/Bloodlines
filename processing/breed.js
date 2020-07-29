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