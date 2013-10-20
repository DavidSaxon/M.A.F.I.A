/**
* @author mrdoob / http://mrdoob.com/
* Adapted by Maddy for our control set!
*/

THREE.PointerLockControls = function ( camera ) {

var shiftMagnitude = 10; // this is how many times faster you go when holding shift
var numberDown = false;
var shiftMultiplier = 1;

var scope = this;

camera.rotation.set( 0, 0, 0 );

var pitchObject = new THREE.Object3D();
pitchObject.add( camera );

var yawObject = new THREE.Object3D();
yawObject.position.y = 10;
yawObject.add( pitchObject );

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

//Variables we added
var talk = false;
var moreInfo = false;

var isOnObject = false;
var canJump = false;

var velocity = new THREE.Vector3();

var PI_2 = Math.PI / 2;

//bobbing motion
var bobUp = true;
var bob = 0.0;

var onMouseMove = function ( event ) {

if ( scope.enabled === false ){ return;}

var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

yawObject.rotation.y -= movementX * 0.002;
pitchObject.rotation.x -= movementY * 0.002;

pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

};

var onKeyDown = function ( event ) {

switch ( event.keyCode ) {

  case 13: //enter
    hideHint();
  break;
  
  case 16: //shift
    shiftMultiplier = shiftMagnitude;
  break;


  case 48: //0
  case 49: //1
  case 50: //2
  case 51: //3
  case 52: //4
  case 53: //5
  case 54: //6
  case 55: //7
  case 56: //8
  case 57: //9
   if(!numberDown){numberDown = true; press(9 - (57 - event.keyCode));}
  break;

  case 38: // up
  case 87: // w
    moveForward = true;
  break;

  case 37: //left
  case 65: // a
    moveLeft = true; 
  break;

  case 40: // down
  case 83: // s
    moveBackward = true;
  break;

  case 39: //right
  case 68: // d
    moveRight = true;
  break;

  default:
    console.log(event.keyCode);
  break;

}

};

var onKeyUp = function ( event ) {

switch( event.keyCode ) {

  case 16: //shift
    shiftMultiplier = 1;
  break;

  case 48: //0
  case 49: //1
  case 50: //2
  case 51: //3
  case 52: //4
  case 53: //5
  case 54: //6
  case 55: //7
  case 56: //8
  case 57: //9
    numberDown = false;
  break;
    
  case 81: //q (advance dialogue)
   advanceText(); //in interactions.js
   break;

  case 84: //t (talk)
    talk = true;
    break;

  case 38: // up
  case 87: // w
    moveForward = false;
    break;

  case 37: //left
  case 65: // a
    moveLeft = false;
    break;

  case 40: // down
  case 83: // a
    moveBackward = false;
    break;

  case 39: //right
  case 68: // d
    moveRight = false;
    break;
    
  case 77: //M (Show more info)
    moreInfo = true;
  


  default:
    break;

  }

};

document.addEventListener( 'mousemove', onMouseMove, false );
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

this.enabled = false;

this.getObject = function () {

  return yawObject;

};

this.isOnObject = function ( boolean ) {

isOnObject = boolean;
canJump = boolean;

};

this.getDirection = function() {

// assumes the camera itself is not rotated

var direction = new THREE.Vector3( 0, 0, -1 );
var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

return function( v ) {

rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

v.copy( direction ).applyEuler( rotation );

return v;

}

}();

this.update = function ( delta ) {

if ( scope.enabled === false ) return;


if (talk){
  interactWith("person"); //interactWith is a function defined in interactions.js
  talk = false;
}

//Display the 'more info' box about an object
if(moreInfo){
  showMoreInfo(); //in interactions.js
  moreInfo = false;
}


delta *= 0.1;

velocity.x += ( - velocity.x ) * 0.08 * delta;
velocity.z += ( - velocity.z ) * 0.08 * delta;

//velocity.y -= 0.25 * delta;

if ( moveForward ) {velocity.z -= shiftMultiplier * 0.12 * delta;}
if ( moveBackward ) {velocity.z += shiftMultiplier * 0.12 * delta;}

if ( moveLeft ) {velocity.x -= shiftMultiplier * 0.12 * delta;}
if ( moveRight ){ velocity.x += shiftMultiplier * 0.12 * delta;}

if ( isOnObject === true ) {
  velocity.y = Math.max( 0, velocity.y );
}

yawObject.translateX( velocity.x );
yawObject.translateZ( velocity.z );

var bobInc = Math.abs((velocity.x + velocity.z) * 0.08);

//make the camera bob
if (bobUp) {

  bob += bobInc;

  if (bob >= 1.0) {

    bobUp = false;
  }
}
else {

  bob -= bobInc;

  if (bob <= 0.001) {

    bobUp = true;
  }
}

if (bobInc <= 0.1) {

  bob -= 0.08;
}

if (bob < 0.0) {

  bob = 0.0;
}

var yPos = Math.max(getHeightMapY(yawObject.position) + 10, game.seaLevel + 7);

yPos += Math.sin(bob) * 1.4;

yawObject.position.y = yPos;

//clamp the player pos
if (yawObject.position.z < -990) {

  yawObject.position.z = -990;
}
else if (yawObject.position.z > 990) {

  yawObject.position.z = 990;
}
if (yawObject.position.x < -990) {

  yawObject.position.x = -990;
}
else if (yawObject.position.x > 990) {

  yawObject.position.x = 990;
}

//TODO: REMOVE ME
//console.log(yawObject.position.x + " : " + yawObject.position.z);

};

};
