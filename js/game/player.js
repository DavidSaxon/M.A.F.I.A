// Requires three.js

function player() {
	this.position = THREE.vector3(0, 0, 0);
} 

player.prototype.getPosition = function() {
	return position;
}