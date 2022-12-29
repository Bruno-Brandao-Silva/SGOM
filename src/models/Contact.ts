export default class Contact {
    type: string;
    value: string;
    constructor({ type, value }: { type: string, value: string }) {
        this.type = type;
        this.value = value;
    }
}