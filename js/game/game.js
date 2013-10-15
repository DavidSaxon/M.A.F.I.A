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
			game.waterRise = 0.5;
		}
	} );
	this.effects.push( new function() {
		this.desc = "do something cool";
		this.apply = function() {
			// ...
			game.waterRise = -0.5;
		}
	} );

	this.readyHeight = false;
}

game.prototype.add = function(addedItem) {
	this.items[ addedItem.typeName ].push(addedItem);
	if (this.readyHeight) {
		addedItem.position.y += heightFunc(addedItem.position);
	}
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

				return list[i];	// item is found, return type name
			}
		}

	}

	return null;
}

game.prototype.update = function() {
	this.seaLevel += this.waterRise;
	//this.getAll("dude")[0].position.y -= 0.5;

}

game.prototype.setWind = function(level) {
	
}

game.prototype.readyHeightMap = function(heightFunc) {

	for (var t = 0; t < this.gameTypes.length; ++t) {

		/* lookup by type */
		var list = this.getAll(this.gameTypes[t]);

		for (var i = 0; i < list.length; ++i) {
			list[i].position.y += heightFunc(list[i].position);
			
		}

	}

	this.readyHeight = true;
}