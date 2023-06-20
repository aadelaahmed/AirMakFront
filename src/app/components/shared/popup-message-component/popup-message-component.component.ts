import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-message',
  template: `
    <h3>{{ data.message }}</h3>
    <!-- Add any additional content or styling here -->
  `,styles: [`
    :host {
      display: block;
      padding: 16px;
      border: 4px solid #e14d67; /* Customize the border color and style as needed */
    }
  `]
})
export class PopupMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
