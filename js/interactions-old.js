
var talkTimes = 0;
var toggleIsOn = false;
var stopDialogue = false;
var infoWindowOpen = false;

/* Instantiates the buttons and JQuery objects, then hides them */
function initInteractions(){
	
//Just for the buttonset thing
				
	$(function() {
		$( "#radio" ).buttonset();
	});
	
	$( "#radio0" ).change(function() {
		console.log( "Handler for .click() called." );
	});
			//Hide all the pop-up dialogs, for now:
	$(function(){
		 $("#dialogue-text").text(conversationTexts[talkTimes]);
		 $("#dialogue-box").toggle("fold");
	});

	$("#radio-container").toggle("fold");
	$("#info").toggle("fold"); //Needs to be 'off' initially even if it's empty
	
	

  }
  
 /* Loads the relevant info for an object from a file stored on the server */ 
  function loadInfo(path){
    $.ajax({
	  url: path,
	  })
	  .done(function( data ) {
	  $("#info").text(data);
	});
  }
  
  
/* Main function for interactions.  Uses some other small functions to provide 
 * functionality.  If you add a new object type, you need to add a case for it here */  
function interactWith(objectType){
	if (objectType == null) {
		toggleOnOrOff(false);
		dialogueOff();
		return;
	} 


	objType = objectType.typeName;
				//toggle = true;
	switch(objectType.typeName){
		case "coal":
			toggleOnOrOff(true);
			break;
		case "gas":
			toggleOnOrOff(true);
			break;
		case "tree":
	    		toggleOnOrOff(true);
			break;
		case "forest":
	  		toggleOnOrOff(true);
			break;
		case "windmill":
			toggleOnOrOff(true);
			break;
		case "house":
			toggleOnOrOff(true);
			break;
		case "factory":
			toggleOnOrOff(true);
			break;
		case "car":
			toggleOnOrOff(true);
			break;
		case "person":  //Each person will have their own unique dialog containing...dialogue - need to look this up somewhere
			talk();
			break;
		case "dude":  //Each person will have their own unique dialog containing...dialogue - need to look this up somewhere
			talk();
			break;
		default:
			break;
	}
}

//Toggle the div that contains controls
<<<<<<< HEAD
//Open it if it was closed, and close it if it was open.
function toggleOnOrOff(on){
=======
function toggleOnOrOff(on, callback){
>>>>>>> 31a9ac19c848e9d94aef6d4b61801e1627e802a5
	if((!toggleIsOn && on)|| (toggleIsOn && !on)){
		$("#buttons-instructions").text(instrMap[objType]);
		if(!toggleIsOn){
			toggleIsOn = true;}
		else{
			toggleIsOn = false;
			objType = null;
		}
		$( "#radio-container" ).toggle( "fold" , callback);
	}
}

/* Brings up a box with more info about the selected object */
function showMoreInfo(type){
	if(toggleIsOn){
		console.log("Show more info");
		if(objType != null){
			 console.log(infoMap[objType]);
			loadInfo(infoMap[objType]);
			$("#info").toggle("fold");
			infoWindowOpen = true;
		}
	}
	//Allows you to close the info window if you left it open and moved away from the object
	else if (!toggleIsOn && infoWindowOpen){
	  $("#info").toggle("fold");
	  infoWindowOpen = false;
	}
}

/* Conversation is initiated by proximity, just like the interaction controls.  Once the speech bubble is open, pressing 'Q' makes the text advance.
Once you reach the end of the array, pressing 'Q' will make it disappear.  Pressing 'Q' again will make it reappear with the last text (current behaviour).
*/
<<<<<<< HEAD
function talk(){
=======
			
function talk(callback){
>>>>>>> 31a9ac19c848e9d94aef6d4b61801e1627e802a5
	if(!dialogue){
		dialogue = true;
		$( "#dialogue-box" ).show( "fold", callback );
		talkTimes++;
	}
}

/* This function is called when you move away from the person you were talking to. */
function dialogueOff(callback){
  if(dialogue) {
  		dialogue = false;
    	$( "#dialogue-box" ).hide( "fold" , callback);
  }
}

/* Advances the conversation to the next line */
function advanceText(callback){
  if(dialogue && !stopDialogue){ //Don't advance the conversation if the window isn't visible, or if we are at the end
     console.log("Text should advance");
     $("#dialogue-text").text(conversationTexts[talkTimes]);
     talkTimes++;
     if(talkTimes == conversationTexts.length - 1){
       	  stopDialogue = true;
     }
  }
  else if(stopDialogue){ //Close the box since we have reached the end of the conversation
    console.log("Dialogue box should disappear");
    $( "#dialogue-box" ).hide( "fold", callback );

  }
}


/*This method is fired when the user presses a number from 0 to 9. It passes that
number as the paramater. It is only be fired once per key press (if the number
is held down this will fired once only).
*/
function press(number){
	if (number >= 0 && number <= 4){
		$("#radio").buttonset().children("#radio" + number).click();
	}

	$("#radio").buttonset("refresh");
	game.effects[number].apply();
}

                        /* Shows a popup hint which is dismissable with the hide hint function
                           (currently triggered by [enter] 
                          */
function showHint(x, y, text){
              $("#hint").offset({ top: x, left: y});
              $("#hint").text(text);
              $("#hint").show();
              console.log(text);
}
                        
  /* Dismisses the hint popup */
function hideHint(){
             $("#hint").hide();
}
