import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaEsperaElaboracionPage } from './pagina-espera-elaboracion.page';

describe('PaginaEsperaElaboracionPage', () => {
  let component: PaginaEsperaElaboracionPage;
  let fixture: ComponentFixture<PaginaEsperaElaboracionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaEsperaElaboracionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaEsperaElaboracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
