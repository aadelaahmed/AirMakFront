import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Stripe from 'stripe';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentRequest } from 'src/app/interface/payments/PaymentRequest';
import { PaymentDetails } from 'src/app/interface/payments/paymentDetails';
import { CreditCard } from 'src/app/interface/payments/CreditCard';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/interface/response';
import { ChargeDetails } from 'src/app/interface/payments/chargeDetails';
import { Packages } from 'src/app/interface/packages';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  stripe: Stripe;
  creditCard: CreditCard = new CreditCard();
  public isLoading:boolean = false;
  packages: Packages;

  constructor(private paymentService: PaymentService, private router: Router, private route: ActivatedRoute) {
    this.stripe = new Stripe('pk_test_51NJLChHEa76bcA8cdPjNDQmQZIyqG1BDAX1j5pzISRHLd1l698rfc9bnORL9ygyZWcMonRmcdnafh0P1QCr413wg00k5KQTedK', null);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.packages = params as Packages;
    });
  }
  // Handle the form submission
  async payNow() {
    this.isLoading = true;
    try {
      const response = await this.stripe.tokens.create({
        card: {
          number: `${this.creditCard.number}`,
          exp_month: `${this.creditCard.exp_month}`,
          exp_year: `${this.creditCard.exp_year}`,
          cvc: `${this.creditCard.cvc}`,
        }
      });


      var paymentRequest: PaymentRequest = new PaymentRequest();
      paymentRequest.setPackageID(this.packages.id);
      paymentRequest.setUserID(1);

      const paymentDetails = new PaymentDetails();
      paymentDetails.setCardToken(response.id);
      paymentDetails.setCurrency('usd');

      paymentRequest.setPaymentDetails(paymentDetails);

      this.paymentService.subscribeOnPackage(paymentRequest).subscribe(result => {
        console.log("result in payment : " + result);

        this.router.navigate(['/confirmation'], { queryParams: result.payload });
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error.message);
      // Handle error appropriately
    }
  }
}
