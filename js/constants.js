/* This file is for global variables. It keeps them all in one place so they can be changed easily.*/


var numWindmills = 50;		
var insulationAmt = 50;	
var carEfficiency = 50;
var toggle = false;	
var dialogue = false;

/* This is starting to look like we might need a database... */
var conversationTexts = new Object();
conversationTexts[0] = new Object();
conversationTexts[0]["happy"] = ["Thank you so much for lowering the sea level!", "My house is safe again."];
conversationTexts[0]["sad"] = ["Welcome to our town", "I'm afraid we can't offer you much hospitality.", "We are struggling.", "Help us!",  "There was an awful hurricane last night.",  "Down at the beach, the retaining wall broke, and now the tide is coming in...", "Hurry or our houses will be lost!"];
conversationTexts[1] = new Object();
conversationTexts[1]["sad"] = ["Hi!", "The storms and rising temperatures are wreaking havoc on my garden.  My poor plants!"];
conversationTexts[2] = new Object();
conversationTexts[2]["sad"] = ["Hi!", "I can't remember the last time I saw snow."];
conversationTexts[3] = new Object();
conversationTexts[3] ["sad"] = ["Hi!", "I can't go fishing or surfing anymore."];
conversationTexts[4] = new Object();
conversationTexts[4]["sad"]=["Hi!", "I always recycle plastics, and I use compact fluorescent lightbulbs."];
conversationTexts[5] = new Object();
conversationTexts[5]["sad"]=["Hi!", "Hello", "How are you?"];
conversationTexts[6] = new Object();
conversationTexts[6]["sad"] = ["Hi!", "Hello", "How are you?"];
conversationTexts[7] = new Object();
conversationTexts[7]["sad"]=["Hi!", "Hello", "How are you?"];
conversationTexts[8] = new Object();
conversationTexts[8]["sad"]=["Hi!", "Hello", "How are you?"];
conversationTexts[9] = new Object();
conversationTexts[9]["sad"] = ["Hi!", "Hello", "How are you?"];
conversationTexts[10] = new Object();
conversationTexts[10]["sad"]=["Hi!", "Hello", "How are you?"];



/* A map of custom instruction text for different interactable objects.  If you add a new object, add a mapping. */
var instrMap = new Object();
instrMap["windmill"] = "Press the number keys to control the amount of New Zealand's electricity provided by windmills.";
instrMap["house"] = "Press the number keys to control how energy-efficient New Zealand's houses have.";
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
infoMap["factory"]="./info-factory.txt";






