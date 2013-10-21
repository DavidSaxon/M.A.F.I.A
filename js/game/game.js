function game() {
	this.items = new Object();
	console.log("Game objects initialising...");

	/**
	* Update this when adding new types
	*/
	this.gameTypes = ["windmill", "house", "dude", "coal",
		"gas", "factory", "tree", "kiwi", "kiwiLeg"];

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
	this.effectTypes = ["sea", "fog", "forest"];

	this.interpolation = new Object();
	this.level = new Object();
	this.levelStart = new Object();
	this.levelEnd = new Object();
	for (var i = 0; i < this.effectTypes.length; ++i) {
		this.interpolation [ this.effectTypes[i] ] = 1.0;
		this.level 		[ this.effectTypes[i] ] = 0.0;
		this.levelStart	[ this.effectTypes[i] ] = 0.0;
		this.levelEnd	[ this.effectTypes[i] ] = 0.0;
	}

	this.editLevel("sea", -13);
	this.editLevel("forest", 50);
	this.editLevel("fog", 2000);


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
			var list = game.getAll("dude");
			console.log("edit windmill ... "+list.length);
			
			for (var i = 0; i < list.length; ++i) {
			  console.log("... "+list[i].persona);
			  if(list[i].persona == 0){
			    console.log(list[i].persona);
			   
			    list[i].state = "happy";
			  }
			}
			//game.editForestLevel(180.0);
		}
	} ); 
	
	this.effects["factory"] = new Array();
	this.effects["factory"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			game.editLevel("fog", 6000);
			//game.editSeaLevel(47.0);
			//game.editForestLevel(180.0);
	}
	} ); 
	this.effects["factory"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			//game.editSeaLevel(20.0);
			//game.editForestLevel(180.0);
			game.editLevel("fog", 2000);

	}
	} ); 
	this.effects["factory"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			//game.editSeaLevel(0.0);
			//game.editForestLevel(180.0);
			game.editLevel("fog", 800);

	}
	} ); 
	this.effects["factory"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			//ame.editSeaLevel(-30.0);
			//game.editForestLevel(180.0);
			game.editLevel("fog", 200);

	}
	} ); 
	this.effects["factory"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			game.editLevel("fog", 100);
			//game.editSeaLevel(-47.0);
			//game.editForestLevel(180.0);
	}
	} ); 
	this.effects["house"] = new Array();
	this.effects["house"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			game.editSeaLevel(47.0);
			//game.editForestLevel(180.0);
	}
	} ); 
	this.effects["house"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			game.editSeaLevel(30.0);
			//game.editForestLevel(180.0);
	}
	} ); 
	this.effects["house"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			game.editSeaLevel(10.0);
			//game.editForestLevel(180.0);
	}
	} ); 
	this.effects["house"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			game.editSeaLevel(-30.0);
			//game.editForestLevel(180.0);
	}
	} ); 
	this.effects["house"].push( new function() {
	this.desc = "do something cool again";
	this.apply = function() {
			// ...
			game.editSeaLevel(-40.0);
			//game.editForestLevel(180.0);
	}
	} ); 

	this.readyHeight = false;
}

game.prototype.getLevel = function(effectName) {
	return this.level[effectName];
}

game.prototype.editLevel = function(effectName, result) {
	//  if (this.interpolation[effectName] < 1.0) {
	//  	console.log("wait for current effect to complete");
	//  	return 0;
	// }
	console.log("set level "+ this.level[effectName] + " to " +result);
	this.levelStart[effectName] = this.level[effectName];
	this.levelEnd[effectName] = result;
	this.interpolation[effectName] = 0.0;

	console.log(this.levelStart[effectName] + " ... " + this.levelEnd[effectName]);
}

game.prototype.getInterpolatedValue = function(effectName) {
	if (this.interpolation[effectName]  < 1.0) this.interpolation[effectName]  += 0.01;
	return (1.0 - this.interpolation[effectName]) * this.levelStart[effectName] + this.interpolation[effectName] * this.levelEnd[effectName];
}

game.prototype.editSeaLevel = function(result) {
	this.editLevel("sea", result);
}

game.prototype.editForestLevel = function(resultf) {
	this.editLevel("forest", resultf);
}

game.prototype.add = function(addedItem) {
	this.items[ addedItem.typeName ].push(addedItem);
	console.log("Added item with name " +addedItem.typeName);
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
			if (list[i].show && distance < list[i].basesize + 10.0) {
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

	this.level["sea"] = this.getInterpolatedValue("sea") + 3 * Math.sin(this.timeEffect);
	this.level["fog"] = this.getInterpolatedValue("fog");
	this.level["forest"] = this.getInterpolatedValue("forest");

	this.seaLevel = this.level["sea"];
	this.fogLevel = this.level["fog"];
	this.forestLevel = this.level["forest"];

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
