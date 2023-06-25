export class PropertyFilter {
    isRoom: boolean = true;
    isProperty: boolean = true;
    minPrice: number = 0;
    maxPrice: number = 100000000000;
    floorNo: number;
    haswifi: boolean;
    bedRoomCount: number;
    bathRoomCount: number;
    hasAirCondition: boolean;
    hasTv: boolean;
    review: number;
    city: string;
    country: string;

    isForRent:boolean=true;
    isForSale:boolean=true;
}