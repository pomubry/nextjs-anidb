import React from "react";
import { Page } from "./IQuery";
import { Media } from "./IQueryId";

// For arguments of fetchQuery.ts
export interface IVariables {
  id?: number;
  page?: number;
  season?: string;
  seasonYear?: number | string;
  search?: string;
}
export interface IQueryCurrentSeason extends IVariables {
  getCurrentSeason?: boolean;
}

// For context
export interface IContext {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

// For react child
export interface IChildren {
  children: React.ReactNode;
}

// For fetching methods
interface FetchSuccess {
  error: false;
}

interface FetchQuerySuccess extends Page, FetchSuccess {
  variables: IVariables;
}

interface FetchQueryIdSuccess extends FetchSuccess {
  media: Media;
}

interface ErrorType {
  error: true;
}

export type FetchQueryReturn = FetchQuerySuccess | ErrorType;
export type FetchQueryIdReturn = FetchQueryIdSuccess | ErrorType;
