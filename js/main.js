if ( ! Detector.webgl ) {
	Detector.addGetWebGLMessage();
	throw new Error("WebGL Unavailable");
}

var camera, scene, renderer;
var geometry, material, mesh;
var controls,time = Date.now();

var objects = [];
var blades = [];	// just to rotate on update
var trees = [];	// just to edit on update
var kiwis = [];
var kiwiLegs = [];
var legDir = false;
var kiwiDir = [];

var ray;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

var game = new game();

//Keep the blocker div from disappearing when the user clicks the Facebook share link
share.addEventListener( 'click', function ( event ) {
	event.stopPropagation();
});

// NOTE: animate() was moved to be inside the init() function to fix the error that
// where water isn't loaded in animate yet
init();

function init() {
initInteractions(); //Call to interactions.js library (located in js if you want to modify it, but hosted on my homepages
//currently -Maddy

//$( "#dialogue-box").toggle("fold");
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 6000 );

scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xffffff, 0, 6000 );

var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
light.position.set( 1, 1, 1 );
scene.add( light );

var light = new THREE.DirectionalLight( 0x88aaaa, 0.75 );
light.position.set( -1, 0.5, -1 );
scene.add( light );

controls = new THREE.PointerLockControls( camera );
scene.add( controls.getObject() );

ray = new THREE.Raycaster();
ray.ray.direction.set( 0, -1, 0 );

//load the height
heightMapLoad("res/terrain/terrain.height_map");

// sea
var loader = new THREE.ImageLoader( );
loader.load( 'res/water.jpg', function ( image ) {

	var texture = new THREE.Texture();
	texture.image = image;
	texture.needsUpdate = true;

	geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

		var vertex = geometry.vertices[ i ];
		vertex.x += Math.random() * 20 - 10;
		vertex.y += Math.random() * 5;
		vertex.z += Math.random() * 20 - 10;

	}

	material  = new THREE.MeshLambertMaterial({
		map           : texture,
		vertexColors  : THREE.VertexColors,
		transparent: true, 
		opacity: 0.9
	} );

	water = new THREE.Mesh( geometry, material );
	scene.add( water );

	animate();

});

//TERRAIN
createTerrain();

initDudePositions();
var dudeHappyParts = ['res/dude/dude_eyes',
'res/dude/dude_happy',
'res/dude/dude_top',
'res/dude/dude_legs'];
loadObjMtlList("dude", 0, dudeHappyParts);

var dudeNeturalParts = ['res/dude/dude_eyes',
'res/dude/dude_netural',
'res/dude/dude_top',
'res/dude/dude_legs'];
loadObjMtlList("dude", 1, dudeNeturalParts);

var dudeSadNetural = ['res/dude/dude_eyes',
'res/dude/dude_sad',
'res/dude/dude_top',
'res/dude/dude_legs'];
loadObjMtlList("dude", 2, dudeSadNetural);

//WINDMILL
initWindmillPositions();
createWindmills();

//HOUSE
initHousePositions();
var house1Parts = ['res/house/house_1_body',
'res/house/house_1_base',
'res/house/house_1_frames',
'res/house/house_1_pillars',
'res/house/house_1_roof',
'res/house/house_1_windows',
'res/house/house_1_support',
'res/house/house_1_picket'];
loadObjMtlList("house", 0, house1Parts);

var house2Parts = ['res/house/house_1_body',
'res/house/house_1_base',
'res/house/house_1_frames',
'res/house/house_1_pillars',
'res/house/house_1_roof',
'res/house/house_1_windows',
'res/house/house_1_support',];
loadObjMtlList("house", 1, house2Parts);	

game.add(new coal(-220, 0, -800));
var coalParts = [
'res/coal/coal_body',
'res/coal/coal_roof',
'res/coal/coal_door',
'res/coal/coal_windows',
'res/coal/coal_stacks'];
loadObjMtlList("coal", 0, coalParts);

game.add(new gas(-600, 0, -800));
var gasParts = [
'res/gas/gas_body',
'res/gas/gas_door',
'res/gas/gas_pipes',
'res/gas/gas_stacks'];
loadObjMtlList("gas", 0, gasParts);

game.add(new factory(-600, 0, -480));
var factoryParts = [
'res/factory/factory_body',
'res/factory/factory_stacks',
'res/factory/factory_windows'];
loadObjMtlList("factory", 0, factoryParts);

var kiwiParts = [
'res/kiwi/kiwi_main']
loadObjMtlList2("kiwi", 0, kiwiParts, kiwis);

