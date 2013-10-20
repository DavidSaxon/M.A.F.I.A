/*

This is the test library for this project.
You should place a related set of tests inside a test("tests name". function(){}); function
If functions need to be checked with delay (i.e. a slow animation is involved) use asyncTest()
Test library specific syntax is as follows:
	- ok(boolean, "message"); //this is for assertions
	- equal (arg1, arg2, "message"); //tests equality on the two arguments

*/

    // Override the toggle such that it doesn't have an animation

module("Front End Tests");

asyncTest( "interactions.js", function() {

    expect(12);

    // Test whether showHint() displays a hint as expected
    showHint(30, 40, "test hint");
    ok($("#hint").is(":visible"), "Calling showHint() triggers the hint div" );

    // Test the hint dialogue contains the expected hint message
    equal($("#hint").html(), "test hint", "The hint is shown with the expected content");
    
    // Test the hint hiding works
    hideHint();
    ok(!$("#hint").is(":visible"), "Test hideHint() hides the #hint div");

    // Test talking dialogue functionality
    talk();
    ok(dialogue, "Check talk() triggers talk dialogue to appear");
    
    // Test dialogueOff()
    dialogueOff();
    ok(!dialogue, "Check dialogueOff() hides the talk dialogue"); 

    // Testing advanceText()
    talkTimes = 0;
    dialogue = true;
    stopDialogue = false;

    // Check advance text changes the dialogue text when appropriate
    advanceText();
    equal($("#dialogue-text").text(), conversationTexts[0], "Check advanceText() displays the correct message.");
    $("#dialogue-text").hide();
    ok(talkTimes == 1, "Check advanceText() appropriately increments talkTimes");

    // Check advancing text with no messages left signals to stop dialogues
    talkTimes = conversationTexts.length - 2;
    advanceText();
    ok(stopDialogue, "Check advanceText() signals to shut dialogues when there are no messages left.");

    // Check advance text closes the dialogue once the last message is delivered
    stopDialogue = true;
    advanceText(function(){
        ok(!$("#dialogue-box").is(":visible"), "Check advanceText() hides #dialogue-box once all messages said.");
    });


    // Test toggleOnOrOff()
    var tempToggle = toggleIsOn;
    objType = "windmill";
    $("#radio-container").hide();
    toggleIsOn = false;

    toggleOnOrOff(true, function(){
        equal($("#buttons-instructions").text(), instrMap["windmill"], "toggleOnOrOff() shows instructions");
        $("#buttons-instructions").hide();
        ok($("#radio-container").is(":visible"), "radio container is appropriately toggled");
        equal(toggleIsOn, !tempToggle, "toggleIsOn gets flipped");
      start();
    });
    


    
});

//I will modify this/add more here when we have a unified effects system
test("game", function(){
    game.effects[0].apply();
    equal(game.waterRise, -0.01);
});



// TODO 
// test toggleOnOrOff()
// test showMoreInfo()
// test interactWith()
// test other files (main.js)

// To insert tests on another file uncomment and fill the following

/*test( "File name", function() {
    ok(true, "dummy test name");
    equal(true, true, "dummy tests name");
    });*/