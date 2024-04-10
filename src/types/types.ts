//Categories
export interface ItemInterface {
  name: string;
  id: number;
}

export enum SortType {
  Default = 'default',
  A_Z = 'a-z',
  Z_A = 'z-a',
}

//Details
export interface ICharacterDetails {
  name: string;
  image: string;
  species: string;
  status: string;
  type?: string;
  gender: string;
  created: string;
}

export interface IEpisodeDetails {
  name: string;
  air_date: string;
  episode: string;
  created: string;
}

export interface ILocationDetails {
  name: string;
  type: string;
  dimension: string;
  created: string;
}

export enum ECategory {
  Character = 'character',
  Episode = 'episode',
  Location = 'location',
}
export type TDetails = ICharacterDetails | IEpisodeDetails | ILocationDetails;

//Sort
export interface ISortProps {
  sortType: string;
  onChangeSort: React.Dispatch<React.SetStateAction<SortType>>;
  sortList: string[];
}

//useGetData

export interface UseGetDataReturn {
  isLoading: boolean;
  data: ItemInterface[];
  hasMore: boolean;
  isPending: boolean;
}

//AuthProvider
export interface AuthContextType {
  user: string | null;
  signIn: (newUser: string, callback: () => void) => void;
  signOut: (callback: () => void) => void;
}
