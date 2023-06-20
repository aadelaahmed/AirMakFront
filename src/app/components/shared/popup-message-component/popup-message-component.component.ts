import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-message',
  template: `

  `,styles: [`
    :host {
      display: block;
      padding: 16px;
      border: 4px solid #e14d67;
    }
  `]
})
export class PopupMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
