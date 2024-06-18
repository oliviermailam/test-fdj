export interface ITeam {
  id: string;
  name: string;
  thumbnail: string;
  players: string[];
}

export class Team implements ITeam {
  id: string;
  name: string;
  thumbnail: string;
  players: string[];

  playersIds: Set<string>;

  constructor(data: ITeam) {
    this.id = data.id;
    this.name = data.name;
    this.thumbnail = data.thumbnail;
    this.players = data.players;

    this.playersIds = new Set(data.players);
  }

  toJSON(): ITeam {
    return {
      id: this.id,
      name: this.name,
      thumbnail: this.thumbnail,
      players: this.players,
    };
  }
}
