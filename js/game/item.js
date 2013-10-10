// Requires three.js

function windmill(x, y, z) {
	this.typeName = "windmill";
	this.basesize = 30.0;
	this.position = new THREE.Vector3(x, y, z);
	this.bladeSpeed = Math.random() * 1.5;
}

function house(x, y, z, yrot) {
	this.typeName = "house";
	this.basesize = 70.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = yrot;
}

function dude(x, y, z, size) {
	this.typeName = "dude";
	this.basesize = 15.0;
	this.position = new THREE.Vector3(x, y, z);
	this.scalesize = size;
}



