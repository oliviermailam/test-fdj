import { Team } from '@fdj/entities';

export interface ITeamsRepository {
  findByIds(ids: string[]): Promise<Team[]>;
  findById(id: string): Promise<Team | undefined>;
}
