function game() {
	this.items = new Object();
	this.items["windmill"] = new Array();
}

game.prototype.add = function(addedItem) {
	console.log ( "adding " + addedItem.typeName );
	this.items[ addedItem.typeName ].push(addedItem);
}

game.prototype.getAll = function(typename) {
	return this.items[typename];
}

game.prototype.checkCollision = function(position) {
	var list = this.getAll("windmill");
	for (var i = 0; i < list.length; ++i) {
		var distance = position.distanceTo(list[i].position);
		//console.log("d = " +distance);
		if (distance < 50.0) {
			return "windmill";
			//alert("windmill nearby");
		}
	}

	return "nothing";
}