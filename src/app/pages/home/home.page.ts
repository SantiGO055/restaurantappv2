import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  public folder: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    public spinnerService:SpinnerService) { 
    
  }

  ngOnInit() {
    this.spinnerService.mostrarSpinner();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
