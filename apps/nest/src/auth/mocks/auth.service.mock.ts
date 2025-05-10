import { authMock } from './auth.mock';

export class AuthServiceMock {
  signin = jest.fn().mockResolvedValue(authMock.user);
  signup = jest.fn().mockResolvedValue(authMock.user);
}
