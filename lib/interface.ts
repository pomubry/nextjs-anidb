// For arguments of fetchQuery.ts
export interface IVariables {
  id?: number;
  page?: number;
  season?: string;
  seasonYear?: number;
  search?: string;
}
export interface IQueryCurrentSeason extends IVariables {
  getCurrentSeason?: boolean;
}

// For catch clause typing
export interface IErrorClause {
  message: string;
}
