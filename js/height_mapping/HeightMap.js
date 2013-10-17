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
				else if (values[0] == "f") {

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

			game.readyHeightMap(getHeightMapY);
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

			closest = i;
		}
	}

	//look up the face in the table
	var face = heightFaces[closest];

	var negXnegZ = face[2];
	var negXposZ = face[0];
	var posXnegZ = face[0];
	var posXposZ = face[0];

	//find the least values
	var negX = face[0].x;
	if (floatLessEqual(face[1].x, negX)) {

		negX = face[1].x;
	}
	if (floatLessEqual(face[2].x, negX)) {

		negX = face[2].x;
	}

	var posX = face[0].x;
	if (greaterThanOne(face[1].x, negX)) {

		posX = face[1].x;
	}
	if (greaterThanOne(face[2].x, negX)) {

		posX = face[2].x;
	}

	var negZ = face[0].z;
	if (floatLessEqual(face[1].z, negZ)) {

		negZ = face[1].z;
	}
	if (floatLessEqual(face[2].z, negZ)) {

		negZ = face[2].z;
	}

	var posZ = face[0].z;
	if (greaterThanOne(face[1].z, negZ)) {

		posZ = face[1].z;
	}
	if (greaterThanOne(face[2].z, negZ)) {

		posZ = face[2].z;
	}

	//find the ordered square
	for (var i = 0; i < face.length; ++i) {

		if (withinOne(face[i].x, negX) && withinOne(face[i].z, negZ)) {

			negXnegZ = face[i];
		}
		if (withinOne(face[i].x, negX) && withinOne(face[i].z, posZ)) {

			negXposZ = face[i];
		}
		if (withinOne(face[i].x, posX) && withinOne(face[i].z, negZ)) {

			posXnegZ = face[i]; 
		}
		if (withinOne(face[i].x, posX) && withinOne(face[i].z, posZ)) {

			posXposZ = face[i];
		}
	}

	//calculate the distance along the z axis of the grid cell
	var lengthZ = negXposZ.z - negXnegZ.z;
	var percentZ;
	if (lengthZ <= 0.001 && lengthZ >= -0.001) {

		percentZ = 0;
	}
	else {

		percentZ = (position.z - negXnegZ.z) / lengthZ;
	}

	if (percentZ < 0) {

		percentZ = 0;
	}

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

	return ((1.0 - percentX) * crossY1) + (percentX * crossY2);
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

function withinOne(a, b) {

	return (a > b - 1 && a < b + 1);
}

function greaterThanOne(a, b) {

	return a > b + 1;
}