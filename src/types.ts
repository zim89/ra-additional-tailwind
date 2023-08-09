export type Note = {
  id: string;
  created_at: string;
  name: string;
  category: string;
  content: string;
  dates: string[];
  isArchived: boolean;
};

export type EditedNote = {
  id: string;
  name: string;
  category: string;
  content: string;
  date: string;
};

export type Stats = {
  category: string;
  active: number;
  archived: number;
};
