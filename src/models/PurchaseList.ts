export default class PurchaseList {
    id_purchase: number;
    id_product: number;
    amount: number;

    constructor({ id_purchase, id_product, amount }: PurchaseList) {
        this.id_purchase = id_purchase;
        this.id_product = id_product;
        this.amount = amount;
    }
}
