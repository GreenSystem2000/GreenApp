import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinhasComprasPage } from './minhas-compras.page';

describe('MinhasComprasPage', () => {
  let component: MinhasComprasPage;
  let fixture: ComponentFixture<MinhasComprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasComprasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinhasComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
