// Requires three.js

function windmill(x, y, z) {
	this.typeName = "windmill";
	this.variation = 0;
	this.basesize = 30.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Euler(0.0, 0.0, 0.0, 'XYZ');
	this.scalesize = 40;
	this.bladeSpeed = Math.random() * 0.5;
}

function house(x, y, z, yrot, v) {
	this.typeName = "house";
	this.basesize = 70.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Euler(0.0, yrot, 0.0, 'XYZ');
	this.rotation.y = yrot;
	this.scalesize = 20;
	this.variation = v;
}

function dude(x, y, z, yrot, size, v) {
	this.typeName = "dude";
	this.variation = v;
	this.persona = Math.floor(Math.random() * 10);
	this.basesize = 15.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Euler(0.0, yrot, 0.0, 'XYZ');
	this.scalesize = size;
}

function gas(x, y, z) {
	this.typeName = "gas";
	this.variation = 0;
	this.basesize = 101.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Euler(0.0, 0.0, 0.0, 'XYZ');
	this.scalesize = 8;
}

function coal(x, y, z) {
	this.typeName = "coal";
	this.variation = 0;
	this.basesize = 80.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Euler(0.0, 0.0, 0.0, 'XYZ');
	this.scalesize = 8;
}

function factory(x, y, z) {
	this.typeName = "factory";
	this.variation = 0;
	this.basesize = 100.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Euler(0.0, 3.14, 0.0, 'XYZ');
	this.scalesize = 27;
}

function tree(x, y, z) {
	this.typeName = "tree";
	this.ind = 0;
	this.variation = 0;
	this.basesize = 26.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Euler(0.0, 0.0, 0.0, 'XYZ');
	this.scalesize = 30;
}

function kiwi(x, y, z, v) {
	this.typeName = "kiwi";
	this.variation = v;
	this.basesize = 0.0;
	this.position = new THREE.Vector3(x, y, z);
	this.rotation = new THREE.Vector3(0.0, 0.0, 0.0);
	this.scalesize = 5;
}