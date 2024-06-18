import { TeamsRepository } from './teams.repository';

describe('TeamsRepository', () => {
  let teamsRepository: TeamsRepository;

  beforeAll(() => {
    teamsRepository = new TeamsRepository();
  });

  it('should be defined', () => {
    expect(teamsRepository).toBeDefined();
  });

  it('should have a findByIds method', () => {
    expect(teamsRepository.findByIds).toBeDefined();
  });

  it('should have a findById method', () => {
    expect(teamsRepository.findById).toBeDefined();
  });
});
