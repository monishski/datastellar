// ------------------- Desktop Scroll Logic ----------------

// https://stackoverflow.com/questions/55601867/how-to-change-section-on-scroll
let sections = document.getElementsByTagName('section');
let listElements = [...document.getElementsByTagName('li')].slice(1);
// console.log(listElements)
// tracks index of current section
let currentIndex = 0;

function up(currentIndex, sections, listElements) {
    sections[currentIndex].className = 'solutions__content';
    listElements[currentIndex].className = '';
    currentIndex--;
    sections[currentIndex].className = 'solutions__content active';
    listElements[currentIndex].className = 'highlighted';
    return currentIndex
}

function down(currentIndex, sections, listElements) {
    sections[currentIndex].className = 'solutions__content';
    listElements[currentIndex].className = '';
    currentIndex++;
    sections[currentIndex].className = 'solutions__content active';
    listElements[currentIndex].className = 'highlighted';
    return currentIndex
}

document.addEventListener('wheel', e => {
    if (e.wheelDeltaY>0 && currentIndex-1>=0) {
        currentIndex = up(currentIndex, sections, listElements)
    } else if (e.wheelDeltaY<0 && currentIndex+1<sections.length) {
        currentIndex = down(currentIndex, sections, listElements)
    }
});

document.addEventListener('keydown', e => {
    const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (key==="ArrowUp" && currentIndex-1>=0) {
        // Up button pressed
        currentIndex = up(currentIndex, sections, listElements)
    } else if (key==="ArrowDown" && currentIndex+1<sections.length) {
        // Down button pressed
        currentIndex = down(currentIndex, sections, listElements)
    }
});

// ------------------- Mobile Devices Scroll Logic ----------------

//https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
// var xDown = null;                                                        
var yDown = null;

function getTouches(e) {
    return e.touches || e.originalEvent.touches;
}   

document.addEventListener('touchstart', e => {
    const firstTouch = getTouches(e)[0];                                      
    yDown = firstTouch.clientY;                                      
});        

document.addEventListener('touchmove', e => {
    if (!yDown) {
        return;
    }

    var yUp = e.touches[0].clientY;
    var yDiff = yDown - yUp;

    if (yDiff>0 && currentIndex+1<sections.length) { 
        currentIndex = down(currentIndex, sections, listElements) //down swipe
    } else if (yDiff<0 && currentIndex-1>=0) { 
        currentIndex = up(currentIndex, sections, listElements) //up swipe
    }                                                                 
    
    // reset value
    yDown = null;                                             
})