for (var i = 0; i < 25; ++i) {

	var x = Math.random() * 1800 - 900;
	var y = Math.random() * 1800 - 900;

	game.add(new kiwi(x, 0, y, 0));
	game.add(new kiwiLeg(x, 2, y));
	game.add(new kiwiLeg(x, 2, y));
	kiwiDir.push(0.0);
}

var kiwiLegParts = [
'res/kiwi/kiwi_legs']
loadObjMtlList2("kiwiLeg", 0, kiwiLegParts, kiwiLegs);

/*
 * add trees randomly within a determined space
 */ 
for (var i = 0; i < 150; i++) {
	var t = new tree( Math.random() * 900 + 100, 0, Math.random() * 2000 - 1000 );
	t.variation = Math.floor(Math.random() * 4);
	var x = Math.random();
	t.scalesize = 10 + x * x * 30;
	game.add( t );

	t = new tree( Math.random() * 800 - 1000, 0, Math.random() * 500 - 600 );
	t.variation = Math.floor(Math.random() * 4);
	var x = Math.random();
	t.scalesize = 10 + x * x * 30;
	game.add( t );
}

var treeParts1 = ['res/tree_1/tree_1_top',
'res/tree_1/tree_1_trunk'];
loadObjMtlList2("tree", 0, treeParts1, trees);

var treeParts2 = ['res/tree_2/tree_2_top',
'res/tree_2/tree_2_trunk'];
loadObjMtlList2("tree", 1, treeParts2, trees);

var treeParts3 = ['res/tree_3/tree_3_top',
'res/tree_3/tree_3_trunk'];
loadObjMtlList2("tree", 2, treeParts3, trees);

var treeParts4 = ['res/tree_4/tree_4_top',
'res/tree_4/tree_4_trunk'];
loadObjMtlList2("tree", 3, treeParts4, trees);


renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColorHex( 0xaaffff, 1 );

document.body.appendChild( renderer.domElement );


window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

//

controls.isOnObject( false );

ray.ray.origin.copy( controls.getObject().position );
ray.ray.origin.y -= 10;

var intersections = ray.intersectObjects( objects );

if ( intersections.length > 0 ) {

	var distance = intersections[ 0 ].distance;

	if ( distance > 0 && distance < 10 ) {

		controls.isOnObject( true );

	}

}

// update game state
game.update();

//update fog
var fogLevel = game.getLevel("fog");

scene.fog = new THREE.Fog(0x000000, 0, fogLevel);

if (fogLevel >= 5000) {

	renderer.setClearColorHex(0xaaffff, 1 );
}
else if (fogLevel >= 1500) {

	renderer.setClearColorHex(0x55aaaa, 1 );
}
else if (fogLevel >= 700) {

	renderer.setClearColorHex(0x115555, 1 );
}
else if (fogLevel >= 100) {

	renderer.setClearColorHex(0x000000, 1 );
}

// rotate all the blades
var list = game.getAll("windmill");
for (var i = 0; i < list.length; i++) {
	blades[i].rotation.z += list[i].bladeSpeed;
}

// update sea level
water.position.y = game.getLevel("sea");

// update forests
var list = game.getAll("tree");
for (var i = 0; i < trees.length; ++i) {
	trees[i].position.y = ( trees[i].name < game.getLevel("forest") )? list[ trees[i].name ].position.y : -3000;
	list[ trees[i].name ].show = ( trees[i].name < game.getLevel("forest") );
}

//move the kiwis
if (kiwiLegs[0].rotation.z > 0.6) {

	legDir = false;
}
if (kiwiLegs[0].rotation.z < -0.6) {

	legDir = true;
}

