const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 25;
let socket = io.connect('http://localhost:3000/');

socket.on('mouse', newDrawing);

ctx.fillRect(0, 0, canvas.width, canvas.height);
let dragging = false;

canvas.addEventListener('mousedown', function() {
    dragging = true;
});
canvas.addEventListener('mouseup', function() {
    dragging = false;
});

function newDrawing(data) {
    ctx.fillStyle = "violet";
    ctx.fillRect(data.x, data.y, width, width);
}

canvas.addEventListener('mousemove', function(mouse) {
    if (dragging) {
        ctx.fillStyle = "white";
        
        let x = mouse.x-5;
        let y = mouse.y-5;
        
        ctx.fillRect(x, y, width, width);
        let data = {x, y};

        socket.emit('mouse', data);
    }
});