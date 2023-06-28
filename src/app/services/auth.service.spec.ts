import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../DataModel/User';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should send a POST request to login endpoint', () => {
      const email = 'test@example.com';
      const password = 'password';

      authService.login(email, password).subscribe();

      const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, password });

      req.flush({});
    });
  });

  describe('register', () => {
    it('should send a POST request to register endpoint', () => {
      const user: User = {
        name: 'testuser',
        email: 'test@example.com',
        password: 'password',
        age: 20,
        reservations: [],
        role:"user",
        id:0,
        complaints: [],
        surname: "testuser"
      };

      authService.register(user).subscribe();

      const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(user);

      req.flush({});
    });
  });

  /*
  describe('refreshAccessToken', () => {
    it('should send a POST request to refresh token endpoint', () => {
      const refreshToken = 'your_refresh_token_here';

      authService.refreshAccessToken().subscribe();

      const req = httpMock.expectOne('http://localhost:8080/logged/refreshToken');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ refreshToken });

      req.flush({});
    });
  });
  */
});
