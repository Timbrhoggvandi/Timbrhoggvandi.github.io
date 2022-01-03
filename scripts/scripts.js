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

let xcanv = 600;
let ycanv = 300;

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

function changeBrush() {
    if (brush === 1) {
        brush = 2;
    }
    else if (brush === 2) {
        brush = 3;
    }
    else if (brush === 3) {
        brush = 4;
    }
    else if (brush === 4) {
        brush = 5;
    }
    else if (brush === 5)
    {
        brush = 31;
    }
    else {
        brush = 1;
    }
}

function loop() {
    if (pressed === true) {
        gameWorld.set(curX,curY,brush);
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

let gameWorld = new Array2D(xcanv,ycanv,0);
function updateGameWorld() {
    for (j = gameWorld.ydim - 1; j>-1; j--) {
        for (i = 0; i<gameWorld.xdim; i++) {
            if (gameWorld.get(i,j) === 1) {
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,1);
                }
                else if (gameWorld.get(i+1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j+1,1);
                }
                else if (gameWorld.get(i-1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j+1,1);
                }
                else if (gameWorld.get(i,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i,j+1,1);
                }
                else if (gameWorld.get(i+1,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i+1,j+1,1);
                }
                else if (gameWorld.get(i-1,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i-1,j+1,1);
                }
            }
            if (gameWorld.get(i,j) === 2) {
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,2);
                }
                else if (gameWorld.get(i+1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j+1,2);
                }
                else if (gameWorld.get(i-1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j+1,2);
                }
                else if ((gameWorld.get(i-1,j) === 0) && (gameWorld.get(i+1,j) === 0)) {
                    if (Math.random() > 0.5) {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i-1,j,2);
                    }
                    else {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i+1,j,2);
                    }
                }
                else if (gameWorld.get(i-1,j) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j,2);
                }
                else if (gameWorld.get(i+1,j) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j,2);
                }
            }
            if (gameWorld.get(i,j) === 3) {
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,3);
                }
                else if (gameWorld.get(i,j+1) === 2) {
                    gameWorld.set(i,j,2);
                    gameWorld.set(i,j+1,3);
                }

            }
            if (gameWorld.get(i,j) === 4) {
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
            }
            if (gameWorld.get(i,j) === 5) {
                if (gameWorld.get(i,j+1) == 4 || gameWorld.get(i,j+1) == 31) {
                    gameWorld.set(i,j+1,5);
                }
                if (gameWorld.get(i,j-1) == 4 || gameWorld.get(i,j-1) == 31) {
                    gameWorld.set(i,j-1,5);
                }
                if (gameWorld.get(i+1,j) == 4 || gameWorld.get(i+1,j) == 31) {
                    gameWorld.set(i+1,j,5);
                }
                if (gameWorld.get(i-1,j) == 4 || gameWorld.get(i-1,j) == 31) {
                    gameWorld.set(i-1,j,5);
                }
                gameWorld.set(i,j,6);
            }
            if ((gameWorld.get(i,j) > 5) && (gameWorld.get(i,j) < 31)) {
                gameWorld.set(i,j,gameWorld.get(i,j) + 1);
                if (gameWorld.get(i,j) > 30) {
                    gameWorld.set(i,j,0);
                }
            }
            if (gameWorld.get(i,j) === 31) {
                if (gameWorld.get(i,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i,j+1,31);
                }
                else if (gameWorld.get(i+1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j+1,31);
                }
                else if (gameWorld.get(i-1,j+1) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j+1,31);
                }
                else if ((gameWorld.get(i-1,j) === 0) && (gameWorld.get(i+1,j) === 0)) {
                    if (Math.random() > 0.5) {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i-1,j,31);
                    }
                    else {
                        gameWorld.set(i,j,0);
                        gameWorld.set(i+1,j,31);
                    }
                }
                else if (gameWorld.get(i-1,j) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i-1,j,31);
                }
                else if (gameWorld.get(i+1,j) === 0) {
                    gameWorld.set(i,j,0);
                    gameWorld.set(i+1,j,31);
                }
            }
            
        }
    }

}

function putToCanvas() {
    for (let i = 0; i<gameWorld.xdim; i++) {
        for (let j= 0; j<gameWorld.ydim; j++) {
            if (gameWorld.get(i,j) === 1)
            {
                myImage.data[4*(i + j*gameWorld.xdim)] = 232;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 188;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 77;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            }
            else if (gameWorld.get(i,j) === 2) {
                myImage.data[4*(i + j*gameWorld.xdim)] = 0;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 0;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 255;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            }
            else if (gameWorld.get(i,j) === 3) {
                myImage.data[4*(i + j*gameWorld.xdim)] = 94;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 93;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 92;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            }
            else if (gameWorld.get(i,j) === 4) {
                myImage.data[4*(i + j*gameWorld.xdim)] = 31;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 30;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 29;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            }
            else if (gameWorld.get(i,j) === 31) {
                myImage.data[4*(i + j*gameWorld.xdim)] = 20;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 25;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 20;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            }
            else if (gameWorld.get(i,j) > 4) {
                myImage.data[4*(i + j*gameWorld.xdim)] = 185 + Math.random()*68;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 104 + Math.random()*20;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 45;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            }
            else {
                myImage.data[4*(i + j*gameWorld.xdim)] = 30;
                myImage.data[4*(i + j*gameWorld.xdim) + 1] = 140;
                myImage.data[4*(i + j*gameWorld.xdim) + 2] = 255;
                myImage.data[4*(i + j*gameWorld.xdim) + 3] = 255;
            }
        }
    }
}

brush = 1;
loop();
