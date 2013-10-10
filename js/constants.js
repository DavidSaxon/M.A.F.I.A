/* This file is for global variables. */


var numWindmills = 50;		
var insulationAmt = 50;	
var carEfficiency = 50;
var toggle = false;	
var dialogue = false;


/* A map of custom instruction text for different interactable objects.  If you add a new object, add a mapping. */
var instrMap = new Object();
instrMap["windmill"] = "Press the number keys to control the amount of New Zealand's electricity provided by windmills.";



//Object type variable.  Should be a string.  Used to determine which info file to open,
//in conjunction with the map below.  If you make a new object type, make a new info
// file for it (can just be placeholder), and give it a map entry.
var objType = null;

var infoMap = new Object();
infoMap["windmill"] = "./info-windmill.html"; //Naming convention - you get the idea.
infoMap["forest"] = "./info-forest.html";






