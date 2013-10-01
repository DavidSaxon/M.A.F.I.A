

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

				$( "#dialogue-box" ).dialog({ autoOpen: false,
				    title: "Conversation"});
				$("#dialogue-text").text("Forty years of coal power has left the air polluted.");
				$( "#windmills-stuff" ).toggle( "fold" );
				$( "#insulation-stuff" ).toggle( "fold" );
				$( "#cars-stuff" ).toggle( "fold" );

  }
  
			function interact(objectType){
				toggle = true;
				switch(objectType){
					case "windmill":
					break;
					case "house":
					break;
					case "car":
					break;
					case "person":  //Each person will have their own unique dialog containing...dialogue - need to look this up somewhere
					break;
				}
			}

			//Toggle the div that will contain controls
			function q(){
				console.log("Q pressed!");
				toggle = true;
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