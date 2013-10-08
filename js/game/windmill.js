function windmill(x, y, z) {
	this.typeName = "windmill";
	this.position = new THREE.Vector3(x, y, z);
	this.bladeSpeed = Math.random() * 0.2;
}

