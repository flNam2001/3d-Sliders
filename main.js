// biến toàn cục có thể thay đổi
const radius = 240 // đường kính vòng tròn
let autoRotate = true // tự động xoay(true) or không(false)
const rotateSpeed = -60 // giây/360deg
const imgWidth = 120 // chiều dài
const imgHeight = 170 // chiều rộng

//======================Start==========================
setTimeout(init, 1000)

const odrag = document.getElementById('drag-container')
const ospin = document.getElementById('spin-container')
const aImg = ospin.getElementsByTagName('img')
const aVid = ospin.getElementsByTagName('video')
const aEle = [...aImg, ...aVid] // hợp 2 mảng lại

// set size of image

ospin.style.width = imgWidth + 'px' //dài
ospin.style.height = imgHeight + 'px' //rộng

// size of vòng tròn - phụ thuộc vào bán kính
const ground = document.getElementById('ground')
ground.style.width = radius * 3 + 'px'
ground.style.height = radius * 3 + 'px'

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = 'transform 1s'
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + 's' 
    }
}

function applyTransform(obj) {
    // Constrain the angle of camera (between 0 and 180)
    if(tY > 180) tY = 180
    if(tY < 0) tY = 0

    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)"
}

function playSpin(yes) {
    ospin.style.animationPlayState = (yes ? 'running' : 'paused')
}

let sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10

//auto Spin
if(autoRotate) {
    const animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert')
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`
}

//==========mode audio================

const audio = document.getElementById('audio')
const play = document.getElementById('play')
const pulse = document.getElementById('pulse')
const rings = document.getElementsByClassName('ring')
console.log(rings)



function playSong() {
    autoRotate = true
    pulse.style.transform = 'scale(1.8)'
    pulse.style.background = 'yellow'
    play.querySelector('.fas').classList.remove('fa-play')
    play.querySelector('.fas').classList.add('fa-pause')
    play.classList.add('play')
    audio.play()
    console.log(autoRotate)
}

function pauseSong() {
    autoRotate = false
    pulse.style.transform = 'scale(1)'
    pulse.style.background = 'white'
    play.querySelector('.fas').classList.remove('fa-pause')
    play.querySelector('.fas').classList.add('fa-play')
    play.classList.remove('play')
    audio.pause()
    console.log(autoRotate)
}

play.addEventListener("click", () => {
    const isPlaying = play.classList.contains("play")
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})