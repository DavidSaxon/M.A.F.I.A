function game() {
	this.items = new Object();

	/**
	* Update this when adding new types
	*/
	this.gameTypes = ["windmill", "house", "dude", "coal", "gas", "tree"];

	for (var i = 0; i < this.gameTypes.length; ++i) {
		this.items[ this.gameTypes[i] ] = new Array();
	}

	this.waterRise = 0.01;
	this.seaLevel = -50;

	/*
	 * effects 
	 */
	this.effects = new Array();
	this.effects.push( new function() {
		this.desc = "more windmills";
		this.apply = function() {
			// do something
			console.log("First thing in effects triggered.");
			game.waterRise = -0.01;

		}
	} );
	this.effects.push( new function() {
		this.desc = "do nothing";
		this.apply = function() {
			// ...
			game.waterRise = 0.1;
		}
	} );
}

game.prototype.add = function(addedItem) {
	this.items[ addedItem.typeName ].push(addedItem);
}

game.prototype.getAll = function(typename) {
	return this.items[typename];
}

game.prototype.checkCollision = function(position) {
	if (position.y < this.seaLevel+10.0) position.y = this.seaLevel+10.0;

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

game.prototype.update = function() {
	this.seaLevel += this.waterRise;
}

game.prototype.setWind = function(level) {
	
}