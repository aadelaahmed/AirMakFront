import { Property } from './property';
import { Review } from './review';
import { Subscription } from './subscription';

export class User {
  private id: number;
  private firstName: string;
  private lastName: string;
  private birthdate: Date;
  private phoneNumber: string;
  private email: string;
  private password: string;
  private properties: Property[];
  private reviews: Review[];
  private subscriptions: Subscription[];

  // Constructors, getters, and setters
}
