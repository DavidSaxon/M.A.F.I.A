/*
This is the test library for this project.
You should place a related set of tests inside a test("tests name". function(){}); function
Test library specific syntax is as follows:
	- ok(boolean, "message"); //this is for assertions
	- equal (arg1, arg2, "message"); //tests equality on the two arguments

    */

module("Front End Tests");
test( "Interactions.js tests", function() {

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
    ok($("#dialogue-box").is(":visible"), "Check talk() triggers talk dialogue to appear");

    // A test which checks whether the dialogue goes away when dialogueOff() is called
    dialogueOff();
    ok(!dialogue, "Check talk() twice hides the talk dialogue");
      
	// More tests on the interactions...  
});

// To insert more tests on another file uncomment and fill the following

/*test( "File name", function() {
    ok(true, "dummy test name");
    equal(true, true, "dummy tests name");
    });*/