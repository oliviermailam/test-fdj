import { Player } from '@fdj/entities';

export interface IPlayersRepository {
  findById(id: string): Promise<Player | undefined>;
  findByIds(ids: string[]): Promise<Player[]>;
}
