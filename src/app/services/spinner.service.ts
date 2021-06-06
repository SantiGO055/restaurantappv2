import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  
  constructor(private ngxSpinner: NgxSpinnerService) {}

  async mostrarSpinner() {
    this.ngxSpinner.show();
  }

  ocultarSpinner() {
    this.ngxSpinner.hide();
  }
}
