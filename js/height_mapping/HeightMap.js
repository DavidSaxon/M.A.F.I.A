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

	//console.log("get y");

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