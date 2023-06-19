import {Property} from './property';
import {Review} from './review';
import {Subscription} from './subscription';

export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _birthdate: Date;
  private _phoneNumber: string;
  private _email: string;
  private _password: string;
  private _properties: Property[];
  private _reviews: Review[];
  private _subscriptions: Subscription[];

  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get birthdate(): Date {
    return this._birthdate;
  }

  set birthdate(value: Date) {
    this._birthdate = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get properties(): Property[] {
    return this._properties;
  }

  set properties(value: Property[]) {
    this._properties = value;
  }

  get reviews(): Review[] {
    return this._reviews;
  }

  set reviews(value: Review[]) {
    this._reviews = value;
  }

  get subscriptions(): Subscription[] {
    return this._subscriptions;
  }

  set subscriptions(value: Subscription[]) {
    this._subscriptions = value;
  }
}
