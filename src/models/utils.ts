const sleep = (ms: number) => {
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
        return temp
    } else {
        return e.target.value.substring(0, 14)
    }
}

const cpfValidator = (e: any): boolean => {
    let cpf = (e.target?.value!) ? e.target.value.replace(/\D/g, '').substring(0, 11) : e.replace(/\D/g, '')
    console.log(cpf)
    let digito_1 = 0
    let digito_2 = 0
    let peso = 10
    if (cpf == '00000000000' || cpf == '11111111111' ||
        cpf == '22222222222' || cpf == '33333333333' ||
        cpf == '44444444444' || cpf == '55555555555' ||
        cpf == '66666666666' || cpf == '77777777777' ||
        cpf == '88888888888' || cpf == '99999999999') { return false }
    if (cpf.length != 11) { return false }
    for (let i = 0; i < 9; i++) {
        digito_1 = digito_1 + parseInt(cpf[i]) * peso;
        peso--;
    }
    digito_1 = digito_1 * 10;
    peso = 11;
    for (let i = 0; i < 10; i++) {
        digito_2 = digito_2 + parseInt(cpf[i]) * peso;
        peso--;
    }
    digito_2 = digito_2 * 10;
    if (parseInt(cpf[9]) == (digito_1 % 11) && parseInt(cpf[10]) == (digito_2 % 11)) {
        return true
    } else {
        return false
    }
}
const cepRegex = (e: any) => {
    if (e.target.value.length <= 9 && e.target.value.length > 0) {
        let temp = e.target.value
        temp = temp.replace(/\D/g, '')
        if (temp.length <= 5) {
            temp = temp.replace(/^(\d{0,5})/g, '$1')
        } else {
            temp = temp.replace(/^(\d{5})(\d{0,3})/g, '$1-$2')
        }
        return temp
    } else {
        return e.target.value.substring(0, 9)
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
        return temp;
    } else {
        return e.target.value.substring(0, 15)
    }
}

const InputsHandleFocus = ({ target }: { target: any }) => {
    const span = target.previousElementSibling;
    span.classList.add('span-active');
}

const InputsHandleFocusOut = ({ target }: { target: any }) => {
    if (target.value === '') {
        const span = target.previousElementSibling;
        span.classList.remove('span-active');
    }
}

const utils = { sleep, cpfRegex, cpfValidator, cepRegex, phoneNumberRegex, InputsHandleFocus, InputsHandleFocusOut };
export default utils