import { PlayersRepository } from '../../infrastructure/repositories/players.repository';
import { TeamsRepository } from '../../infrastructure/repositories/teams.repository';
import { TeamsUseCases } from './teams.usecases';

jest.mock('../../infrastructure/repositories/players.repository');
jest.mock('../../infrastructure/repositories/teams.repository');

describe('TeamsUseCases', () => {
  let teamsRepository: jest.Mocked<TeamsRepository>;
  let playersRepository: jest.Mocked<PlayersRepository>;
  let teamsUseCases: TeamsUseCases;

  beforeAll(() => {
    teamsRepository = new TeamsRepository() as jest.Mocked<TeamsRepository>;
    playersRepository =
      new PlayersRepository() as jest.Mocked<PlayersRepository>;
    teamsUseCases = new TeamsUseCases(teamsRepository, playersRepository);
  });

  it('should be defined', () => {
    expect(teamsUseCases).toBeDefined();
  });

  it('should have a getTeamsByIds method', () => {
    expect(teamsUseCases.getTeamsByIds).toBeDefined();
  });

  it('should have a getTeamById method', () => {
    expect(teamsUseCases.getTeamById).toBeDefined();
  });

  describe('getTeamsByIds', () => {
    it('should call getTeamsByIds method from repository', async () => {
      await teamsUseCases.getTeamsByIds(['1', '2']);

      expect(teamsRepository.findByIds).toHaveBeenCalledTimes(1);
      expect(teamsRepository.findByIds).toHaveBeenCalledWith(['1', '2']);
    });
  });

  describe('getTeamById', () => {
    it('should call getTeamById method from repository with the id', async () => {
      await teamsUseCases.getTeamById('1');

      expect(teamsRepository.findById).toHaveBeenCalledTimes(1);
      expect(teamsRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});
