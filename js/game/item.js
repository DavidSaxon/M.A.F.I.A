// Requires three.js

function item(typeName, position) {
	this.typeName = typeName;
	this.position = position;
}

item.prototype.getPosition = function() {
	return position;
}