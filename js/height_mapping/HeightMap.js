/*************************\
| Terrain height mapping. |
\*************************/

//the height vertices
var heightVertices = [];
//height faces
var heightFaces = [];
var heightMap = [];

/**Loads the height map file*/
function heightMapLoad(file) {

	$.get(file,
		function(data) {

			var lines = data.split("\n");

			var counter = 0;

			for (var i = 0; i < lines.length; ++i) {

				var values = lines[i].split(" ");

				if (values[0] == "v") {

					var v = new THREE.Vector3();

					v.x = parseFloat(values[1]);
					v.y = parseFloat(values[2]);
					v.z = parseFloat(values[3]);

					heightVertices.push(v);
				}
				else  {

					var f = [];

					f.push(heightVertices[parseInt(values[1]) - 1]);
					f.push(heightVertices[parseInt(values[2]) - 1]);
					f.push(heightVertices[parseInt(values[3]) - 1]);
					f.push(heightVertices[parseInt(values[4]) - 1]);

					heightFaces.push(f);

					var negX = f[0].x;
					if (floatLessEqual(f[1].x, negX)) {

						negX = f[1].x;
					}
					if (floatLessEqual(f[2].x, negX)) {

						negX = f[2].x;
					}

					var negZ = f[0].z;
					if (floatLessEqual(f[1].z, negZ)) {

						negZ = f[1].z;
					}
					if (floatLessEqual(f[2].z, negZ)) {

						negZ = f[2].z;
					}

					var cx = negX + 25.0;
					var cz = negZ + 25.0;

					heightMap.push(new THREE.Vector2(cx, cz));
				}
			} 
		},
		'text');
}

