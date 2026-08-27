let JHFpalavrasSecretas = [
    "POREM",
    "CASAS",
    "ASSIM",
  
];

let JHFpalavraSecreta = "";
let JHFtentativaAtual = 0;
let JHFnumeroMaximoTentativas = 6;
let JHFjogoTerminou = false;
let JHFtempoResultado = null;

let JHFcampoPalavra = document.querySelector(".JHFcampoPalavra");
let JHFmensagem = document.querySelector(".JHFmensagem");
let JHFlinhas = document.querySelectorAll(".JHFlinha");
let JHFtelaResultado = document.querySelector(".JHFtelaResultado");
let JHFtituloResultado = document.querySelector(".JHFtituloResultado");
let JHFtentativaAtualTexto = document.querySelector(".JHFtentativaAtual");

let JHFbotaoEnviar = document.querySelector(".JHFbotaoEnviar");
let JHFbotaoReiniciar = document.querySelector(".JHFbotaoReiniciar");
let JHFbotaoFechar = document.querySelector(".JHFbotaoFechar");


function JHFescolherPalavra() {

    let JHFnumeroAleatorio = Math.floor(
        Math.random() * JHFpalavrasSecretas.length
    );

    JHFpalavraSecreta =
        JHFpalavrasSecretas[JHFnumeroAleatorio];

    console.log("Palavra secreta:", JHFpalavraSecreta);
}


function JHFmostrarVitoria() {

    JHFtelaResultado.classList.remove("JHFescondido");
    JHFtelaResultado.classList.remove("JHFtelaDerrota");
    JHFtelaResultado.classList.add("JHFtelaVitoria");

    JHFtituloResultado.textContent = "Vitória";
}


function JHFmostrarDerrota() {

    JHFtelaResultado.classList.remove("JHFescondido");
    JHFtelaResultado.classList.remove("JHFtelaVitoria");
    JHFtelaResultado.classList.add("JHFtelaDerrota");

    JHFtituloResultado.textContent = "Derrota";
}


function JHFreiniciarJogo() {

    if (JHFtempoResultado !== null) {

        clearTimeout(JHFtempoResultado);
        JHFtempoResultado = null;
    }

    JHFtentativaAtual = 0;
    JHFjogoTerminou = false;

    JHFescolherPalavra();

    JHFtentativaAtualTexto.textContent = 1;
    JHFcampoPalavra.value = "";
    JHFmensagem.textContent = "";

    JHFtelaResultado.classList.add("JHFescondido");

    JHFtelaResultado.classList.remove(
        "JHFtelaVitoria"
    );

    JHFtelaResultado.classList.remove(
        "JHFtelaDerrota"
    );

    for (
        let JHFi = 0;
        JHFi < JHFlinhas.length;
        JHFi++
    ) {

        let JHFquadrados =
            JHFlinhas[JHFi].querySelectorAll(
                ".JHFquadrado"
            );

        for (
            let JHFj = 0;
            JHFj < JHFquadrados.length;
            JHFj++
        ) {

            JHFquadrados[JHFj].textContent = "";

            JHFquadrados[JHFj].classList.remove(
                "JHFletraErrada"
            );

            JHFquadrados[JHFj].classList.remove(
                "JHFletraLugarErrado"
            );

            JHFquadrados[JHFj].classList.remove(
                "JHFletraCerta"
            );
        }
    }

    JHFcampoPalavra.focus();
}


function JHFenviarPalavra() {

    if (JHFjogoTerminou === true) {
        return;
    }

    let JHFpalavraDigitada =
        JHFcampoPalavra.value
            .trim()
            .toUpperCase();

    if (JHFpalavraDigitada.length !== 5) {

        JHFmensagem.textContent =
            "Digite uma palavra com 5 letras.";

        JHFcampoPalavra.focus();

        return;
    }

    JHFmensagem.textContent = "";

    let JHFlinhaAtual =
        JHFlinhas[JHFtentativaAtual];

    let JHFquadrados =
        JHFlinhaAtual.querySelectorAll(
            ".JHFquadrado"
        );

    let JHFpalavraDisponivel =
        JHFpalavraSecreta.split("");

    let JHFresultadoLetras = [
        "JHFletraErrada",
        "JHFletraErrada",
        "JHFletraErrada",
        "JHFletraErrada",
        "JHFletraErrada"
    ];

    for (let JHFi = 0; JHFi < 5; JHFi++) {

        JHFquadrados[JHFi].textContent =
            JHFpalavraDigitada[JHFi];
    }

    for (let JHFi = 0; JHFi < 5; JHFi++) {

        if (
            JHFpalavraDigitada[JHFi] ===
            JHFpalavraSecreta[JHFi]
        ) {

            JHFresultadoLetras[JHFi] =
                "JHFletraCerta";

            JHFpalavraDisponivel[JHFi] = null;
        }
    }

    for (let JHFi = 0; JHFi < 5; JHFi++) {

        if (
            JHFresultadoLetras[JHFi] !==
            "JHFletraCerta"
        ) {

            let JHFposicaoEncontrada =
                JHFpalavraDisponivel.indexOf(
                    JHFpalavraDigitada[JHFi]
                );

            if (JHFposicaoEncontrada !== -1) {

                JHFresultadoLetras[JHFi] =
                    "JHFletraLugarErrado";

                JHFpalavraDisponivel[
                    JHFposicaoEncontrada
                ] = null;
            }
        }
    }

    for (let JHFi = 0; JHFi < 5; JHFi++) {

        JHFquadrados[JHFi].classList.add(
            JHFresultadoLetras[JHFi]
        );
    }

    JHFtentativaAtual++;

    JHFcampoPalavra.value = "";

    if (
        JHFpalavraDigitada ===
        JHFpalavraSecreta
    ) {

        JHFjogoTerminou = true;

        JHFtentativaAtualTexto.textContent =
            JHFtentativaAtual;

        JHFtempoResultado = setTimeout(
            function() {

                JHFmostrarVitoria();

            },
            500
        );

        return;
    }

    if (
        JHFtentativaAtual >=
        JHFnumeroMaximoTentativas
    ) {

        JHFjogoTerminou = true;

        JHFtentativaAtualTexto.textContent = 6;

        JHFtempoResultado = setTimeout(
            function() {

                JHFmostrarDerrota();

            },
            500
        );

        return;
    }

    JHFtentativaAtualTexto.textContent =
        JHFtentativaAtual + 1;

    JHFcampoPalavra.focus();
}


JHFcampoPalavra.addEventListener(
    "input",
    function() {

        JHFcampoPalavra.value =
            JHFcampoPalavra.value
                .replace(
                    /[^a-zA-Z]/g,
                    ""
                )
                .toUpperCase();
    }
);


JHFcampoPalavra.addEventListener(
    "keydown",
    function(JHFevento) {

        if (JHFevento.key === "Enter") {

            JHFenviarPalavra();
        }
    }
);


JHFbotaoEnviar.addEventListener(
    "click",
    function() {

        JHFenviarPalavra();
    }
);


JHFbotaoReiniciar.addEventListener(
    "click",
    function() {

        JHFreiniciarJogo();
    }
);


JHFbotaoFechar.addEventListener(
    "click",
    function() {

        JHFreiniciarJogo();
    }
);


JHFescolherPalavra();
JHFcampoPalavra.focus();