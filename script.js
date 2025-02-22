document.addEventListener("DOMContentLoaded", function() {
    let preguntas = document.querySelectorAll("[class^='Question']");
    let indice = 0;
    let contador = document.querySelector(".quizzContent p");
    let respuestas = document.querySelectorAll(".response");

    preguntas.forEach((pregunta, i) => {
        if (i !== 0) {
            pregunta.style.display = 'none';
        }
    });

    function mostrarPregunta(indice) {
        preguntas.forEach((pregunta, i) => {
            if (i === indice) {
                pregunta.style.display = 'flex';
                pregunta.style.pointerEvents = "auto";
            } else {
                pregunta.style.display = 'none';
                pregunta.style.pointerEvents = "none";
            }
        });
        contador.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
    }

    respuestas.forEach(response => {
        response.addEventListener("click", function() {
            if (indice < preguntas.length - 1) {
                indice++;
                mostrarPregunta(indice);
            }
        });
    });

    mostrarPregunta(indice);
});