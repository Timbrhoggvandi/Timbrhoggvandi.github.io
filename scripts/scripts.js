class Array2D {
    constructor(xdim,ydim,fillVal=null) {
        this.xdim = xdim;
        this.ydim = ydim;
        this.array = new Array(xdim*ydim).fill(fillVal);
    }
    set(x,y,value) {
        this.array[x + y*this.xdim] = value;
    }
    get(x,y) {
        return this.array[x + y*this.xdim];
    }
}

let xcanv = 500;
let ycanv = 250;

const myCanvas = document.querySelector('#myCanvas');
const ctx = myCanvas.getContext('2d');
const myImage = ctx.createImageData(xcanv,ycanv);
ctx.canvas.width  = xcanv;
ctx.canvas.height = ycanv;

let curX;
let curY;
let pressed = false;

myCanvas.onmousedown = function() {
    pressed = true;
};
  
myCanvas.onmouseup = function() {
    pressed = false;
}

document.onmousemove = function(e) {
    var rect = myCanvas.getBoundingClientRect();
    scaleX = myCanvas.width / rect.width;
    scaleY = myCanvas.height / rect.height;

    curX = (e.clientX - rect.left) * scaleX;
    curY = (e.clientY - rect.top) * scaleY;
}

function changeBrush(brushNum) {
    brush = brushNum;
}
function changeBrushSize(size) {
    brushSize = size;
}

function loop() {
    if (pressed === true) {
        gameWorld.set(curX,curY,brush);
        if (brushSize === 2) {
            gameWorld.set(curX+1,curY,brush);
            gameWorld.set(curX-1,curY,brush);
            gameWorld.set(curX,curY+1,brush);
            gameWorld.set(curX,curY-1,brush);
        }
    }
    updateGameWorld();
    putToCanvas();
    ctx.putImageData(myImage,0,0);
    requestAnimationFrame(loop);
}

function checkDown(num) {
    if (gameWorld.get(i,j+1) === 0) {
        gameWorld.set(i,j,0);
        gameWorld.set(i,j+1,num);
    }
}

function checkDiag(num) {
    if (gameWorld.get(i+1,j+1) === 0) {
        gameWorld.set(i,j,0);
        gameWorld.set(i+1,j+1,num);
    }
    else if (gameWorld.get(i-1,j+1) === 0) {
        gameWorld.set(i,j,0);
        gameWorld.set(i-1,j+1,num);
    }
}

function checkSide(num) {
    if ((gameWorld.get(i-1,j) === 0) && (gameWorld.get(i+1,j) === 0)) {
        if (Math.random() > 0.5) {
            gameWorld.set(i,j,0);
            gameWorld.set(i-1,j,num);
        }
        else {
            gameWorld.set(i,j,0);
            gameWorld.set(i+1,j,num);
        }
    }
    else if (gameWorld.get(i-1,j) === 0) {
        gameWorld.set(i,j,0);
        gameWorld.set(i-1,j,num);
    }
    else if (gameWorld.get(i+1,j) === 0) {
        gameWorld.set(i,j,0);
        gameWorld.set(i+1,j,num);
    }
}

