
var talkTimes = 0;
var toggleIsOn = false;
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
		case "windmill":

			toggleOnOrOff(true);
			break;
		case "house":
			break;
		case "car":
			break;
		case "nothing":
			toggleOnOrOff(false);
			break;
		case "person":  //Each person will have their own unique dialog containing...dialogue - need to look this up somewhere
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


			
function talk(){
	console.log("Got to talk function");
	$("#dialogue-text").text(conversationTexts[talkTimes]);
	talkTimes++;
	dialogue = true;
	$( "#dialogue-box" ).toggle( "fold" );
}


			/*
				This method is fired when the user presses a number from 0 to 9. It passes that
				number as the paramater. It is only be fired once per key press (if the number
				is held down this will fired once only).
			*/
function press(number){
	console.log(number);
	switch(number){
		case 0:
			console.log("Zero");
			$("#radio").buttonset().children("#radio0").click();
			break;
		case 1:
			$("#radio").buttonset().children("#radio1").click();
			break;
		case 2:
			$("#radio").buttonset().find("#radio2").click();
			break;
		case 3:
			$("#radio").buttonset().find("#radio3").click();
			break;
		case 4:
			$("#radio").buttonset().find("#radio4").click();
			break;
		default:
			console.log("No action defined for that key");
			break;
	}
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
