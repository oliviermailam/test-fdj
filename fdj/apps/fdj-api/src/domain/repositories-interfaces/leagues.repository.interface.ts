import { League } from '@fdj/entities';

export interface ILeaguesRepository {
  findAll(): Promise<League[]>;
  findById(id: string): Promise<League | undefined>;
}
