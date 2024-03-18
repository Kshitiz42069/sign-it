const colorPicker = document.getElementById("colorPicker");
const colorCanvas = document.getElementById("colorCanvas");
const fontSize = document.getElementById("font_size");
const canvas = document.getElementById("mycanvas");
const clear = document.getElementById("clearbtn");
const save = document.getElementById("savebtn");
const retrieve = document.getElementById("retrievebtn");

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

retrieve.addEventListener('click',()=>{
    let savedcanvas = localStorage.getItem('canvasContents');
    if(savedcanvas){
        let img = new Image();
        img.src = savedcanvas;
        ctx.drawImage(img,0,0);
    }
})

canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})
canvas.addEventListener("mouseup",(e)=>{
    isDrawing = false;
})

fontSize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
})

colorCanvas.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
})

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY
    }
})

clear.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

save.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'my-canvas.png';

    link.href = canvas.toDataURL();
    link.click();
})