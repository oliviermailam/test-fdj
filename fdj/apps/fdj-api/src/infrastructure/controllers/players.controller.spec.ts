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
    it('should return an error when id is not correct', async () => {
      const invalidId = '1';
      const req = { params: { id: invalidId } };
      const res = {
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      await playersController.getPlayerById(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status(400).send).toHaveBeenCalledWith({
        message: 'Invalid id',
      });
    });

    it('should call getPlayerById method from use cases with the id from request and send from response', async () => {
      const correctId = '5d2d058cda07b95bb8f16f80';
      const req = { params: { id: correctId } };
      const res = {
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      await playersController.getPlayerById(req as any, res as any);

      expect(playersUseCases.getPlayerById).toHaveBeenCalledTimes(1);
      expect(playersUseCases.getPlayerById).toHaveBeenCalledWith(correctId);
    });
  });
});
