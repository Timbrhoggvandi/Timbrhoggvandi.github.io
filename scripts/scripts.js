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

function smooth2DArray(arr, noiseLevel = 0) {
    for (i = 0; i<arr.xdim; i++) {
        for (j = 0; j<arr.ydim; j++) {
            let totalAdj = arr.get(i,j);
            let numAdj = 1;
            if (i>0) {
                totalAdj += arr.get(i-1,j);
                numAdj += 1;
                if (j>0) {
                    totalAdj += arr.get(i-1,j-1);
                    numAdj += 1;
                }
                if (j<arr.ydim-1) {
                    totalAdj += arr.get(i-1,j+1);
                    numAdj += 1;
                }
            }
            else if (i<arr.xdim-1) {
                totalAdj += arr.get(i+1,j);
                numAdj += 1;
                if (j>0) {
                    totalAdj += arr.get(i+1,j-1);
                    numAdj += 1;
                }
                if (j<arr.ydim-1) {
                    totalAdj += arr.get(i+1,j+1);
                    numAdj += 1;
                }
            }
            if (j>0) {
                totalAdj += arr.get(i,j-1);
                numAdj += 1;
            }
            else if (j<arr.ydim-1) {
                totalAdj += arr.get(i,j+1);
                numAdj += 1;
            }
            let finalNum = Math.round(noiseLevel*(Math.random() - 0.5) + totalAdj/numAdj);
            arr.set(i,j,finalNum);
        }
    }
    return arr;
}


function genNoiseMapAlternate(arr = new Array2D(100,100), noiseLevel = 4, passes = 4) {
    arr= genNoiseMap1(arr);
    const newArr = genNoiseMap1(new Array2D(arr.xdim, arr.ydim));
    for (i = 0; i<arr.xdim; i++) {
        for (j = 0; j<arr.ydim; j++) {
            const newVal = Math.round((arr.get(i,j) + newArr.get(arr.xdim-1-i,j))/3);
            arr.set(i,j,newVal);
        }
    }
    arr = smooth2DArray(arr);
    return arr;
}

function genNoiseMap(arr = new Array2D(100, 100), noiseLevel=7) {
    let nm1 = genNoiseMap1(arr, noiseLevel);
    let nm2 = genNoiseMap2(new Array2D(arr.xdim,arr.ydim), noiseLevel+2);
    for (i=0; i<arr.xdim; i++) {
        for (j=0; j<arr.ydim; j++) {
            nm1.set(i,j,Math.round((nm1.get(i,j) + nm2.get(i,j))/2));
        }
    }
    nm1 = smooth2DArray(nm1);
    return nm1;
}

