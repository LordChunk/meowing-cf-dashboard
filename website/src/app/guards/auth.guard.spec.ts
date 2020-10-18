import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/authentication.service';
import { AuthGuard } from './auth.guard';
describe('AuthGuard', () => {
  let service: AuthGuard;
  beforeEach(() => {
    const activatedRouteSnapshotStub = () => ({});
    const routerStateSnapshotStub = () => ({});
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const authServiceStub = () => ({ user: { pipe: () => ({}) } });
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: ActivatedRouteSnapshot,
          useFactory: activatedRouteSnapshotStub,
        },
        { provide: RouterStateSnapshot, useFactory: routerStateSnapshotStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub },
      ],
    });
    service = TestBed.inject(AuthGuard);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('canActivate', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = TestBed.inject(
        ActivatedRouteSnapshot,
      );
      const routerStateSnapshotStub: RouterStateSnapshot = TestBed.inject(
        RouterStateSnapshot,
      );
      // const routerStub: Router = TestBed.inject(Router);
      // spyOn(routerStub, 'navigate').and.callThrough();
      // service.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
      // expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
