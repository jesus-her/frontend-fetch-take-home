export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export enum SortBy {
  NONE = "none",
  NAME = "name",
  LAST = "last",
  BREED = "breed",
}
