// Requires three.js

function windmill(x, y, z) {
	this.typeName = "windmill";
	this.position = new THREE.Vector3(x, y, z);
	this.bladeSpeed = Math.random() * 0.2;
}

function house(x, y, z, yrot) {
	this.typeName = "house";
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = yrot;
}

function dude(x, y, z, size) {
	this.typeName = "dude";
	this.position = new THREE.Vector3(x, y, z);
	this.scalesize = size;
}


