import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListadoPedidoCocineroPage } from './listado-pedido-cocinero.page';

describe('ListadoPedidoCocineroPage', () => {
  let component: ListadoPedidoCocineroPage;
  let fixture: ComponentFixture<ListadoPedidoCocineroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPedidoCocineroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPedidoCocineroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
