// Complete the matrixRotation function below.

let matrix = [
  [1, 2, 3, 4],
  [12, 1, 2, 5],
  [11, 4, 3, 6],
  [10, 9, 8, 7]
];


function *makeWalker (p1, p2) {
	let dx = 0 ;
	let dy = 1 ;
	let elementsInSlice = ( ( (p2[0] - p1[0] + 1) + (p2[1] - p1[1] + 1) )  * 2 - 4 );

	let x = p1[0];
	let y = p1[1];
	
	while (elementsInSlice > 0) {
	  elementsInSlice--;
	  yield [x,y];
		x = x + dx; y = y + dy;
		if (x < p1[0] || x>p2[0] || y<p1[1] || y>p2[1]) {
			x = x - dx; y = y - dy;
			if (dy == 1 && dx == 0) { dy = 0; dx = 1}
			 else if (dy == 0 && dx == 1) {dy = -1; dx = 0}
			   else if (dy == -1 && dx == 0) {dy = 0; dx = -1}
			     else {dy = 1; dx = 0}	
			x = x + dx; y = y + dy;
		}
	}
}

function rotateSlice(p1, p2, matrix, r) { 
    let elementsInSlice = ( ( (p2[0] - p1[0] + 1) + (p2[1] - p1[1] + 1) )  * 2 - 4 );  
    let realRotationsForSlice = r;

    if (elementsInSlice <= r) realRotationsForSlice = r % elementsInSlice;
    if (realRotationsForSlice == 0) return;

    let rotationOffset = elementsInSlice - realRotationsForSlice;
    let walker = makeWalker(p1, p2);
    let path = [...walker];
    let rotatedElements = path.map(([x,y]) => matrix[y][x])
      .map((_, i, slice) => slice[(i + rotationOffset) % elementsInSlice]);

    path.forEach(([x,y], i) => matrix[y][x]=rotatedElements[i]);
}

function matrixRotation(matrix, r) {
  //p = [x,y]
  let p1 = [0, 0]
  let p2 = [matrix[0].length - 1, matrix.length - 1]
  while ((p1[0] < p2[0]) && (p1[1] < p2[1])) {
    rotateSlice(p1, p2, matrix, r);
    p1 = p1.map(e => e + 1)
    p2 = p2.map(e => e - 1)
  }
}

matrixRotation(matrix, 2);

matrix.forEach(row => console.log(row.join(' ')))

matrix = [
  [1, 2, 3, 4],
  [7, 8, 9, 10],
  [13, 14, 15, 16],
  [19, 20, 21, 22],
  [25, 26, 27, 28]
]

matrixRotation(matrix, 7);

matrix.forEach(row => console.log(row.join(' ')))
