export default class RequireList {
    id_service: number;
    id_product: number;
    amount: number;

    constructor({ id_service, id_product, amount }: RequireList) {
        this.id_service = id_service;
        this.id_product = id_product;
        this.amount = amount;
    }
}