import { LeaguesRepository } from './leagues.repository';

describe('LeaguesRepository', () => {
  let leaguesRepository: LeaguesRepository;

  beforeAll(() => {
    leaguesRepository = new LeaguesRepository();
  });

  it('should be defined', () => {
    expect(leaguesRepository).toBeDefined();
  });

  it('should have a findAll method', () => {
    expect(leaguesRepository.findAll).toBeDefined();
  });

  it('should have a findById method', () => {
    expect(leaguesRepository.findById).toBeDefined();
  });
});
