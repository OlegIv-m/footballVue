export interface Command {
  address: string;
  clubColors: string;
  crest: string;
  founded: number;
  id: number;
  lastUpdated: string;
  name: string;
  shrtName: string;
  tla: string;
  venue: string;
  website: string;
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: Command;
}

type CompetitionType = "LEAGUE" | "SUPER_CUP" | "CUP" | "PLAYOFFS";

export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  type: CompetitionType;
  emblem?: string | null;
  plan: string;
  currentSeason: Season;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

export interface Player {
  id: number;
  name: string;
  position: "Goalkeeper" | "Defence" | "Midfield" | "Offence" | null;
  dateOfBirth: string;
  nationality: string;
}

export interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: {
    start: string;
    until: string;
  };
}

export interface Team {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: {
    id: number;
    name: string;
    code: string;
    type: CompetitionType;
    emblem: string;
  }[];
  coach: Staff;
  squad: Player[];
  staff: Staff[];
  lastUpdated: string;
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: any[] | null;
  lastUpdated: string;
  homeTeam: Pick<Team, "id" | "name" | "shortName" | "tla" | "crest">;
  awayTeam: Pick<Team, "id" | "name" | "shortName" | "tla" | "crest">;
  score: {
    winner: string;
    duration: string;
    fullTime: {
      home: number;
      away: number;
    };
    halfTime: {
      home: number;
      away: number;
    };
  };
  referees: {
    id: number;
    name: string;
    type: string;
    natinality: string;
  }[];
}
