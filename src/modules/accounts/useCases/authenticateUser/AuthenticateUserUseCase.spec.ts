import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'user@test.com',
      password: '123456',
      driver_licence: '403232',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able authenticate an user with wrong email', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User test',
        email: 'user@test.com',
        password: '123456',
        driver_licence: '403232',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'wrong@email.com',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able authenticate an user with wrong password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User test',
        email: 'user@test.com',
        password: '123456',
        driver_licence: '403232',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: user.driver_licence,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
