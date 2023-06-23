import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChargeDetails } from 'src/app/interface/payments/chargeDetails';
import { Response } from 'src/app/interface/response';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit{

  public chargeDetails:ChargeDetails;

  constructor(private paymentService:PaymentService,private route: ActivatedRoute){
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      // Cast query parameters to desired types
      const payload =  (params as ChargeDetails) 

      const charge_id: string = payload.charge_id as string;
      const chargeStatus: string = payload.chargeStatus as string;
      const chargeDate: string = payload.chargeDate as string;
      const packageName: string = payload.packageName as string;
      const packagePrice: string = payload.packagePrice as string;

      // Create an object using the casted values
      this.chargeDetails = {
        charge_id,
        chargeStatus,
        chargeDate,
        packageName,
        packagePrice
      };

      console.log(this.chargeDetails)
    });
  }


  public refund(){
    this.paymentService.refund(this.chargeDetails.charge_id);
  }
}
