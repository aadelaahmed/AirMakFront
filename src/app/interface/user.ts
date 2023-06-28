import { Property } from './property';
import { Review } from './review';
import { Subscription } from './subscription';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  phoneNumber: string;
  email: string;
  password: string;
  properties: Property[];
  reviews: Review[];
  subscriptions: Subscription[];
  propertycount:number;
  // Constructors, getters, and setters
}
