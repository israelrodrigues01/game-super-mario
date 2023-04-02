let iniciar = document.querySelector('.iniciar');
let reiniciar = document.querySelector('.reiniciar');
let mario = document.querySelector('.mario img');
let cano = document.querySelector('.cano img');
let nuvens = document.querySelector('.nuvens img');
let audioGame = document.querySelector('.audioGame');

function pular() {
    mario.classList.add('pulo');

    setTimeout(() => {
        mario.classList.remove('pulo');
    }, 800);
}

function marioMorto(canoPosicao, nuvensPosicao) {
    audioGame.src = 'Assets/audio/mario_morrendo.mp3';
    audioGame.play();
    nuvens.classList.remove('jogando');
    cano.classList.remove('jogando');
    mario.classList.remove('jogando');
    cano.style.left = canoPosicao + 'px';
    nuvens.style.left = nuvensPosicao + 'px';
    mario.src = 'Assets/img/mario_morrendo.png'
}

function marioVivo() {
    nuvens.classList.add('jogando');
    cano.classList.add('jogando');
    mario.classList.add('jogando');
    cano.style.left = '';
    nuvens.style.left = '';
    mario.src = 'Assets/img/mario_correndo.gif'
    audioGame.src = 'Assets/audio/audio_jogo.mp4';
}

// const impacto = ;
function impacto() {
    let impacto = setInterval(() => {
        let canoPosicao = cano.offsetLeft;
        let nuvensPosicao = nuvens.offsetLeft;
        let marioPosicao = Number(window.getComputedStyle(mario).bottom.replace('px', ''));

        if (canoPosicao <= 165 && marioPosicao <= 125) {
            marioMorto(canoPosicao, nuvensPosicao);
            reiniciar.style.display = 'block';
            clearInterval(impacto);
        }
    }, 60)
}

function inicio() {
    marioVivo();
    impacto();
    document.addEventListener('keydown', pular);
    audioGame.play();
}


iniciar.onclick = () => {
    inicio();
    iniciar.style.display = 'none';
}
reiniciar.onclick = () => {
    inicio();
    reiniciar.style.display = 'none';
}