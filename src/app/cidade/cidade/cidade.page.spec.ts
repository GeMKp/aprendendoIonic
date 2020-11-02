import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CidadePage } from './cidade.page';

describe('CidadePage', () => {
  let component: CidadePage;
  let fixture: ComponentFixture<CidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
