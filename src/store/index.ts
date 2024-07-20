import { create } from "zustand";

type Store = {
  title: string;
  startTime: number;
  time: number;
  problems: [];
  board: string;
  loading: boolean;
  news: [];
  restartContainer: boolean;
  upLoadWp: boolean;
  solvedList: [];
  teamName: string;
  points: number;
  allTeams: [];
  mySolvedInfo: {};
  setTitle: (title: string) => void;
  setTime: (time: number) => void;
  setStartTime: (time: number) => void;
  setProblems: (problems: []) => void;
  setBoard: (board: string) => void;
  setLoading: (loading: boolean) => void;
  setNews: (news: []) => void;
  setRestartContainer: (restartContainer: boolean) => void;
  setUpLoadWp: (upLoadWp: boolean) => void;
  setSolvedList: (solvedList: []) => void;
  setTeamName: (teamName: string) => void;
  setPoints: (points: number) => void;
  setAllTeams: (allTeams: []) => void;
  setMySolvedInfo: (mySolvedInfo: []) => void;
};

const useAppStore = create<Store>((set) => ({
  loading: true,
  title: "",
  time: 0,
  problems: [],
  board: "",
  news: [],
  restartContainer: false,
  upLoadWp: false,
  solvedList: [],
  teamName: "",
  points: 0,
  allTeams: [],
  startTime: 0,
  mySolvedInfo: {},
  setBoard: (board) => set({ board }),
  setStartTime: (startTime) => set({ startTime }),
  setNews: (news) => set({ news }),
  setProblems: (problems) => set({ problems }),
  setTime: (time) => set({ time }),
  setTitle: (title) => set({ title }),
  setLoading: (loading) => set({ loading }),
  setRestartContainer: (restartContainer) => set({ restartContainer }),
  setUpLoadWp: (upLoadWp) => set({ upLoadWp }),
  setSolvedList: (solvedList) => set({ solvedList }),
  setPoints: (points) => set({ points }),
  setTeamName: (teamName) => set({ teamName }),
  setAllTeams: (allTeams) => set({ allTeams }),
  setMySolvedInfo: (mySolvedInfo) => set({ mySolvedInfo }),
}));

export default useAppStore;
