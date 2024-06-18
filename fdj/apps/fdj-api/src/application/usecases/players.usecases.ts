import { Player } from '@fdj/entities';

import { IPlayersRepository } from '../../domain/repositories-interfaces/players.repository.interface';

export class PlayersUseCases {
  constructor(private readonly playersRepository: IPlayersRepository) {}

  async getPlayerById(id: string): Promise<Player | undefined> {
    return this.playersRepository.findById(id);
  }
}
