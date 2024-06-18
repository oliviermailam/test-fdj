import { LeaguesRepository } from '../../infrastructure/repositories/leagues.repository';
import { LeaguesUseCases } from './leagues.usecases';

jest.mock('../../infrastructure/repositories/leagues.repository');

describe('LeaguesUseCases', () => {
  let leaguesRepository: jest.Mocked<LeaguesRepository>;
  let leaguesUseCases: LeaguesUseCases;

  beforeAll(() => {
    leaguesRepository =
      new LeaguesRepository() as jest.Mocked<LeaguesRepository>;
    leaguesUseCases = new LeaguesUseCases(leaguesRepository);
  });

  it('should be defined', () => {
    expect(leaguesUseCases).toBeDefined();
  });

  it('should have a getLeagues method', () => {
    expect(leaguesUseCases.getAllLeagues).toBeDefined();
  });

  it('should have a getLeague method', () => {
    expect(leaguesUseCases.getLeagueById).toBeDefined();
  });

  describe('getLeagues', () => {
    it('should call getLeagues method from repository', async () => {
      await leaguesUseCases.getAllLeagues();

      expect(leaguesRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLeague', () => {
    it('should call getLeague method from repository with the id', async () => {
      await leaguesUseCases.getLeagueById('1');

      expect(leaguesRepository.findById).toHaveBeenCalledTimes(1);
      expect(leaguesRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});
