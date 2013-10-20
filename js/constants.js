/* This file is for global variables. It keeps them all in one place so they can be changed easily.*/


var numWindmills = 50;		
var insulationAmt = 50;	
var carEfficiency = 50;
var toggle = false;	
var dialogue = false;

var conversationTexts = [["Welcome to our town", "I'm afraid we can't offer you much hospitality.", "We are struggling.", "Help us!",  "There was an awful hurricane last night.",  "Down at the beach, the retaining wall broke, and now the tide is coming in...", "Hurry or our houses will be lost!"]];



/* A map of custom instruction text for different interactable objects.  If you add a new object, add a mapping. */
var instrMap = new Object();
instrMap["windmill"] = "Press the number keys to control the amount of New Zealand's electricity provided by windmills.";
instrMap["house"] = "Press the number keys to control how much insulation New Zealand's houses have.";
instrMap["coal"]= "Press the number keys to control how much of New Zealand's electricity is provided by coal power plants.";
instrMap["tree"]="Press the number keys to control how much carbon-absorbing forest New Zealand has.";
instrMap["gas"]="Press the number keys to control how much of New Zealand's electricity is provided by natural gas power plants.";
instrMap["factory"]="Press the number keys to control how much intdustry New Zealand has.  Industrial applications consume large amounts of electricity and may pollute.";



//Object type variable.  Should be a string.  Used to determine which info file to open,
//in conjunction with the map below.  If you make a new object type, make a new info
// file for it (can just be placeholder), and give it a map entry.
var objType = null;

var infoMap = new Object();
infoMap["windmill"] = "./info-windmill.txt"; //Naming convention - you get the idea.
infoMap["tree"] = "./info-forest.txt";
infoMap["house"] = "./info-house.txt";
infoMap["coal"]="./info-coal.txt";
infoMap["gas"]="./info-gas.txt";
infoMap["factor"]="./info-factory.txt";






