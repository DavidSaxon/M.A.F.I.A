
				var talkTimes = 0;
				var toggleIsOn = false;
				var conversationTexts = [ "Welcome to our town", "I'm afraid we can't offer you much hospitality.", "We are struggling.", "Help us!",  "There was an awful hurricane last night.",  "Down at the beach, the retaining wall broke, and now the tide is coming in...", "Hurry or our houses will be lost!"];
				function initInteractions(){

							/* Initialise the slider */
				$(function() {
				$( "#windmills-slider" ).slider({
					change: function( event, ui ) {
					numWindmills = $("#windmills-slider").slider("value");
					/*numWindmills = $("#slider").slider("values");*/
					$("#windmills").text("Windmills: " +numWindmills);
					console.log("Changed windmills");
					},
					orientation: "horizontal",
					min: 0,
					max: 100,
					value: 50});
				});

				$(function() {
				$( "#insulation-slider" ).slider({
					change: function( event, ui ) {
					insulationAmt = $("#insulation-slider").slider("value");
					$("#insulation").text("Insulation: " +insulationAmt);
					console.log("Changed insulation");
					},
					orientation: "horizontal",
					min: 0,
					max: 100,
					value: 50});
				});

				$(function() {
				$( "#cars-slider" ).slider({
					change: function( event, ui ) {
					carEfficiency = $("#cars-slider").slider("value");
					/*numWindmills = $("#slider").slider("values");*/
					$("#cars").text("cars: " +numWindmills);
					console.log("Changed cars");
					},
					orientation: "horizontal",
					min: 0,
					max: 100,
					value: 50});
				});
				
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
				//$( "#dialogue-box" ).dialog({ autoOpen: false,
				  //  title: "Conversation"});
				//$("#dialogue-text").text("Forty years of coal power has left the air polluted.");
				  $("#dialogue-box").toggle("fold");
				});
				$( "#windmills-stuff" ).toggle( "fold" );
				$( "#insulation-stuff" ).toggle( "fold" );
				$( "#cars-stuff" ).toggle( "fold" );
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
				}
			}

			//Toggle the div that will contain controls
			function toggleOnOrOff(on){
				if((!toggleIsOn && on)|| (toggleIsOn && !on)){
				 $("#buttons-instructions").text(instrMap[objType]);
				 console.log("State change");
					if(!toggleIsOn){
					  toggleIsOn = true;}
					else{toggleIsOn = false;
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

			function changeDisplayedSlider(dir){
			  sliderChange(dir, "windmills");
			}

			//Change slider value
			function sliderChange(dir, slider){ //slider is a string
				if(dir == 1){ //up
					console.log("Slider should move up");
					if((numWindmills + 5) <= 100){
					numWindmills += 5;
					}
	
				}
				else if(dir == 0){ //down
					console.log("Slider should move down");
					if((numWindmills - 5) >= 0){
					  numWindmills = numWindmills - 5;}

				}
    			console.log("Value of numWindmills:", numWindmills);
			if(slider == "windmills"){
			$( "#windmills-slider" ).slider( "value", numWindmills );

			$("#windmills-slider").trigger("slide");
			$("#windmills-slider").slider("refresh");
			$("#windmills").text("Windmills: " +numWindmills);
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
				}
			}