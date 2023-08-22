// primeiro selecionamos os elementos:
const display = document.querySelector("#displayInput")
const botaoIgual = document.querySelector(".igual")
const botaoPonto = document.querySelector(".ponto")
const botoesNumeros = document.querySelectorAll(".num")
const botoesOperadores = document.querySelectorAll(".operador")

// agora add variáveis globais:
let operacaoAtual = ""
let operador = null
let ValorAnterior = ""
let calculando = false;

// agora criamos nossas funcoes;
// a primeira atualiza o display automaticamente, de acordo com a opetacao atual:
const atualizaDisplay = () => {
    display.value = operacaoAtual
}

// essa e a funcao para inserir um numero:
const insereNumero = (evento) => {
    if (calculando) {
        operacaoAtual = evento.target.textContent
        calculando = false
    } else {
        operacaoAtual += evento.target.textContent
    }
    // agora chamo a funcao que atualiza o display automaticamente:
    atualizaDisplay()
}

// agora add as funcoes para cada operacao em questao:
const insereOperador = (evento) => {
    if(operacaoAtual !== "") {
        if(!calculando) {
            if(operador !== null) calcula()
            ValorAnterior = operacaoAtual
            operacaoAtual = ""
        }
        operador = evento.target.textContent
    }
}

const calcula = () => {
    let resultado = null
    const operandoAnterior = parseFloat(ValorAnterior)
    const operandoAtual = parseFloat(operacaoAtual)

    switch(operador){
        case "+":
            resultado = operandoAnterior + operandoAtual
            break

        case "-":
            resultado = operandoAnterior - operandoAtual
            break
        
        case "*":
            resultado = operandoAnterior * operandoAtual
            break
        
        case "/":
            resultado = operandoAnterior / operandoAtual
            break
    }
    operacaoAtual = String(resultado)
    ValorAnterior = operacaoAtual
    calculando = true
    atualizaDisplay()
}

const inserePonto = () => {
    if (operacaoAtual.indexOf(".") === -1){
        operacaoAtual += "."
        atualizaDisplay()
    }
}

// Aqui vao os eventos:
//
botaoIgual.addEventListener("click", () => {
    if (operador !== null & operacaoAtual !== "" &&! calculando) {
        calcula()
        operador = null
    }
})

botaoPonto.addEventListener("click", inserePonto)
// neste primeiro, a var botoesNumeros precisa percorrer todos os eventos, ai escutamos o evento click, que vai executar a funcao insereNumero:
botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero))
//
botoesOperadores.forEach((botao) => botao.addEventListener("click", insereOperador))
