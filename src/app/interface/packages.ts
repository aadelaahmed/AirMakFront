import { Subscription } from './subscription';

export class Packages {
  public id: number | null;
  public name: string;
  public propertyCount: number;
  public duration: number;
  public price: bigint;
  public subscriptions: Set<Subscription>;

  // Constructors, getters, and setters
}
