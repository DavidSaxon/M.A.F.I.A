// Requires three.js

function windmill(x, y, z) {
	this.typeName = "windmill";
	this.variation = 0;
	this.basesize = 30.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = 0.0;
	this.scalesize = 40;
	this.bladeSpeed = Math.random() * 0.5;
}

function house(x, y, z, yrot, v) {
	this.typeName = "house";
	this.basesize = 70.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = yrot;
	this.scalesize = 20;
	this.variation = v;
}

function dude(x, y, z, yrot, size) {
	this.typeName = "dude";
	this.variation = 0;
	this.persona = Math.floor(Math.random() * 10);
	this.basesize = 15.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = yrot;
	this.scalesize = size;
}

function gas(x, y, z) {
	this.typeName = "gas";
	this.variation = 0;
	this.basesize = 101.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = 0.0;
	this.scalesize = 8;
}

function coal(x, y, z) {
	this.typeName = "coal";
	this.variation = 0;
	this.basesize = 80.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = 0.0;
	this.scalesize = 8;
}

function factory(x, y, z) {
	this.typeName = "factory";
	this.variation = 0;
	this.basesize = 100.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = 3.14;
	this.scalesize = 27;
}

function tree(x, y, z) {
	this.typeName = "tree";
	this.ind = 0;
	this.variation = 0;
	this.basesize = 26.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = 0.0;
	this.scalesize = 30;
}

function kiwi(x, y, z) {
	this.typeName = "kiwi";
	this.variation = 0;
	this.basesize = 0.0;
	this.position = new THREE.Vector3(x, y, z);
	this.yRot = 0.0;
	this.scalesize = 30;
}