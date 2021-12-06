let myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';
document.getElementById('scuffed').onclick = function() {
    alert('Ouch! Stop poking me!');
}
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/testimage1.jpg') {
        myImage.setAttribute('src', 'images/testimage2.jpg');
    } else {
        myImage.setAttribute('src', 'images/testimage1.jpg')
    }
}

let myButton = document.querySelector('button')

function setUserName() {
    let myName = prompt('enter your name');
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem('userName', myName);
        myHeading.textContent = 'Hello World ' + myName;
    }
}

if(!localStorage.getItem('userName')) {
    setUserName();
} else {
    let myName = localStorage.getItem('userName');
    myHeading.textContent = 'Hello World ' + myName;
}

myButton.onclick = function() {
    setUserName();
}