import { TestBed, async } from '@angular/core/testing';
import { SecretSantaAppComponent } from './secret-santa-app.component';
describe('SecretSantaAppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SecretSantaAppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SecretSantaAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