function genNoiseMap1(arr = new Array2D(100, 100), noiseLevel=4) {
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

function genNoiseMap2(arr = new Array2D(100,100), noiseLevel=4) {
    arr.set(0,0,80 + Math.round(Math.random()*90))
    for (i=1; i<arr.xdim; i++) {
        let newHeight = Math.round((Math.random()-0.5)*noiseLevel + arr.get(i-1,0));
        arr.set(i,0,newHeight);
    }
    for (j=1; j<arr.ydim; j++) {
        let totalAdj = 0;
        let numAdj = 0;
        for (i=0; i<arr.xdim; i++) {
            totalAdj += arr.get(i,j-1)
            numAdj += 1;
            if (i > 0) {
                totalAdj += arr.get(i-1,j-1);
                numAdj += 1;
            }
            if (i < (arr.xdim - 1)) {
                totalAdj += arr.get(i+1,j-1);
                numAdj += 1;
            }
            let newHeight = Math.round((Math.random()-0.5)*noiseLevel + totalAdj/numAdj);
            if (newHeight > 255) {newHeight = 255;}
            if (newHeight < 0) {newHeight = 0;}
            arr.set(i,j,newHeight);
        }
    }
    return arr;
}

function iterationNoiseMap(arr = new Array2D(100,100), noiseLevel=50, iterations=30) {
    arr.array.fill(Math.round(Math.random()*100 + 78));
    for (it=0; it<iterations; it++) {
        addNoise(arr, noiseLevel);
        addNoise(arr, noiseLevel);
        smooth2DArray(arr);
        smooth2DArray(arr);
    }
    return arr;
}


function addNoise(arr, noiseLevel = 10) {
    for (i = 0; i<arr.xdim; i++) {
        for (j = 0; j<arr.ydim; j++) {
            const newHeight = Math.round(arr.get(i,j) + (Math.random()-0.5)*noiseLevel);
            arr.set(i,j,newHeight);
        }
    }
}

function genNoiseMapScaled(arr = new Array2D(100,100)) {
    let newArr = new Array2D(arr.xdim+10,arr.ydim+10);
    for (i = 0; i<newArr.xdim; i++) {
        for (j = 0; j<newArr.ydim; j++) {
            newArr.set(i,j,Math.random()*255);
        }
    }
    smooth2DArray(newArr);
    for (i = 0; i<arr.xdim; i++) {
        for (j = 0; j<arr.ydim; j++) {
            totalAdj = 0;
            for (a=-5; a<6; a++) {
                for (b=-5; b<6; b++) {
                    totalAdj += newArr.get(i+a+5,j+b+5);
                }
            }
            arr.set(i,j,totalAdj/81);
        }
    }
    smooth2DArray(arr);
    arr = scale2DArray(arr);
    smooth2DArray(arr);
    return arr;
}

function scale2DArray(arr,min,max) {
    let minVal = arr.get(0,0);
    let maxVal = arr.get(0,0);
    for (i = 0; i<arr.xdim; i++) {
        for (j = 0; j<arr.ydim; j++) {
            if (arr.get(i,j) < minVal) {
                minVal = arr.get(i,j);
            }
            if (arr.get(i,j) > maxVal) {
                maxVal = arr.get(i,j);
            }
        }
    }
    for (i = 0; i<arr.xdim; i++) {
        for (j = 0; j<arr.ydim; j++) {
            arr.set(i,j,(arr.get(i,j)-minVal)*(255/(maxVal-minVal)));
        }
    }
    return arr;
}


function showNoiseMap(canvas, noiseMap)
{
    const context = canvas.getContext('2d')
    const imageData = context.createImageData(xdim,ydim);
    for (let i = 0; i<noiseMap.xdim; i++) {
        for (let j= 0; j<noiseMap.ydim; j++) {
            imageData.data[4*(i + j*noiseMap.xdim)] = noiseMap.get(i,j);
            imageData.data[4*(i + j*noiseMap.xdim) + 1] = noiseMap.get(i,j);
            imageData.data[4*(i + j*noiseMap.xdim) + 2] = noiseMap.get(i,j);
            imageData.data[4*(i + j*noiseMap.xdim) + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}

const xdimField = document.getElementById('xdim');
const ydimField = document.getElementById('ydim');
const instructions = document.getElementById('instructions')
let xdim = 500;
let ydim = 500;

function generateMaps() {
    xdim = parseInt(xdimField.value);
    ydim = parseInt(ydimField.value);
    if (xdim > 0 && ydim > 0) {
        instructions.textContent = 'Enter the dimensions of the world';
        heightMap = genNoiseMapScaled(new Array2D(xdim,ydim));
        tempMap = genNoiseMapScaled(new Array2D(xdim,ydim));
        heightCanv.width = xdim;
        heightCanv.height = ydim;
        tempCanv.width = xdim;
        tempCanv.height = ydim;
        fullCanv.width = xdim;
        fullCanv.height = ydim;
        showNoiseMap(heightCanv, heightMap);
        showNoiseMap(tempCanv, tempMap);
        showFullMap();
    }
    else {
        instructions.textContent = 'Dimensions must be integers greater than 0!';
    }

}

const heightCanv = document.getElementById('heightMap');
const tempCanv = document.getElementById('tempMap');
const fullCanv = document.getElementById('fullMap');
generateMaps();

function showFullMap() {
    const fullContext = fullCanv.getContext('2d')
    const fullImg = fullContext.createImageData(xdim,ydim);
    for (let i = 0; i<heightMap.xdim; i++) {
        for (let j= 0; j<heightMap.ydim; j++) {
            if (heightMap.get(i,j) < 93)
            {
                fullImg.data[4*(i + j*heightMap.xdim) + 2] = heightMap.get(i,j) + 150;
            }
            else if ((tempMap.get(i,j) > 165) || (heightMap.get(i,j) < 94)) {
                fullImg.data[4*(i + j*heightMap.xdim)] = Math.round(155 + 0.04*heightMap.get(i,j));
                fullImg.data[4*(i + j*heightMap.xdim) + 1] = Math.round(147+ 0.03*heightMap.get(i,j));
                fullImg.data[4*(i + j*heightMap.xdim) + 2] = Math.round(60+ 0.02*heightMap.get(i,j));
            }
            else {
                fullImg.data[4*(i + j*heightMap.xdim) + 1] = heightMap.get(i,j);
            }
            if (heightMap.get(i,j) > 200 || tempMap.get(i,j) < 60) {
                fullImg.data[4*(i + j*heightMap.xdim)] = 230;
                fullImg.data[4*(i + j*heightMap.xdim) + 1] = 230;
                fullImg.data[4*(i + j*heightMap.xdim) + 2] = 230;
            }
            fullImg.data[4*(i + j*heightMap.xdim) + 3] = 255;
        }
    }
    fullContext.putImageData(fullImg, 0, 0);
}