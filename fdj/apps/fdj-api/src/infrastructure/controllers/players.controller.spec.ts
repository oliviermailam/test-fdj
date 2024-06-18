import { PlayersRepository } from '../../infrastructure/repositories/players.repository';
import { PlayersUseCases } from '../../application/usecases/players.usecases';
import { PlayersController } from './players.controller';

jest.mock('../../infrastructure/repositories/players.repository');
jest.mock('../../application/usecases/players.usecases');

describe('PlayersController', () => {
  let playersRepository: jest.Mocked<PlayersRepository>;
  let playersUseCases: jest.Mocked<PlayersUseCases>;
  let playersController: PlayersController;

  beforeAll(() => {
    playersUseCases = new PlayersUseCases(
      playersRepository
    ) as jest.Mocked<PlayersUseCases>;
    playersController = new PlayersController(playersUseCases);
  });

  it('should be defined', () => {
    expect(playersController).toBeDefined();
  });

  it('should have a path', () => {
    expect(playersController.path).toBe('/players');
  });

  it('should have a router', () => {
    expect(playersController.router).toBeDefined();
  });

  it('should have a getPlayerById method', () => {
    expect(playersController.getPlayerById).toBeDefined();
  });

  describe('getPlayerById', () => {
    it('should call getPlayerById method from use cases with the id from request and send from response', async () => {
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
      };

      await playersController.getPlayerById(req as any, res as any);

      expect(playersUseCases.getPlayerById).toHaveBeenCalledTimes(1);
      expect(playersUseCases.getPlayerById).toHaveBeenCalledWith('1');
    });
  });
});
