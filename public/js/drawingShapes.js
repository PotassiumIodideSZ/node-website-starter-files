var canvas = document.getElementById('canvas');
var parent = document.getElementById('canvas-wrapper');
var ctx = canvas.getContext('2d');
let undoStack = [];
let redoStack = [];

function drawShape(event, curShape, curColor) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (curShape === 'square') {
        drawSquare(x, y, curColor);
    } else if (curShape === 'triangle') {
        drawTriangle(x, y, curColor);
    } else if (curShape === 'circle') {
        drawCircle(x, y, curColor);
    } else {
        console.log('Invalid Shape.');
    }
    undoStack.push({ curShape: curShape, curColor: curColor, curX: x, curY: y });
}
function redrawShape(curShape, curColor, x, y) {

    if (curShape === 'square') {
        drawSquare(x, y, curColor);
    } else if (curShape === 'triangle') {
        drawTriangle(x, y, curColor);
    } else if (curShape === 'circle') {
        drawCircle(x, y, curColor);
    } else {
        console.log('Invalid Shape.');
    }
}
function removeLastShape() {
    if (undoStack != false){
        redoStack.push(undoStack.pop());
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
        undoStack.forEach(function(undoStack) {
            redrawShape(undoStack.curShape, undoStack.curColor, undoStack.curX, undoStack.curY);
        });
    }
}

function redrawLastShape(){
    if (redoStack != false){
        toRedraw = redoStack.pop();
        undoStack.push(toRedraw);
        redrawShape(toRedraw.curShape, toRedraw.curColor, toRedraw.curX, toRedraw.curY);
    }
}

function drawSquare(x, y, curColor) {
    var sideLength = 20;
    ctx.beginPath();
    ctx.rect(x - sideLength / 2, y - sideLength / 2, sideLength, sideLength);
    ctx.fillStyle = curColor;
    ctx.fill();
    ctx.stroke();
}

function drawTriangle(x, y, curColor) {
    var sideLength = 20;
    ctx.beginPath();
    ctx.moveTo(x, y - sideLength / 2);
    ctx.lineTo(x - sideLength / 2, y + sideLength / 2);
    ctx.lineTo(x + sideLength / 2, y + sideLength / 2);
    ctx.closePath();
    ctx.fillStyle = curColor;
    ctx.fill();
    ctx.stroke();
}

function drawCircle(x, y, curColor) {
    var radius = 20;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = curColor;
    ctx.fill();
    ctx.stroke();
}



window.addEventListener('resize', resizeCanvas, false);


function resizeCanvas() {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}
resizeCanvas();


document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyE') {
        removeLastShape();
    }
    if (event.code === 'KeyR') {
        redrawLastShape();
    }
    if (event.code === 'KeyC') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        undoStack = [];
        redoStack = [];
    }
});
