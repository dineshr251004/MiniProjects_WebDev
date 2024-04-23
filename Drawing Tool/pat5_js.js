window.addEventListener('load', () => {
    const box = document.getElementById('box');
    const context = box.getContext('2d');
    const colpal = document.getElementById('pal');
    const bsize = document.getElementById('brush');
    const undobut = document.getElementById('undo');
    const redobut = document.getElementById('redo');
    
    let colors = ['red', 'blue', 'green','black','#f2f2f2','aqua','yellow','orange']; 
    let curc = colors[0];
    let drw = false;
    let hist = [];
    let histind = -1;
    
    function chgcolor(col) {
        curc = col;
    }
    
    function chgbsize(size) {
        context.lineWidth = size;
    }
    
    function startdr(event) {
        drw = true;
        context.beginPath();
        context.moveTo(event.clientX - box.offsetLeft, event.clientY - box.offsetTop);
    }
    
    function draw(event) {
        if (!drw){
            return;
        }
        context.lineTo(event.clientX - box.offsetLeft, event.clientY - box.offsetTop);
        context.strokeStyle = curc;
        context.stroke();
    }
    
    function stopdr() {
        if (!drw){
            return;
        }
        context.closePath();
        drw = false;
        svstate();
    }
    
    function svstate() {
        hist = hist.slice(0, histind + 1);
        hist.push(box.toDataURL());
        histind++;
    }
    
    function undo() {
        if (histind <= 0){
            return;
        }
        histind--;
        const image = new Image();
        image.src = hist[histind];
        image.onload = () => {
            context.clearRect(0, 0, box.width, box.height);
            context.drawImage(image, 0, 0);
        };
    }
    
    function redo() {
        if (histind >= hist.length - 1) return;
        histind++;
        const image = new Image();
        image.src = hist[histind];
        image.onload = () => {
            context.clearRect(0, 0, box.width, box.height);
            context.drawImage(image, 0, 0);
        };
    }
    
    box.addEventListener('mousedown', startdr);
    box.addEventListener('mousemove', draw);
    box.addEventListener('mouseup', stopdr);
    box.addEventListener('mouseout', stopdr);
    
    colpal.addEventListener('click', (event) => {
        if (event.target.classList.contains('color')) {
            chgcolor(event.target.style.backgroundColor);
        }
    });
    
    bsize.addEventListener('input', () => {
        chgbsize(bsize.value);
    });
    
    undobut.addEventListener('click', undo);
    redobut.addEventListener('click', redo);
});

