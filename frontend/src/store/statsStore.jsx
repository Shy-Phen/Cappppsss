import { create } from "zustand";
import { axiosInstance } from "../axios/axios";

export const statsStore = create((set) => ({
  loading: false,
  stats: {
    totalRubrics: 0,
    totalEvaluations: 0,
  },

  fetchStats: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/stats");
      set({ stats: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
