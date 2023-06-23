import {Component, OnInit} from '@angular/core';
import {Property} from "../../interface/property";
import {UserPropertiesService} from "../../services/user-properties.service";
import {Router} from "@angular/router";
import {LoadingBarService} from "../../services/loading-bar.service";

@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.css']
})
export class UserPropertiesComponent implements OnInit{
  userProperties:Property[];
  constructor(private router: Router,private userPropertiesService:UserPropertiesService) {
  }
  ngOnInit() {
    //TODO:Replace with the actual user ID
    LoadingBarService.isLoading= true;
    const userId = 1;
    this.userPropertiesService.getPropertiesByUserId(userId).subscribe(
      (properties: Property[]) => {
        LoadingBarService.isLoading= false;
        this.userProperties = properties;
        console.log("user properties ->"+this.userProperties);
      },
      (error) => {
        LoadingBarService.isLoading= false;
        console.error('Error retrieving properties:', error);
      }
    );
  }
  editProperty(propertyId:number){
    this.router.navigate(['/property/edit', propertyId]);
  }
  getPropertyMonth(property: Property): string {
    // Implement logic to retrieve and format the month based on the property's date
    // Example:
    // const date = new Date(property.date);
    const date = new Date(property.publishDate);
    return date.toLocaleString('en-us', { month: 'short' });
  }

  getPropertyDay(property: Property): number {
    // Implement logic to retrieve and format the day based on the property's date
    // Example:
    // const date = new Date(property.date);
    const date = new Date(property.publishDate);
    return date.getDate();
  }

  getPropertyDaySuffix(property: Property): string {
    /*Implement logic to retrieve and format the day suffix based on the property's date
    Example:*/
    //TODO: get the date of publishing property.
    // const date = new Date(property.date);
    const date = new Date(property.publishDate);
    const day = date.getDate();
    if (day === 1 || day === 21 || day === 31) {
      return 'st';
    } else if (day === 2 || day === 22) {
      return 'nd';
    } else if (day === 3 || day === 23) {
      return 'rd';
    } else {
      return 'th';
    }
    return '';
  }

  protected readonly LoadingBarService = LoadingBarService;
}
