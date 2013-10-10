function game() {
	this.items = new Object();

	/**
	* Update this when adding new types
	*/
	this.gameTypes = ["windmill", "house", "dude"];

	for (var i = 0; i < this.gameTypes.length; ++i) {
		this.items[ this.gameTypes[i] ] = new Array();
	}
}

game.prototype.add = function(addedItem) {
	console.log ( "adding " + addedItem.typeName );
	this.items[ addedItem.typeName ].push(addedItem);
}

game.prototype.getAll = function(typename) {
	return this.items[typename];
}

game.prototype.checkCollision = function(position) {
	for (var t = 0; t < this.gameTypes.length; ++t) {

		/* lookup by type */
		var list = this.getAll(this.gameTypes[t]);

		for (var i = 0; i < list.length; ++i) {
			var distance = position.distanceTo(list[i].position);
			if (distance < list[i].basesize + 10.0) {
				if (distance < list[i].basesize) {
					var v = position;
					v.sub( list[i].position );
					v.setLength(list[i].basesize);
					v.add( list[i].position );
				}

				return this.gameTypes[t];	// item is found, return type name
			}
		}

	}

	return "nothing";
}