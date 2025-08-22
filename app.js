let listaDeNumerosSorteados = []; // Lista para armazenar números já sorteados
let numLimite = 200; // Limite máximo para o número secreto
let numeroSecreto = gerarNumAleatorio(); // Gera o número secreto ao iniciar o jogo
let tentativas = 1; // Contador de tentativas

function exibirTextoNaTela (tag, texto) { // Função para exibir texto em um elemento HTML
    let campo = document.querySelector(tag); // Seleciona o elemento HTML com a tag especificada
    campo.innerHTML = texto; // Atualiza o conteúdo do elemento com o texto fornecido
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Utiliza a API de voz para falar o texto em português brasileiro
}

function exibirMensagemInicial() { // Função para exibir a mensagem inicial do jogo
    exibirTextoNaTela('h1', 'Jogo do Numero Secreto'); // Exibe o título do jogo
    exibirTextoNaTela('p', `Descubra o número secreto entre 1 e ${numLimite}`); // Exibe a instrução para o jogador
}

exibirMensagemInicial(); // Chama a função para exibir a mensagem inicial ao carregar a página

function verificarChute() { // Função para verificar o chute do jogador
    let chute = document.querySelector('input').value; // Obtém o valor do input onde o jogador insere seu chute
    limparCampo();
    console.log(chute == numeroSecreto); // Exibe no console se o chute é igual ao número secreto

    if (chute == numeroSecreto){ // Verifica se o chute é igual ao número secreto
        exibirTextoNaTela('h1', 'Você Acertou!'); // Exibe mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Define a palavra correta no singular ou plural com base no número de tentativas
        let mensagemTentativa = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}.`; // Cria a mensagem de tentativas
        exibirTextoNaTela('p', mensagemTentativa); // Exibe a mensagem de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar jogo
    } else if (chute < numeroSecreto) { // Verifica se o chute é menor que o número secreto
        exibirTextoNaTela('h1', 'Você errou!'); // Exibe mensagem de erro
        exibirTextoNaTela('p', 'O número secreto é maior.'); // Informa que o número secreto é maior que o chute
    } else if (chute > numeroSecreto) { // Verifica se o chute é maior que o número secreto
        exibirTextoNaTela('h1', 'Você errou!'); // Exibe mensagem de erro
        exibirTextoNaTela('p', 'O número secreto é menor.'); // Informa que o número secreto é menor que o chute
    } else { // Caso o chute não seja um número válido
        exibirTextoNaTela('h1', 'Numero Invalido!'); // Exibe mensagem de erro para número inválido
        exibirTextoNaTela('p', `Digite um número entre 1 e ${numLimite}.`); // Informa que o número deve estar entre 1 e 10
    }
    tentativas++;  // Incrementa o contador de tentativas
    console.log(tentativas); // Exibe o número de tentativas no console
}

function gerarNumAleatorio() {  // Função para gerar um número aleatório entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numLimite + 1); // Gera um número aleatório entre 1 e 10

    let quantElemntosLista = listaDeNumerosSorteados.length; // Obtém a quantidade de elementos na lista de números sorteados
    if (quantElemntosLista == numLimite) { // Verifica se todos os números já foram sorteados
        listaDeNumerosSorteados = []; // Limpa a lista se todos os números já foram sorteados
    } 

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Verifica se o número já foi sorteado
        return gerarNumAleatorio(); // Se o número já foi sorteado, chama a função recursivamente para gerar um novo número
    } else { // Se o número não foi sorteado
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número sorteado à lista de números sorteados
        console.log(listaDeNumerosSorteados); // Exibe a lista de números sorteados no console
        return numeroEscolhido; // Retorna o número sorteado
    }
}
 
function limparCampo() { // Função para limpar o campo de entrada do chute
    chute = document.querySelector('input'); // Seleciona o campo de entrada do chute
    chute.value = ''; // Limpa o valor do campo de entrada
}

function reiniciarJogo() { // Função para reiniciar o jogo
    numeroSecreto = gerarNumAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada do chute
    tentativas = 1; // Reseta o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar jogo
}