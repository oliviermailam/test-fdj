import { PlayersRepository } from './players.repository';

describe('PlayersRepository', () => {
  let playersRepository: PlayersRepository;

  beforeAll(() => {
    playersRepository = new PlayersRepository();
  });

  it('should be defined', () => {
    expect(playersRepository).toBeDefined();
  });

  it('should have a findById method', () => {
    expect(playersRepository.findById).toBeDefined();
  });
});