function checkPixels(i,j,pixelUpdated) {
    if (pixelUpdated.get(i,j) === 0) {
        switch(gameWorld.get(i,j)) {
            case 0:
                break;

            case 1:
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,1);
                    pixelUpdated.set(i,j+1),1;
                }
                else if (gameWorld.get(i+1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j+1,1);
                    pixelUpdated.set(i+1,j+1,1);
                }
                else if (gameWorld.get(i-1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j+1,1);
                    pixelUpdated.set(i-1,j+1,1);
                }
                else if (gameWorld.get(i,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i,j+1,1);
                    pixelUpdated.set(i,j+1,1);
                }
                else if (gameWorld.get(i+1,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i+1,j+1,1);
                    pixelUpdated.set(i+1,j+1,1);
                }
                else if (gameWorld.get(i-1,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i-1,j+1,1);
                    pixelUpdated.set(i-1,j+1,1);
                }
                break;

            case 2:
                const directionTest = Math.random();
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,2);
                    pixelUpdated.set(i,j+1,1);
                }
                else if ((gameWorld.get(i+1,j+1) === 0) && (directionTest < 0.5)) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j+1,2);
                    pixelUpdated.set(i+1,j+1,1);
                }
                else if ((gameWorld.get(i-1,j+1) === 0) && (directionTest > 0.5)) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j+1,2);
                    pixelUpdated.set(i-1,j+1,1);
                }
                else if (directionTest > 0.5) {
                    if (gameWorld.get(i+1,j) === 0) {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i+1,j,2);
                        pixelUpdated.set(i+1,j,1);
                    }
                    else if (gameWorld.get(i-1,j) === 0) {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i-1,j,2);
                        pixelUpdated.set(i-1,j,1);
                    }
                }
                else {
                    if ((gameWorld.get(i-1,j) === 0)) {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i-1,j,2);
                        pixelUpdated.set(i-1,j,1);
                    }
                    else if (gameWorld.get(i+1,j) === 0) {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i+1,j,2);
                        pixelUpdated.set(i+1,j,1);
                    }
                }
                break;

            case 3:
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,3);
                }
                else if (gameWorld.get(i,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i,j+1,3);
                }
                break;

            case 4:
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,4);
                }
                else if (gameWorld.get(i+1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j+1,4);
                }
                else if (gameWorld.get(i-1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j+1,4);
                }
                else if (gameWorld.get(i,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i,j+1,4);
                }
                else if (gameWorld.get(i+1,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i+1,j+1,4);
                }
                else if (gameWorld.get(i-1,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i-1,j+1,4);
                }
                break;

            case 5:
                if (Math.random() < 0.09) {
                    if (gameWorld.get(i,j+1) == 4 || gameWorld.get(i,j+1) == 6) {
                        gameWorld.set(i,j+1,5);
                    }
                    if (gameWorld.get(i,j-1) == 4 || gameWorld.get(i,j-1) == 6) {
                        gameWorld.set(i,j-1,5);
                    }
                    if (gameWorld.get(i+1,j) == 4 || gameWorld.get(i+1,j) == 6) {
                        gameWorld.set(i+1,j,5);
                    }
                    if (gameWorld.get(i-1,j) == 4 || gameWorld.get(i-1,j) == 6) {
                        gameWorld.set(i-1,j,5);
                    }
                }
                if (Math.random() < 0.025) {
                    gameWorld.set(i,j,0);
                }
                break;
                
            case 6:
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,6);
                }
                else if (gameWorld.get(i+1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j+1,6);
                }
                else if (gameWorld.get(i-1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j+1,6);
                }
                else if ((gameWorld.get(i-1,j) === 0) && (gameWorld.get(i+1,j) === 0)) {
                    if (Math.random() > 0.5) {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i-1,j,6);
                    }
                    else {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i+1,j,6);
                    }
                }
                else if (gameWorld.get(i-1,j) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j,6);
                }
                else if (gameWorld.get(i+1,j) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j,6);
                }
                break;
        }
    }
}

let gameWorld = new Array2D(xcanv,ycanv,0);
let passDirection = 1;
function updateGameWorld() {
    console.log(passDirection);
    let pixelUpdated = new Array2D(xcanv,ycanv,0);
    for (j = gameWorld.ydim - 1; j>-1; j--) {
        if (passDirection === 1) {
            for (i = 0; i<gameWorld.xdim; i++) {
                checkPixels(i,j,pixelUpdated);
            }
        }
        else {
            for (i = gameWorld.xdim; i>-1; i--) {
                checkPixels(i,j,pixelUpdated);
            }
        }
    }
    passDirection = -passDirection;
}

function putToCanvas() {
    for (let i = 0; i<gameWorld.xdim; i++) {
        for (let j= 0; j<gameWorld.ydim; j++) {
            switch(gameWorld.get(i,j)) {

            case 1:
                myImage.data[4*(i + j*gameWorld.xdim)] = 232;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 188;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 77;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
                break;
            case 2:
                myImage.data[4*(i + j*gameWorld.xdim)] = 0;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 0;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 255;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
                break;
            case 3:
                myImage.data[4*(i + j*gameWorld.xdim)] = 94;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 93;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 92;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
                break;
            case 4:
                myImage.data[4*(i + j*gameWorld.xdim)] = 31;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 30;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 29;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
                break;
            case 6:
                myImage.data[4*(i + j*gameWorld.xdim)] = 20;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 25;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 20;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
                break;
            case 5:
                myImage.data[4*(i + j*gameWorld.xdim)] = 185 + Math.random()*68;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 104 + Math.random()*20;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 45;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
                break;
            default:
                myImage.data[4*(i + j*gameWorld.xdim)] = 30;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 140;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 255;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            
            }
        }
    }
}

brush = 1;
brushSize = 1;
loop();
