function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if(!audio) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function removeClassAfterTransition(e){
    this.classList.remove('playing');
}
const keys = Array.from(document.querySelectorAll('.key'));
console.log(keys);
keys.forEach(key => key.addEventListener('transitionend', removeClassAfterTransition));

window.addEventListener('keydown', playSound);