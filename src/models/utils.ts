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

const utils = { sleep, cpfRegex, phoneNumberRegex, InputsHandleFocus, InputsHandleFocusOut };
export default utils