const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const cpfRegex = (e: any) => {
    if (typeof e == 'string') {
        if (e.length <= 14 && e.length > 0) {
            let temp = e
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
            return e
        }
    } else {
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
            return e.target.value
        }
    }
}

const cpfValidator = (e: any): boolean => {
    let cpf = typeof e != 'string' ? e.target.value.replace(/\D/g, '').substring(0, 11) : e.replace(/\D/g, '')
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
const CNPJRegex = (e: any) => {
    if (typeof e == 'string') {
        if (e.length <= 18 && e.length > 0) {
            let temp = e
            temp = temp.replace(/\D/g, '')
            if (temp.length <= 2) {
                temp = temp.replace(/^(\d{0,2})/g, '$1')
            } else if (temp.length <= 6) {
                temp = temp.replace(/^(\d{2})(\d{0,3})/g, '$1.$2')
            } else if (temp.length <= 10) {
                temp = temp.replace(/^(\d{2})(\d{3})(\d{0,3})/g, '$1.$2.$3')
            } else if (temp.length <= 15) {
                temp = temp.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/g, '$1.$2.$3/$4')
            } else {
                temp = temp.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/g, '$1.$2.$3/$4-$5')
            }
            return temp
        } else {
            return e.substring(0, 18)
        }
    } else {
        if (e.target.value.length <= 18 && e.target.value.length > 0) {
            let temp = e.target.value
            temp = temp.replace(/\D/g, '')
            if (temp.length <= 2) {
                temp = temp.replace(/^(\d{0,2})/g, '$1')
            } else if (temp.length <= 5) {
                temp = temp.replace(/^(\d{2})(\d{0,3})/g, '$1.$2')
            } else if (temp.length <= 8) {
                temp = temp.replace(/^(\d{2})(\d{3})(\d{0,3})/g, '$1.$2.$3')
            } else if (temp.length <= 12) {
                temp = temp.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/g, '$1.$2.$3/$4')
            } else {
                temp = temp.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/g, '$1.$2.$3/$4-$5')
            }
            return temp
        } else {
            return e.target.value.substring(0, 18)
        }
    }

}
const CNPJValidator = (e: any): boolean => {
    const CNPJ = typeof e != 'string' ? e.target.value.replace(/\D/g, '').substring(0, 14) : e.replace(/\D/g, '')

    if (CNPJ == '') return false;

    if (CNPJ.length != 14) return false;

    if (CNPJ == "00000000000000" ||
        CNPJ == "11111111111111" ||
        CNPJ == "22222222222222" ||
        CNPJ == "33333333333333" ||
        CNPJ == "44444444444444" ||
        CNPJ == "55555555555555" ||
        CNPJ == "66666666666666" ||
        CNPJ == "77777777777777" ||
        CNPJ == "88888888888888" ||
        CNPJ == "99999999999999")
        return false;

    // Valida DVs
    let tamanho = CNPJ.length - 2
    let numeros = CNPJ.substring(0, tamanho);
    let digitos = CNPJ.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = CNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
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
    if (e.target.value.length < 15) {
        let temp = e.target.value
        temp = temp.replace(/\D/g, '')
        if (temp.length <= 2) {
            temp = temp.replace(/^(\d{1,2})/g, '($1')
        } else if (temp.length <= 6) {
            temp = temp.replace(/^(\d{2})(\d{1,4})/g, '($1) $2')
        } else if (temp.length <= 10) {
            temp = temp.replace(/^(\d{2})(\d{4})(\d{1,4})/g, '($1) $2-$3')
        }
        return temp;
    } else {
        return e.target.value.substring(0, 14)
    }
}

const cellPhoneNumberRegex = (e: any) => {
    if (e.target.value.length < 16) {
        let temp = e.target.value
        temp = temp.replace(/\D/g, '')
        if (temp.length <= 2) {
            temp = temp.replace(/^(\d{1,2})/g, '($1')
        } else if (temp.length <= 7) {
            temp = temp.replace(/^(\d{2})(\d{1,5})/g, '($1) $2')
        } else if (temp.length <= 11) {
            temp = temp.replace(/^(\d{2})(\d{5})(\d{1,4})/g, '($1) $2-$3')
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
// 456,4
const monetaryMask = (e: number | string): string => {
    let temp = e.toString()
    if (temp.includes('.')) {
        temp = temp.replace('.', ',')
        temp = temp.replace(/(?=(\d{3})+(\D))\B/g, '.')
        if (temp.indexOf(',') == temp.length - 2) { temp += '0' }
        return `R$ ${temp}`
    }
    temp = temp + ',00'
    temp = temp.replace(/(?=(\d{3})+(\D))\B/g, '.')
    return `R$ ${temp}`;
}
const plateRegex = (e: any) => {
    let temp = e.target.value as string;
    temp = temp.replace(/\W/g, '');
    if (temp.length > 7) {
        return e.target.value.substring(0, 8);
    }
    temp = temp.toUpperCase();
    if (temp.length <= 3) {
        return temp.replace(/[^A-Z]/g, '');
    } else if (temp.length <= 4) {
        let subString1 = temp.substring(0, 3);
        subString1 = subString1.replace(/[^A-Z]/g, '');
        let subString2 = temp.substring(3, 4);
        subString2 = subString2.replace(/[^0-9]/g, '');
        return `${subString1}-${subString2}`;
    } else if (temp.length <= 5) {
        let subString1 = temp.substring(0, 3);
        subString1 = subString1.replace(/[^A-Z]/g, '');
        let subString2 = temp.substring(3, 4);
        subString2 = subString2.replace(/[^0-9]/g, '');
        let subString3 = temp.substring(4, 5);
        subString3 = subString3.replace(/[^A-Z0-9]/g, '');
        return `${subString1}-${subString2}${subString3}`;
    } else {
        let subString1 = temp.substring(0, 3);
        subString1 = subString1.replace(/[^A-Z]/g, '');
        let subString2 = temp.substring(3, 4);
        subString2 = subString2.replace(/\D/g, '');
        let subString3 = temp.substring(4, 5);
        subString3 = subString3.replace(/[^A-Z0-9]/g, '');
        let subString4 = temp.substring(5, 7);
        subString4 = subString4.replace(/\D/g, '');
        return `${subString1}-${subString2}${subString3}${subString4}`;
    }
}
const inputsVerify = async (inputs: (HTMLInputElement | HTMLTextAreaElement)[]) => {
    await sleep(10)
    for (let i = 0; i < inputs?.length; i++) {
        if (inputs[i].value != '') {
            InputsHandleFocus({ target: inputs[i] });
        }
    }
}
const getAllInputs = (document: Document): (HTMLInputElement | HTMLTextAreaElement)[] => {
    const inputs = document.querySelectorAll('input');
    const textAreas = document.querySelectorAll('textarea');
    const allInputs = [...inputs, ...textAreas];
    return allInputs
}
const utils = { getAllInputs, inputsVerify, monetaryMask, sleep, cpfRegex, cpfValidator, plateRegex, CNPJRegex, CNPJValidator, cepRegex, phoneNumberRegex, cellPhoneNumberRegex, InputsHandleFocus, InputsHandleFocusOut };
export default utils