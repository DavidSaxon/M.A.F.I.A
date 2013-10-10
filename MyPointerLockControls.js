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

var interact = false; //mine
var talk = false;
var moreInfo = false;

var sliderUp = false;
var sliderDown = false;

var isOnObject = false;
var canJump = false;

var velocity = new THREE.Vector3();

var PI_2 = Math.PI / 2;

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

  case 81: //q (interact)
  break;
  //Show/hide bubbles

  case 38: // up
  case 87: // w
    moveForward = true;
  break;

  case 37: // left
    sliderDown = true;
  break;

  case 65: // a
    moveLeft = true; 
  break;

  case 40: // down
  case 83: // s
    moveBackward = true;
  break;

  case 39: // right
    sliderUp = true;
  break;

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

  case 81: //q (interact with objects)
    console.log("Q up");
    interact = true;
    break;

  case 84: //t (talk)
    console.log("T pressed");
    talk = true;
    break;

  case 38: // up
  case 87: // w
    moveForward = false;
    break;


  case 65: // a
    moveLeft = false;
    break;

  case 40: // down
  case 83: // a
    moveBackward = false;
    break;


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

//My code
/*if (interact){
  q();
  interact = false;
}*/

if (talk){
  interactWith("person"); //interactWith is a function defined in interactions.js
  talk = false;
}

if(moreInfo){
  showMoreInfo(); //in interactions.js
  moreInfo = false;
}

if(sliderUp){
  changeDisplayedSlider(1); //Defined in interactions.js
  sliderUp = false;
}

if(sliderDown){
  changeDisplayedSlider(0);
  sliderDown = false;
}

delta *= 0.1;

velocity.x += ( - velocity.x ) * 0.08 * delta;
velocity.z += ( - velocity.z ) * 0.08 * delta;

velocity.y -= 0.25 * delta;

if ( moveForward ) {velocity.z -= shiftMultiplier * 0.12 * delta;}
if ( moveBackward ) {velocity.z += shiftMultiplier * 0.12 * delta;}

if ( moveLeft ) {velocity.x -= shiftMultiplier * 0.12 * delta;}
if ( moveRight ){ velocity.x += shiftMultiplier * 0.12 * delta;}

if ( isOnObject === true ) {
  velocity.y = Math.max( 0, velocity.y );
}

yawObject.translateX( velocity.x );
yawObject.translateY( velocity.y );
yawObject.translateZ( velocity.z );

if ( yawObject.position.y < 10 ) {
  
  velocity.y = 0;
  yawObject.position.y = 10;

  canJump = true;
}

};

};
