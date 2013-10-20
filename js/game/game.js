function game() {
	this.items = new Object();
	console.log("Game objects initialising...");

	/**
	* Update this when adding new types
	*/
	this.gameTypes = ["windmill", "house", "dude", "coal", "gas", "tree"];

	for (var i = 0; i < this.gameTypes.length; ++i) {
		this.items[ this.gameTypes[i] ] = new Array();
	}

	/*
	 *	time incremented on each update
	 */ 
	this.timeEffect = 0;

	
	/*
	 *	world attributes and interpolation control
	 */ 
	this.seaLevel = -50;
	this.seaLevelStart = -50;
	this.seaLevelEnd = -50;

	this.fogLevel = 0;
	this.fogLevelStart = 0;
	this.fogLevelEnd = 0;

	this.forestLevel = 50;
	this.forestLevelStart = 50;
	this.forestLevelEnd = 50;

	this.interpolation = 1.0;

	/*
	 * effects is now essentially a 2D array
	 * things need to be referenced as effects[key]
	 * 
	 */
	this.effects = new Object();
	this.effects["tree"] = new Array();
	this.effects["tree"].push(new function(){
	  this.desc = "least trees";
	  this.apply = function(){
	    game.editForestLevel(20.0);
	    game.editSeaLevel(20.0);
	    console.log("Should fewer trees now");
	  }
	});
	this.effects["tree"].push(new function(){
	  this.desc = "a bit more than least trees";
	  this.apply = function(){
	    game.editForestLevel(60.0);
	    game.editSeaLevel(10.0);
	    console.log("Should fewer trees now");
	  }
	});
	this.effects["tree"].push(new function(){
	  this.desc = "midpoint trees";
	  this.apply = function(){
	    game.editForestLevel(90.0);
	    console.log("Should fewer trees now");
	  }
	});
	
	this.effects["tree"].push(new function(){
	  this.desc = "second-to-most trees";
	  this.apply = function(){
	    game.editForestLevel(130.0);
	    game.editSeaLevel(-20.0);
	    console.log("Should fewer trees now");
	  }
	});
	
	this.effects["tree"].push(new function(){
	  this.desc = "most trees";
	  this.apply = function(){
	    game.editForestLevel(180.0);
	    game.editSeaLevel(-30.0);
	    console.log("Should most trees now");
	  }
	});
	  
	this.effects["windmill"] = new Array();
	this.effects["windmill"].push( new function() {
		this.desc = "more windmills";
		this.apply = function() {
			// do something
			game.editSeaLevel(-10.0);
			//game.editForestLevel(20.0);
		}
	} );
	this.effects["windmill"].push( new function() {
		this.desc = "do nothing";
		this.apply = function() {
			// ...
			game.editSeaLevel(-30.0);
			//game.editForestLevel(60.0);
		}
	} );
	this.effects["windmill"].push( new function() {
		this.desc = "do something cool";
		this.apply = function() {
			// ...
			game.editSeaLevel(-40.0);
			//game.editForestLevel(90.0);
		}
	} );
	this.effects["windmill"].push( new function() {
		this.desc = "do something cool again";
		this.apply = function() {
			// ...
			game.editSeaLevel(-45.0);
			//game.editForestLevel(130.0);
		}
	} );
	this.effects["windmill"].push( new function() {
		this.desc = "do something cool again";
		this.apply = function() {
			// ...
			game.editSeaLevel(-47.0);
			//game.editForestLevel(180.0);
		}
	} ); 

	this.readyHeight = false;
}

game.prototype.editSeaLevel = function(result) {
	this.seaLevelStart = this.seaLevel;
	this.seaLevelEnd = result;
	this.interpolation = 0.0;
}

game.prototype.editForestLevel = function(resultf) {
	this.forestLevelStart = this.forestLevel;
	this.forestLevelEnd = resultf;
	this.interpolation = 0.0;
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
	this.timeEffect += 0.01;
	if (this.interpolation < 1.0) this.interpolation += 0.01;
	this.seaLevel = (1.0 - this.interpolation) * this.seaLevelStart + this.interpolation * this.seaLevelEnd + 3 * Math.sin(this.timeEffect);
	this.fogLevel = (1.0 - this.interpolation) * this.fogLevelStart + this.interpolation * this.fogLevelEnd;
	this.forestLevel = (1.0 - this.interpolation) * this.forestLevelStart + this.interpolation * this.forestLevelEnd;
	

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