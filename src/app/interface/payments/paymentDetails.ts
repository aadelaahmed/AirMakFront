export class PaymentDetails {
    private currency:string;
    private cardToken:string;

    public setCurrency(currency:string) {
        return this.currency = currency;
    }

    public getCurrency() : string {
        return this.currency;
    }

    public setCardToken(cardToken:string) {
        return this.cardToken = cardToken;
    }

    public getCardToken() : string {
        return this.cardToken;
    }
}