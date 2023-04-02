let iniciar = document.querySelector('.iniciar');
let reiniciar = document.querySelector('.reiniciar');
let mario = document.querySelector('.mario img');
let cano = document.querySelector('.cano img');
let nuvens = document.querySelector('.nuvens img');
let audioGame = document.querySelector('.audioGame');
let pontuacaoPontos = document.querySelector('.pontuacao-pontos');
let pontuacaoRecord = document.querySelector('.pontuacao-record');

var pontos = 0;
var record = JSON.parse(localStorage.getItem('Record-Mario'));

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
    mario.src = 'Assets/img/mario_morrendo.png';
    reiniciar.style.display = 'block';
}

function marioVivo() {
    nuvens.classList.add('jogando');
    cano.classList.add('jogando');
    mario.classList.add('jogando');
    cano.style.left = '';
    nuvens.style.left = '';
    mario.src = 'Assets/img/mario_correndo.gif'
    audioGame.src = 'Assets/audio/audio_jogo.mp4';
    pontos = 0;
}

function recordUser(pontos) {
    if (pontos > record) {
        localStorage.setItem('Record-Mario', pontos);
        record = pontos;
    }
}

function impacto() {
    let impacto = setInterval(() => {
        let canoPosicao = cano.offsetLeft;
        let nuvensPosicao = nuvens.offsetLeft;
        let marioPosicao = Number(window.getComputedStyle(mario).bottom.replace('px', ''));

        pontos++;
        pontuacaoPontos.innerHTML = 'Pontos: ' + (pontos < 10 ? `0${pontos}` : pontos);

        if (canoPosicao <= 165 && marioPosicao <= 125) {
            recordUser(pontos);
            marioMorto(canoPosicao, nuvensPosicao);
            clearInterval(impacto);
        }
    }, 60)
}

function inicio() {
    marioVivo();
    impacto();
    pontuacaoRecord.innerHTML = record ? `Record: ${record}` : '';
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