import {User} from "./user";

export class UpdatePropertyDTO {
  id: number;
  user: User;
  description: string;
  price: number;
  availability: number;
  listingType: string;
  bedRoomCount: number;
  bathRoomCount: number;
  airCondition: number;
  wifi: number;
  tv: number;
}
