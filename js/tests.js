/*
This is the test library for this project.
You should place a related set of tests inside a test("tests name". function(){}); function
Test library specific syntax is as follows:
	- ok(boolean, "message"); //this is for assertions
	- equal (arg1, arg2, "message"); //tests equality on the two arguments

*/


test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});