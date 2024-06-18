export interface ILeague {
  id: string;
  name: string;
  sport: string;
  teams: string[];
}

export class League {
  id: string;
  name: string;
  sport: string;
  teams: string[];

  teamsIds: Set<string>;

  constructor(data: ILeague) {
    this.id = data.id;
    this.name = data.name;
    this.sport = data.sport;
    this.teams = data.teams;

    this.teamsIds = new Set(data.teams);
  }

  toJSON(): ILeague {
    return {
      id: this.id,
      name: this.name,
      sport: this.sport,
      teams: this.teams,
    };
  }
}
