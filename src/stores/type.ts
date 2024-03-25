export interface IPicture {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface IAuthor {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  location: string;
}

export type UsingPicure = Omit<IPicture, 'authorId' | 'locationId'> & {
  author: string;
  location: string;
};
