function buildStadium() {
	let stadium = document.getElementById("stadium");

	let topPiece = document.createElement('div');
	topPiece.classList.add('topPiece');

	let stageLeft = document.createElement('div');
	stageLeft.classList.add('stageSides');
	
	let stageCenter = document.createElement('div');
	stageCenter.classList.add('stageCenter');

	let stage = document.createElement('div');
	stage.classList.add('stage');
	stage.innerHTML = "STAGE";
	stageCenter.appendChild(stage);

	let stageRight = document.createElement('div');
	stageRight.classList.add('stageSides');
	
	let vipFloor = document.createElement('div');
	vipFloor.classList.add('vipFloor');
	stageCenter.appendChild(vipFloor);
	
	let vipsection = document.createElement('div');
	vipsection.classList.add('vipsection');
	vipsection.innerHTML = "VIP";
	vipFloor.appendChild(vipsection);

	let bottomFloor = document.createElement('div');
	bottomFloor.classList.add('bottomFloor');
	stageCenter.appendChild(bottomFloor);

	let topFloor = document.createElement('div');
	topFloor.classList.add('topFloor');
	stageCenter.appendChild(topFloor);
	
	for (let i = 0; i < 10; i++) {
		let section = document.createElement('div');
		section.classList.add('sectionseating');
		section.innerHTML = String.fromCharCode(i + 65);
		if (i < 5) {
			stageLeft.appendChild(section);
		}
		else {
			stageRight.appendChild(section);
		}
	}
	
	for (let i = 10; i < 16; i++) {
		let section = document.createElement('div');
		section.classList.add('longseating');
		section.innerHTML = String.fromCharCode(i + 65);
		if (i < 13) {
			bottomFloor.appendChild(section);
		}
		else {
			topFloor.appendChild(section);
		}
	}
	

	stadium.appendChild(stageLeft);
	stadium.appendChild(stageCenter);
	stadium.appendChild(stageRight);
}