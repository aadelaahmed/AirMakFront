import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/interface/property';
import { AuthGuardService } from 'src/app/services/authGuard.service';
import { EditPropertyService } from 'src/app/services/edit-property/edit-property.service';
import { PendingService } from 'src/app/services/pending.service';
import { PopupService } from 'src/app/services/popup.service';
import {LoadingBarService} from "../../services/loading-bar.service";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent {
  propertyId: number;
  property: Property = new Property();
  mapVisible: boolean = false;
  center: google.maps.LatLngLiteral;
  zoom: number = 15;
  markerIcon: string;
  showPrice: boolean = true;
  imageUrl: string;
  selectedImage: any;

  constructor(private route: ActivatedRoute, private propertyService: EditPropertyService,
     private pendingService: PendingService,private popupService: PopupService, 
     private router: Router, private auth:AuthGuardService) {
    propertyService.baseUrl = "http://localhost:8080/properties";
    this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/airmak-163da.appspot.com/o/1687473125679_349463878_3531148067160639_1216578188164938866_n.jpg?alt=media&token=a0294873-68a0-4bd3-9ce0-92ca718f7371";
    this.propertyId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('Property ID in propertyDetails:', this.propertyId);
    this.getAndDisplayProperty(this.propertyId);
  }

  getAndDisplayProperty(id: number) {
    this.propertyService.getPropertyById(id).subscribe(
      (payload) => {
        console.log("/////////////////")
        console.log(payload);
        LoadingBarService.isLoading = false;
        this.property = this.propertyService.mapResponseToProperty(payload);
        this.markerIcon = "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png";
        // this.markerIcon = "assets/img/map icons/1.png";
        this.selectedImage = this.property.images[0].imagePath;

        this.center = {
          lat: this.property.address.lat,
          lng: this.property.address.lng
        };
        console.log(this.property);
        console.log("/////////////////")
      },
      (error) => {
        console.log("//////////eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee///////")
        console.error(error);
        LoadingBarService.isLoading = false;
        console.log("/////////////////")
      }

    );
  }

  ngOnInit() {

  }

  onZoomChanged(event: any) {
    console.log("zoom :" + this.zoom)
    if (this.zoom > 13)
      this.showPrice = true;
    this.showPrice = false;
  }


  selectImage(image: string): void {
    this.selectedImage = image;
  }

  accept(id: number) {
    this.pendingService.update(id).subscribe(
      {
        next: reposnse => {
          console.log(reposnse);
          this.popupService.successPopup(reposnse.payload);
          this.router.navigate(['admin/pending']);
        },
        error: error => { 
          this.popupService.errorPopup(error.payload);
        }
      }
    );
  }
  

  isAdmin():boolean{
    return this.auth.getRole() === 'ADMIN';
  }
  protected readonly LoadingBarService = LoadingBarService;
}