function getHeightMapY(position) {

	//make the position as a 2d vector
	var pos = new THREE.Vector2(position.x, position.z);

	//find the four closet points
	var closest = 0;

	for (var i = 0; i < heightMap.length; ++i) {

		if (pos.distanceTo(heightMap[i]) <=
			pos.distanceTo(heightMap[closest])) {

			// /console.log("distance: " + pos.distanceTo(heightMap[closest]));

			closest = i;
		}
	}

	//console.log("closest: " + i);

	//look up the face in the table
	var face = heightFaces[closest];

	var negXnegZ = face[2];
	var negXposZ = face[3];
	var posXnegZ = face[1];
	var posXposZ = face[0];

	for (var i = 0; i < face.length; ++i) {

		if (face[i].x <= position.x && face[i].z <= position.z) {

			negXnegZ = face[i];
		}
		else if (face[i].x <= position.x && face[i].z >= position.z) {

			negXposZ = face[i];
		}
		else if (face[i].x >= position.x && face[i].z <= position.z) {

			posXnegZ = face[i];
		}
		else if (face[i].x >= position.x && face[i].z >= position.z) {

			posXposZ = face[i];
		}
	}


	// console.log("position: " + position.x + " " + position.y + " " + position.z);
	// console.log("negXnegZ: " + negXnegZ.x + " " + negXnegZ.y + " " + negXnegZ.z);
	// console.log("negXposZ: " + negXposZ.x + " " + negXposZ.y + " " + negXposZ.z);
	// console.log("posXnegZ: " + posXnegZ.x + " " + posXnegZ.y + " " + posXnegZ.z);
	// console.log("posXposZ: " + posXposZ.x + " " + posXposZ.y + " " + posXposZ.z);

	//calculate the distance along the z axis of the grid cell
	var lengthZ = negXposZ.z - negXnegZ.z;
	var percentZ;
	if (lengthZ <= 0.001 && lengthZ >= -0.001) {

		percentZ = 0;
	}
	else {

		percentZ = (position.z - negXnegZ.z) / lengthZ;
	}

	// if (percentZ < 0) {

	// 	percentZ = 0;
	// }

	//console.log("percent Z: " + percentZ);

	//create the line across the plane
	var crossY1 = ((1.0 - percentZ) * negXnegZ.y) + (percentZ * negXposZ.y);
	var crossY2 = ((1.0 - percentZ) * posXnegZ.y) + (percentZ * posXposZ.y);

	//calculate the distance along the x axis of the cell
	var lengthX = posXposZ.x - negXposZ.x;
	var percentX;
	if (lengthX <= 0.001 && lengthX >= -0.001) {

		percentX = 0;
	}
	else {

		percentX = (position.x - negXnegZ.x)  / lengthX;
	}

	if (percentX < 0) {

		percentX = 0;
	}

	console.log("length X: " + lengthX);
	console.log("percent X: " + percentX);

	return ((1.0 - percentX) * crossY1) + (percentX * crossY2);


	// //find the four closet points
	// var closest = [];
	// closest.push(initClosest);
	// closest.push(initClosest);
	// closest.push(initClosest);
	// closest.push(initClosest);

	// var closest3 = [];
	// closest3.push(heightMap[0]);
	// closest3.push(heightMap[0]);
	// closest3.push(heightMap[0]);
	// closest3.push(heightMap[0]);

	// var distance = [];
	// distance.push(pos.distanceTo(closest[0]));
	// distance.push(pos.distanceTo(closest[0]));
	// distance.push(pos.distanceTo(closest[0]));
	// distance.push(pos.distanceTo(closest[0]));


	// for (var i = 0; i < heightMap.length; ++i) {

	// 	var check = new THREE.Vector2(heightMap[i].x, heightMap[i].z);
	// 	var check3 = heightMap[i];

	// 	if (pos.distanceTo(check) <= distance[0]) {

	// 		var temp = closest[0];
	// 		var temp3 = closest3[0];

	// 		closest[0] = check;
	// 		closest3[0] = check3;
	// 		distance[0] = pos.distanceTo(closest[0]);

	// 		check = temp;
	// 		check3 = temp3;
	// 	}

	// 	if (pos.distanceTo(check) <= distance[1]) {

	// 		var temp = closest[1];
	// 		var temp3 = closest3[1];

	// 		closest[1] = check;
	// 		closest3[1] = check3;
	// 		distance[1] = pos.distanceTo(closest[1]);

	// 		check = temp;
	// 		check3 = temp3;
	// 	}
		
	// 	if (pos.distanceTo(check) <= distance[2]) {

	// 		var temp = closest[2];
	// 		var temp3 = closest3[2];

	// 		closest[2] = check;
	// 		closest3[2] = check3;
	// 		distance[2] = pos.distanceTo(closest[2]);

	// 		check = temp;
	// 		check3 = temp3;
	// 	}
		
	// 	if (pos.distanceTo(check) <= distance[3]) {

	// 		closest[3] = check;
	// 		closest3[3] = check3;
	// 		distance[3] = pos.distanceTo(closest[3]);
	// 	}
	// }

	// console.log("closest 0 : " + closest3[0].x + " " + closest3[0].y + " " + closest3[0].z);
	// console.log("closest 1 : " + closest3[1].x + " " + closest3[1].y + " " + closest3[1].z);
	// console.log("closest 2 : " + closest3[2].x + " " + closest3[2].y + " " + closest3[2].z);
	// console.log("closest 3 : " + closest3[3].x + " " + closest3[3].y + " " + closest3[3].z);

	// var negXnegZ = closest3[0];
	// var negXposZ = closest3[1];
	// var posXnegZ = closest3[2];
	// var posXposZ = closest3[3];
	// for (var i = 1; i < closest3.length; ++i) {

	// 	if (closest3[i].x < position.x && closest3[i].z <= position.z) {

	// 		negXnegZ = closest3[i];
	// 	}
	// 	else if (closest3[i].x <= position.x && closest3[i].z >= position.z) {

	// 		negXposZ = closest3[i];
	// 	}
	// 	else if (closest3[i].x >= position.x && closest3[i].z <= position.z) {

	// 		posXnegZ = closest3[i];
	// 	}
	// 	else if (closest3[i].x >= position.x && closest3[i].z >= position.z) {

	// 		posXposZ = closest3[i];
	// 	}
	// }

	// console.log("position: " + position.x + " " + position.y + " " + position.z);
	// // console.log("negXnegZ: " + negXnegZ.x + " " + negXnegZ.y + " " + negXnegZ.z);
	//  console.log("negXposZ: " + negXposZ.x + " " + negXposZ.y + " " + negXposZ.z);
	// // console.log("posXnegZ: " + posXnegZ.x + " " + posXnegZ.y + " " + posXnegZ.z);
	//  console.log("posXposZ: " + posXposZ.x + " " + posXposZ.y + " " + posXposZ.z);

	// //calculate the distance along the z axis of the grid cell
	// var lengthZ = negXposZ.z - negXnegZ.z;
	// var percentZ;
	// if (lengthZ <= 0.001 && lengthZ >= -0.001) {

	// 	percentZ = 0;
	// }
	// else {

	// 	percentZ = (position.z - negXnegZ.z) / lengthZ;
	// }

	// if (percentZ < 0) {

	// 	percentZ = 0;
	// }

	// //console.log("percent Z: " + percentZ);

	// //create the line across the plane
	// var crossY1 = ((1.0 - percentZ) * negXnegZ.y) + (percentZ * negXposZ.y);
	// var crossY2 = ((1.0 - percentZ) * posXnegZ.y) + (percentZ * posXposZ.y);

	// //calculate the distance along the x axis of the cell
	// var lengthX = posXposZ.x - negXposZ.x;
	// var percentX;
	// if (lengthX <= 0.001 && lengthX >= -0.001) {

	// 	percentX = 0;
	// }
	// else {

	// 	percentX = (position.x - negXnegZ.x)  / lengthX;
	// }

	// if (percentX < 0) {

	// 	percentX = 0;
	// }

	// console.log("length X: " + lengthX);
	// console.log("percent X: " + percentX);

	// return ((1.0 - percentX) * crossY1) + (percentX * crossY2);

	return 0;

	//return closest3[0].y;
}

function floatLessEqual(a, b) {

	if (a < b) {

		return true;
	}

	return a <= b + 0.001 && a >= b - 0.001;
}

function floatGreaterEqual(a, b) {

	if (a > b) {

		return true;
	}

	return a <= b + 0.001 && a >= b - 0.001;
}