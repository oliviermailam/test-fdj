import { PlayersRepository } from '../../infrastructure/repositories/players.repository';
import { PlayersUseCases } from './players.usecases';

jest.mock('../../infrastructure/repositories/players.repository');

describe('PlayersUseCases', () => {
  let playersRepository: jest.Mocked<PlayersRepository>;
  let playersUseCases: PlayersUseCases;

  beforeAll(() => {
    playersRepository =
      new PlayersRepository() as jest.Mocked<PlayersRepository>;
    playersUseCases = new PlayersUseCases(playersRepository);
  });

  it('should be defined', () => {
    expect(playersUseCases).toBeDefined();
  });

  it('should have a getPlayerById method', () => {
    expect(playersUseCases.getPlayerById).toBeDefined();
  });

  describe('getPlayer', () => {
    it('should call getPlayer method from repository with the id', async () => {
      await playersUseCases.getPlayerById('1');

      expect(playersRepository.findById).toHaveBeenCalledTimes(1);
      expect(playersRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});
