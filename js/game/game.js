function game() {
	this.player = new player();
	this.items = new Array();
}

game.prototype.add = function(addedItem) {
	this.items.push(addedItem);
}

game.prototype.checkCollision = function() {
	for (var i = 0; i < this.items.length; ++i) {
		var distance = this.player.position.distanceTo(this.items.position);
		if (distance < 5.0) {
			alert("item nearby");
		}
	}
}