for (var i = 0; i < kiwis.length; ++i) {

	//move the body
	kiwis[i].rotation.y = kiwiDir[i] - 1.55;
	kiwis[i].position.x -= Math.sin(kiwiDir[i]) * 0.5;
	kiwis[i].position.z -= Math.cos(kiwiDir[i]) * 0.5;

	//move the legs
	kiwiLegs[i * 2].rotation.y = kiwiDir[i] - 1.55;
	kiwiLegs[i * 2].position.x -= Math.sin(kiwiDir[i]) * 0.5;
	kiwiLegs[i * 2].position.z -= Math.cos(kiwiDir[i]) * 0.5;
	kiwiLegs[i * 2 + 1].rotation.y = kiwiDir[i] - 1.55;
	kiwiLegs[i * 2 + 1].position.x -= Math.sin(kiwiDir[i]) * 0.5;
	kiwiLegs[i * 2 + 1].position.z -= Math.cos(kiwiDir[i]) * 0.5;

	//swing the legs
	if (legDir) {

		kiwiLegs[i * 2].rotation.z += 0.3;
		kiwiLegs[i * 2 + 1].rotation.z -= 0.3;
	}
	else {

		kiwiLegs[i * 2].rotation.z -= 0.3;
		kiwiLegs[i * 2 + 1].rotation.z += 0.3;
	}

	if (kiwis[i].position.z < -990) {

	 	kiwiDir[i] = Math.floor(Math.random()*360) * 0.0174532925;
	}
	else if (kiwis[i].position.z > 990) {

	  kiwiDir[i] = Math.floor(Math.random()*360) * 0.0174532925;
	}
	else if (kiwis[i].position.x < -990) {

	  kiwiDir[i] = Math.floor(Math.random()*360) * 0.0174532925;
	}
	else if (kiwis[i].position.x > 990) {

	  kiwiDir[i] = Math.floor(Math.random()*360) * 0.0174532925;
	}
	else if (Math.floor(Math.random()*280) == 1) {

		kiwiDir[i] = Math.floor(Math.random()*360) * 0.0174532925;
	}

	var heightPos = Math.max(getHeightMapY(kiwis[i].position),
		game.getLevel("sea") - 1); 

	kiwis[i].position.y = heightPos;
	kiwiLegs[i * 2].position.y = 2 + heightPos;
	kiwiLegs[i * 2 + 1].position.y = 2 + heightPos;
}

// check collisions
var ps = controls.getObject().position;
var nearthing = game.checkCollision(ps);
//console.log(nearthing);
interactWith(nearthing);

controls.update( Date.now() - time );
if(toggle){
	$( "#test" ).toggle( "fold" );
	toggle = false;
}

renderer.render( scene, camera );


time = Date.now();

}

