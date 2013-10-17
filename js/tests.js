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

    // Test whether showHint() displays a hint as expected
    showHint(30, 40, "test hint");
    ok($("#hint").is(":visible"), "Calling showHint() triggers the hint div" );

    // Test the hint dialogue contains the expected hint message
    equal($("#hint").html(), "test hint", "The hint is shown with the expected content");
    
    // Test the hint hiding works
    hideHint();
    ok(!$("#hint").is(":visible"), "Test hideHint() hides the #hint div");

    // Test talking dialogue functionality
    talk()
    ok($("#dialogue-box").is(":visible"), "Check talk() triggers talk dialogue to appear");
   
    // Test calling talk() again makes it disappear
    talk();
    ok(!$("#dialogue-box").is(":visible"), "Check talk() twice hides the talk dialogue");

    // Testing advanceText()
    talkTimes = 0;
    dialogue = true;
    stopDialogue = false;

    // Check advance text changes the dialogue text when appropriate
    advanceText();
    equal($("#dialogue-text").text(), conversationTexts[0], "Check advanceText() displays the correct message.");
    ok(talkTimes == 1, "Check advanceText() appropriately increments talkTimes");

    // Check advancing text with no messages left signals to stop dialogues
    talkTimes = conversationTexts.length - 2;
    advanceText();
    ok(stopDialogue, "Check advanceText() signals to shut dialogues when there are no messages left.");

    // Check advance text closes the dialogue once the last message is delivered
    stopDialogue = true;
    advanceText();
    setTimeout(function() {
    ok(!$("#dialogue-box").is(":visible"), "Check advanceText() hides #dialogue-box once all messages said.");
    start();
    }, 1500);
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