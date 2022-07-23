// For multi-page query of fetchQuery.ts
export interface IVariables {
  id?: number;
  page?: number;
  season?: string;
  seasonYear?: number;
  search?: string;
}
export interface IQuery extends IVariables {
  getCurrentSeason?: boolean;
}

// For catch clause typing
export interface IErrorClause {
  message: string;
}

// For fetchQuery.ts
interface IStudioNodes {
  name: string;
  isAnimationStudio: boolean;
}
interface IStudioEdges {
  node: IStudioNodes;
}
interface IVoiceActors {
  image: {
    large: string;
  };
  name: {
    full: string;
  };
}
interface ICharacterNodes {
  node: {
    image: {
      large: string;
    };
    name: {
      full: string;
    };
  };
  role: string;
  voiceActors: IVoiceActors[];
}
interface IExternalLinks {
  site: string;
  url: string;
}
interface IRecommendations {
  mediaRecommendation: {
    id: number;
    title: {
      romaji: string;
    };
    coverImage: {
      extraLarge: string;
    };
  };
}
interface IRankings {
  rank: number;
  type: string;
  year: number | null;
  season: string | null;
  allTime: boolean;
  context: string;
}
interface IRelationType {
  relationType: string;
}
interface IRelationMedia {
  title: {
    romaji: string;
  };
  format: string;
  status: string;
  coverImage: {
    extraLarge: string;
  };
}
interface IStaff {
  role: string;
  node: {
    name: {
      full: string;
    };
    image: {
      large: string;
    };
  };
}
interface IStatusDistribution {
  status: string;
  amount: number;
}
interface IStreamingEpisodes {
  title: string;
  thumbnail: string;
  url: string;
}
interface ITags {
  rank: number;
  name: string;
}
interface IMedia {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    extraLarge: string;
    color: string | null;
  };
  description: string | null;
  episodes: number | null;
  format: string;
  genres: string[];
  nextAiringEpisode: { id: number } | null;
  season: string;
  seasonYear: number;
  studios: {
    edges: IStudioEdges[];
    nodes: IStudioNodes[];
  };
  trending: number;
}
export interface IFetchQuery {
  data: {
    Page: {
      pageInfo: {
        total: number;
        perPage: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
      };
      media: IMedia[];
    };
  };
}

// For fetchQueryID.ts
interface IMediaByID extends IMedia {
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string | null;
  };
  averageScore: number | null;
  bannerImage: string | null;
  characters: {
    edges: ICharacterNodes[];
  };
  duration: number | null;
  endDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  externalLinks: IExternalLinks[];
  favourites: number;
  meanScore: number | null;
  popularity: number;
  rankings: IRankings[];
  recommendations: {
    nodes: IRecommendations[];
  };
  relations: {
    edges: IRelationType[];
    nodes: IRelationMedia[];
  };
  source: string | null;
  staff: {
    edges: IStaff[];
  };
  stats: {
    statusdistribution: IStatusDistribution[];
  };
  status: string;
  startDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  streamingEpisodes: IStreamingEpisodes[];
  synonyms: string[];
  tags: ITags[];
  trailer: {
    id: string;
    site: "youtube";
  } | null;
}
export interface IFetchQueryId {
  data: {
    Media: IMediaByID;
  };
}
