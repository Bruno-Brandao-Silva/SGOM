/* eslint-disable @typescript-eslint/no-explicit-any */

//COLETA TODOS OS INPUTS
/*
const labels = document.getElementsByTagName('label')
const inputs = []

for (let i = 0; i < labels.length; i++) {
    inputs.push(labels[i].getElementsByTagName('input')[0])
}
inputs.forEach((input) => input.addEventListener('focus', handleFocus));
inputs.forEach((input) => input.addEventListener('focusout', handleFocusOut));


//formCadCliente
if (!isNaN(1)) {
    const formCadCliente = document.getElementById('formCadCliente') as any
    const buttonCadCliente = document.getElementById('pt1')

    if (inputs[0].name == 'cpf') inputs[0].addEventListener('input', e => cpfRegex(e))
    if (inputs[3].name == 'contato_1') inputs[3].addEventListener('input', e => phoneNumberRegex(e))
    if (inputs[4].name == 'contato_2') inputs[4].addEventListener('input', e => phoneNumberRegex(e))

    buttonCadCliente.addEventListener('click', async () => {
        try {
            if (!formCadCliente.checkValidity()) {
                formCadCliente.reportValidity()
                return
            }
            const data: unknown[] = []
            for (let i = 0; i < formCadCliente.elements.length; i++) {
                if (formCadCliente.elements[i].name && formCadCliente.elements[i].name != 'cpf' && formCadCliente.elements[i].value != '') {
                    data.push(formCadCliente.elements[i].value)
                }
            }
            const cliente = (window as any).api.Cliente.cliente(undefined, ...data)
            const response = (window as any).api.Cliente.insert(cliente)
            console.log(response)
            await sleep(50)
            window.location.href = 'formCadEndereco.html'
        } catch (error) {
            console.log(error)
        }
    });
}

if (window.location.pathname.includes('formCadEndereco.html')) {
    const button_pt2 = document.getElementById('pt2')
    button_pt2.addEventListener('click', async () => {
        await sleep(100)
    });
}




*/
import './index.css';
// import './public/images/back.svg'
console.log('👋 This message is being logged by "script.js", included via webpack');

import './app'
