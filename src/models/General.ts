export interface IID {
  id: number;
}

export interface ICreated {
  created_at: string;
}

export interface IUpdated {
  updated_at: string;
}

export interface ITimestamps extends ICreated, IUpdated {}
