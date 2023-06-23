import { PaymentDetails } from "./paymentDetails";

export class PaymentRequest {
    private packageID:number;
    private userID:number;
    private paymentDetails:PaymentDetails;

    public getPackageID() : number{
        return this.packageID;
    }

    
    public setPackageID(packageID:number) {
        return this.packageID = packageID;
    }

    public getUserID() : number{
        return this.userID;
    }

    public setUserID(userID:number) {
        return this.userID = userID;
    }

    public getPaymentDetails() : PaymentDetails{
        return this.paymentDetails;
    }

    public setPaymentDetails(paymentDetails:PaymentDetails) {
        return this.paymentDetails = paymentDetails;
    }
}