import { TeamsRepository } from '../../infrastructure/repositories/teams.repository';
import { TeamsUseCases } from '../../application/usecases/teams.usecases';
import { TeamsController } from './teams.controller';
import { PlayersRepository } from '../repositories/players.repository';

jest.mock('../../infrastructure/repositories/teams.repository');
jest.mock('../repositories/players.repository');
jest.mock('../../application/usecases/teams.usecases');

describe('TeamsController', () => {
  let teamsRepository: jest.Mocked<TeamsRepository>;
  let playersRepository: jest.Mocked<PlayersRepository>;
  let teamsUseCases: jest.Mocked<TeamsUseCases>;
  let teamsController: TeamsController;

  beforeAll(() => {
    teamsUseCases = new TeamsUseCases(
      teamsRepository,
      playersRepository
    ) as jest.Mocked<TeamsUseCases>;
    teamsController = new TeamsController(teamsUseCases);
  });

  it('should be defined', () => {
    expect(teamsController).toBeDefined();
  });

  it('should have a path', () => {
    expect(teamsController.path).toBe('/teams');
  });

  it('should have a router', () => {
    expect(teamsController.router).toBeDefined();
  });

  it('should have a getTeamsByIds method', () => {
    expect(teamsController.getTeamsByIds).toBeDefined();
  });

  it('should have a getTeamById method', () => {
    expect(teamsController.getTeamById).toBeDefined();
  });

  describe('getTeamsByIds', () => {
    it('should call getTeamsByIds method from use cases and send from response', async () => {
      const req = {
        params: { ids: '5d2d01fdda07b95bb8f16f0a,5d2d02d7da07b95bb8f16f2a' },
      };
      const res = {
        status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
      };

      await teamsController.getTeamsByIds(req as any, res as any);

      expect(teamsUseCases.getTeamsByIds).toHaveBeenCalledTimes(1);
      expect(teamsUseCases.getTeamsByIds).toHaveBeenCalledWith([
        '5d2d01fdda07b95bb8f16f0a',
        '5d2d02d7da07b95bb8f16f2a',
      ]);
    });
  });

  describe('getTeambyId', () => {
    it('should call getTeamById method from use cases with the id from request and send from response', async () => {
      const req = { params: { id: '5d2d02d7da07b95bb8f16f2a' } };
      const res = {
        status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
      };

      await teamsController.getTeamById(req as any, res as any);

      expect(teamsUseCases.getTeamById).toHaveBeenCalledTimes(1);
      expect(teamsUseCases.getTeamById).toHaveBeenCalledWith(
        '5d2d02d7da07b95bb8f16f2a'
      );
    });
  });

  describe('getPlayersByTeamId', () => {
    it('should call getPlayersByTeamId method from use cases with the id from request and send from response', async () => {
      const req = { params: { id: '5d2d02d7da07b95bb8f16f2a' } };
      const res = {
        status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
      };

      await teamsController.getPlayersByTeamId(req as any, res as any);

      expect(teamsUseCases.getPlayersByTeamId).toHaveBeenCalledTimes(1);
      expect(teamsUseCases.getPlayersByTeamId).toHaveBeenCalledWith(
        '5d2d02d7da07b95bb8f16f2a'
      );
    });
  });
});
