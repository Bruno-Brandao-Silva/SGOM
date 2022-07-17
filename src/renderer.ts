/* eslint-disable @typescript-eslint/no-explicit-any */

//COLETA TODOS OS INPUTS
const labels = document.getElementsByTagName('label')
const inputs = []

for (let i = 0; i < labels.length; i++) {
    inputs.push(labels[i].getElementsByTagName('input')[0])
}

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

// FUNÇÕES DE ENTRADA E SAIDA DOS INPUTS
const handleFocus = ({ target }: { target: any }) => {
    const span = target.previousElementSibling;
    span.classList.add('span-active');
}

const handleFocusOut = ({ target }: { target: any }) => {
    if (target.value === '') {
        const span = target.previousElementSibling;
        span.classList.remove('span-active');
    }
}

inputs.forEach((input) => input.addEventListener('focus', handleFocus));
inputs.forEach((input) => input.addEventListener('focusout', handleFocusOut));



//FUNÇÕES GENÉRICAS DO SCRIPT

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const cpfRegex = (e: any) => {
    if (e.target.value.length <= 14 && e.target.value.length > 0) {
        let temp = e.target.value
        temp = temp.replace(/\D/g, '')
        if (temp.length < 4) {
            temp = temp.replace(/^(\d{0,3})/g, '$1')
        } else if (temp.length < 7) {
            temp = temp.replace(/^(\d{3})(\d{0,3})/g, '$1.$2')
        } else if (temp.length < 10) {
            temp = temp.replace(/^(\d{3})(\d{3})(\d{0,3})/g, '$1.$2.$3')
        } else {
            temp = temp.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/g, '$1.$2.$3-$4')
        }
        e.target.value = temp
    } else {
        e.target.value = e.target.value.substring(0, 14)
    }
}
const phoneNumberRegex = (e: any) => {
    if (e.target.value.length < 16) {
        let temp = e.target.value
        temp = temp.replace(/\D/g, '')
        if (temp.length <= 2) {
            temp = temp.replace(/^(\d{1,2})/g, '($1')
        } else if (temp.length <= 6) {
            temp = temp.replace(/^(\d{2})(\d{1,4})/g, '($1) $2')
        } else if (temp.length <= 9) {
            temp = temp.replace(/^(\d{2})(\d{4})(\d{1,4})/g, '($1) $2-$3')
        } else if (temp.length <= 12) {
            temp = temp.replace(/^(\d{2})(\d{4,5})(\d{4})/g, '($1) $2-$3')
        }
        e.target.value = temp;
    } else {
        e.target.value = e.target.value.substring(0, 15)
    }
}
import './index.css';
console.log('👋 This message is being logged by "renderer.js", included via webpack');

// import './app'
