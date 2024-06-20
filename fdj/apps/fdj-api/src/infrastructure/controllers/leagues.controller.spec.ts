import { LeaguesRepository } from '../../infrastructure/repositories/leagues.repository';
import { LeaguesUseCases } from '../../application/usecases/leagues.usecases';
import { LeaguesController } from './leagues.controller';

jest.mock('../../infrastructure/repositories/leagues.repository');
jest.mock('../../application/usecases/leagues.usecases');

describe('LeaguesController', () => {
  let leaguesRepository: jest.Mocked<LeaguesRepository>;
  let leaguesUseCases: jest.Mocked<LeaguesUseCases>;
  let leaguesController: LeaguesController;

  beforeAll(() => {
    leaguesUseCases = new LeaguesUseCases(
      leaguesRepository
    ) as jest.Mocked<LeaguesUseCases>;
    leaguesController = new LeaguesController(leaguesUseCases);
  });

  it('should be defined', () => {
    expect(leaguesController).toBeDefined();
  });

  it('should have a path', () => {
    expect(leaguesController.path).toBe('/leagues');
  });

  it('should have a router', () => {
    expect(leaguesController.router).toBeDefined();
  });

  it('should have a getLeagues method', () => {
    expect(leaguesController.getAllLeagues).toBeDefined();
  });

  it('should have a getLeague method', () => {
    expect(leaguesController.getLeagueById).toBeDefined();
  });

  describe('getAllLeagues', () => {
    it('should call getAllLeagues method from use cases and send from response', async () => {
      const res = {
        status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
      };

      await leaguesController.getAllLeagues(null, res as any);

      expect(leaguesUseCases.getAllLeagues).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLeagueById', () => {
    it('should call getLeagueById method from use cases with the id from request and send from response', async () => {
      const correctId = '5d2d058cda07b95bb8f16f80';
      const req = { params: { id: correctId } };
      const res = {
        status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
      };

      await leaguesController.getLeagueById(req as any, res as any);

      expect(leaguesUseCases.getLeagueById).toHaveBeenCalledTimes(1);
      expect(leaguesUseCases.getLeagueById).toHaveBeenCalledWith(correctId);
    });
  });
});
