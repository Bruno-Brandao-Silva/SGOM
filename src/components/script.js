//COLETA TODOS OS INPUTS
const labels = document.getElementsByTagName('label')
const inputs = []

for (let i = 0; i < labels.length; i++) {
    inputs.push(labels[i].getElementsByTagName('input')[0])
}


if (window.location.pathname.includes('formCadEndereco.html')) {
    const button_pt2 = document.getElementById('pt2')
    button_pt2.addEventListener('click', async () => {
        await sleep(100)
    });
}

// FUNÇÕES DE ENTRADA E SAIDA DOS INPUTS


inputs.forEach((input) => input.addEventListener('focus', handleFocus));
inputs.forEach((input) => input.addEventListener('focusout', handleFocusOut));
