
var talkTimes = 0;
var toggleIsOn = false;
var stopDialogue = false;
var conversationTexts = [ "Welcome to our town", "I'm afraid we can't offer you much hospitality.", "We are struggling.", "Help us!",  "There was an awful hurricane last night.",  "Down at the beach, the retaining wall broke, and now the tide is coming in...", "Hurry or our houses will be lost!"];

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

  }
  
function interactWith(objectType){
	objType = objectType;
				//toggle = true;
	switch(objectType){
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
		case "nothing":
			toggleOnOrOff(false);
			dialogueOff(); //Close the dialogue box if it was open
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
function toggleOnOrOff(on){
	if((!toggleIsOn && on)|| (toggleIsOn && !on)){
		$("#buttons-instructions").text(instrMap[objType]);
		console.log("State change");
		if(!toggleIsOn){
			toggleIsOn = true;}
		else{
			toggleIsOn = false;
			objType = null;
		}
		$( "#radio-container" ).toggle( "fold" );
	}
}
			
function showMoreInfo(type){
	if(toggleIsOn){
		console.log("Show more info");
		if(objType != null){
			 console.log(infoMap[objType]);
			 window.open(
				  infoMap[objType], 
				  'Information', 
				  'width=626,height=436');
		}
	}
}

/* Pressing T the first time should bring up the dialog with the first item in it.  Pressing T subsequently should make the dialog disappear and reappear with
 * the next text, until you reach the end of the array, after which it should disappear and not reappear. 
 Even if the conversation is initiated by proximity, the user should be able to use a button to control when to go to the next text.
 Approach a person and the dialogue box opens with the first item.
*/
			
function talk(){
	if(!dialogue){
	$( "#dialogue-box" ).toggle( "fold" );
	talkTimes++;
	dialogue = true;
	}
}

/* This function is called when you move away from the person you were talking to. */
function dialogueOff(){
  if(dialogue) {
    	$( "#dialogue-box" ).toggle( "fold" );
	dialogue = false;
  }
}

/* Advances the conversation to the next line */
function advanceText(){
  if(dialogue && !stopDialogue){ //Don't advance the conversation if the window isn't visible, or if we are at the end
     $("#dialogue-text").text(conversationTexts[talkTimes]);
     talkTimes++;
     if(talkTimes == conversationTexts.length - 1){
       	  stopDialogue = true;
     }
  }
  else if(stopDialogue){ //Close the box since we have reached the end of the conversation
    $( "#dialogue-box" ).toggle( "fold" );
  }
}


			/*
				This method is fired when the user presses a number from 0 to 9. It passes that
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
