class Array2D {
    constructor(xdim,ydim) {
        this.xdim = xdim;
        this.ydim = ydim;
        this.array = new Array(xdim*ydim).fill(null);
    }
    set(x,y,value) {
        this.array[x + y*this.xdim] = value;
    }
    get(x,y) {
        return this.array[x + y*this.xdim];
    }
}
function genNoiseMap(arr = new Array2D(100, 100), noiseLevel=4) {
    arr.set(0,0,80 + Math.round(Math.random()*90))
    for (let i = 0; i<arr.xdim; i++) {
        for (let j = 0; j<arr.ydim; j++) {
            let totalAdj = 0;
            let numAdj = 0;
            if (i > 0) {
                if (arr.get(i-1,j) != null) {
                    totalAdj += arr.get(i-1,j);
                    numAdj += 1;
                }
            }
            if (j > 0) {
                if (arr.get(i,j-1) != null) {
                    totalAdj += arr.get(i,j-1);
                    numAdj += 1;
                }
            }
            if (numAdj > 0) {
                let newHeight = Math.round((Math.random()-0.5)*noiseLevel + totalAdj/numAdj);
                if (newHeight > 255) {newHeight = 255;}
                if (newHeight < 0) {newHeight = 0;}
                arr.set(i,j,newHeight);
            }
        }

    }
    return arr;
}

function showNoiseMap(canvas, noiseMap)
{
    const context = canvas.getContext('2d')
    const imageData = context.createImageData(500,500);
    for (let i = 0; i<noiseMap.xdim; i++) {
        for (let j= 0; j<heightMap.ydim; j++) {
            imageData.data[4*(i + j*noiseMap.xdim)] = noiseMap.get(i,j);
            imageData.data[4*(i + j*noiseMap.xdim) + 1] = noiseMap.get(i,j);
            imageData.data[4*(i + j*noiseMap.xdim) + 2] = noiseMap.get(i,j);
            imageData.data[4*(i + j*noiseMap.xdim) + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}

let heightMap = genNoiseMap(new Array2D(500,500));
const heightCanv = document.getElementById('heightMap');
showNoiseMap(heightCanv, heightMap);

let tempMap = genNoiseMap(new Array2D(500,500, 5));
const tempCanv = document.getElementById('tempMap');
showNoiseMap(tempCanv, tempMap);

const fullCanv = document.getElementById('fullMap')
const fullContext = fullCanv.getContext('2d')
const fullImg = fullContext.createImageData(500,500);
for (let i = 0; i<heightMap.xdim; i++) {
    for (let j= 0; j<heightMap.ydim; j++) {
        if (heightMap.get(i,j) < 90)
        {
            fullImg.data[4*(i + j*heightMap.xdim) + 2] = 255;
        }
        else if ((tempMap.get(i,j) > 170) || (heightMap.get(i,j) < 93)) {
            fullImg.data[4*(i + j*heightMap.xdim)] = 163;
            fullImg.data[4*(i + j*heightMap.xdim) + 1] = 150;
            fullImg.data[4*(i + j*heightMap.xdim) + 2] = 76;
        }
        else {
            fullImg.data[4*(i + j*heightMap.xdim) + 1] = heightMap.get(i,j);
        }
        fullImg.data[4*(i + j*heightMap.xdim) + 3] = 255;
    }
}
fullContext.putImageData(fullImg, 0, 0);
