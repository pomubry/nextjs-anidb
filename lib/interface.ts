import React from "react";

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

// For context
export interface IContext {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

export interface IChildren {
  children: React.ReactNode;
}
