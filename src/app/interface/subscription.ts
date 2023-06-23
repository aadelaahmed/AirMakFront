import { Packages } from './packages';
import { SubscriptionId } from './subscriptionid';
// @ts-ignore
import { User } from './user';


export class Subscription {
  private id: SubscriptionId;
  private user: User;
  private packages: Packages;
  private endDate: Date;
  private price: number;
  private discount: number | null;
  private startDate: Date;
  // Constructors, getters, and setters
}
