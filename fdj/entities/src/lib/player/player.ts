export interface IPlayer {
  id: string;
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: string;
  };
  born: Date;
}
export class Player {
  id: string;
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: string;
  };
  born: Date;

  constructor(data: IPlayer) {
    this.id = data.id;
    this.name = data.name;
    this.position = data.position;
    this.thumbnail = data.thumbnail;
    this.signin = data.signin;
    this.born = data.born;
  }
}
