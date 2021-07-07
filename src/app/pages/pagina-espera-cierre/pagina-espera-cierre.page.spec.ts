import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaEsperaCierrePage } from './pagina-espera-cierre.page';

describe('PaginaEsperaCierrePage', () => {
  let component: PaginaEsperaCierrePage;
  let fixture: ComponentFixture<PaginaEsperaCierrePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaEsperaCierrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaEsperaCierrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