//creates the terrain
function createTerrain() {

	var loadermtl = new THREE.OBJMTLLoader();

    //main terrain
	loadermtl.load( 'res/terrain/terrain_main.obj',
			'res/terrain/terrain_main.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});

	//beach
	loadermtl.load( 'res/terrain/beach.obj',
			'res/terrain/beach.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});

	//beach edge
	loadermtl.load( 'res/terrain/beach_edge_1.obj',
			'res/terrain/beach_edge_1.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});
	loadermtl.load( 'res/terrain/beach_edge_2.obj',
			'res/terrain/beach_edge_2.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});

	//beach mid
	loadermtl.load( 'res/terrain/beach_mid_1.obj',
			'res/terrain/beach_mid_1.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});
	loadermtl.load( 'res/terrain/beach_mid_2.obj',
			'res/terrain/beach_mid_2.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});

	//road 1
	loadermtl.load( 'res/terrain/road_1.obj',
			'res/terrain/road_1.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});

	//road 2
	loadermtl.load( 'res/terrain/road_2.obj',
			'res/terrain/road_2.mtl', 
			function ( object ) {

			scene.add( object );
    	objects.push( object );
	});

    //skybox
	// loadermtl.load( 'res/terrain/skybox.obj',
	// 		'res/terrain/skybox.mtl', 
	// 		function ( object ) {

	// 		scene.add( object );
 //    	objects.push( object );
	// });
}

// Lock the pointer
createPointerLock();

function initDudePositions() {

	game.add(new dude(-80, 0, -180, 1.55, 12, 1));
	game.add(new dude(-108, 5, -200, 1.55, 10, 0));
	game.add(new dude(-108, 5, -205, 1.55, 7, 0));
	game.add(new dude(-450, 0,    0, 3.14, 12, 2));
	game.add(new dude(-650, 0,    0, 3.14, 12, 2));
	game.add(new dude(-550, 0,  500, 2.14, 12, 2));
	game.add(new dude(-200, 0,  -690, 0.0, 12, 0));
	game.add(new dude(-480, 11,  -480, 3.14, 12, 0));
	game.add(new dude( 820,  0,     0, 3.14, 12, 1));
}

function loadObjMtlList(gameObjString, variation, fileList) {
	var loadermtl = new THREE.OBJMTLLoader();

	for (var i = 0; i < fileList.length; ++i) {
		var objName = fileList[i]+'.obj';
		var mtlName = fileList[i]+'.mtl';

		loadermtl.load( objName, mtlName, function ( object ) {

			/* use games list of all the things */
			var list = game.getAll(gameObjString);

			for (var i = 0; i < list.length; ++i) {
				if (list[i].variation == variation) {
					var mesh = object.clone();

					mesh.scale.set(list[i].scalesize, list[i].scalesize, list[i].scalesize);
					mesh.position = list[i].position;
					mesh.rotation.y = list[i].rotation.y;	

					scene.add(mesh);
					objects.push(mesh);
				}
			}
		});
	}
}

function loadObjMtlList2(gameObjString, variation, fileList, trackList) {
	var loadermtl = new THREE.OBJMTLLoader();

	for (var x = 0; x < fileList.length; ++x) {
		var objName = fileList[x]+'.obj';
		var mtlName = fileList[x]+'.mtl';

		loadermtl.load( objName, mtlName, function ( object ) {

			/* use games list of all the things */
			var list = game.getAll(gameObjString);

			for (var i = 0; i < list.length; ++i) {
				if (list[i].variation == variation) {
					var mesh = object.clone();

					mesh.scale.set(list[i].scalesize, list[i].scalesize, list[i].scalesize);
					mesh.rotation.y = list[i].rotation.y;
					mesh.position = list[i].position.clone();

					mesh.name = i;
					scene.add(mesh);
					objects.push(mesh);
					trackList.push(mesh);
				}
			}
		});
	}
}

function initWindmillPositions() {

	game.add( new windmill(400, 0, 450) );
	game.add( new windmill(400, 0, 300) );
	game.add( new windmill(400, 0, 150) );
	game.add( new windmill(400, 0, 0) );

}

/* load windmills into positions specified by game logic */
function createWindmills() {
	var loader = new THREE.OBJLoader();

	loader.load( 'res/windmill_blades.obj', function ( object ) {
		material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );

		/* use games list of windmills */
		var list = game.getAll("windmill");
		for (var i = 0; i < list.length; ++i) {

			var mesh = object.clone();

			mesh.scale.set(list[i].scalesize, list[i].scalesize, list[i].scalesize);
			mesh.rotation.y = -1;
			mesh.position = list[i].position.clone();
			mesh.position.y += 6.13328 * list[i].scalesize;

			scene.add( mesh );
			blades.push( mesh );

			material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			objects.push( mesh );
		}
	} );

	loader.load( 'res/windmill_base.obj', function ( object ) {
		material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );

		/* use games list of windmills */
		var list = game.getAll("windmill");
		for (var i = 0; i < list.length; ++i) {

			var mesh = object.clone();

			mesh.scale.set(list[i].scalesize, list[i].scalesize, list[i].scalesize);
			mesh.rotation.y = -1;
			mesh.position = list[i].position.clone();

			scene.add( mesh );
			material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			objects.push( mesh );
		}

	});
}

function initHousePositions() {

	game.add(new house(-150, 0, -180,  1.55, 0));
	game.add(new house(-255, 0,  850, -1.55, 1));
	game.add(new house(-255, 0,  650, -1.55, 1));
	game.add(new house(-255, 0,  450, -1.55, 1));
	game.add(new house(-450, 0,  250,  0.0,  1));
	game.add(new house(-650, 0,  250,  0.0,  1));
	game.add(new house(-850, 0,  250,  0.0,  1));
	game.add(new house(-450, 0,   80,  3.14, 0));
	game.add(new house(-650, 0,   80,  3.14, 1));
	game.add(new house(-850, 0,   80,  3.14, 1));
}

function createPointerLock(){
	var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

	if ( havePointerLock ) {

		var element = document.body;

		var pointerlockchange = function ( event ) {

			if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

				controls.enabled = true;

				blocker.style.display = 'none';

			} else {

				controls.enabled = false;

				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';

				instructions.style.display = '';

			}

		}

		var pointerlockerror = function ( event ) {

			instructions.style.display = '';

		}

// Hook pointer lock state change events
document.addEventListener( 'pointerlockchange', pointerlockchange, false );
document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

document.addEventListener( 'pointerlockerror', pointerlockerror, false );
document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

instructions.addEventListener( 'click', function ( event ) {

	instructions.style.display = 'none';

// Ask the browser to lock the pointer
element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

if ( /Firefox/i.test( navigator.userAgent ) ) {

	var fullscreenchange = function ( event ) {

		if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

			document.removeEventListener( 'fullscreenchange', fullscreenchange );
			document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

			element.requestPointerLock();
		}

	}

	document.addEventListener( 'fullscreenchange', fullscreenchange, false );
	document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

	element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

	element.requestFullscreen();

} else {

	element.requestPointerLock();

}

}, false );

} else {

	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}
}