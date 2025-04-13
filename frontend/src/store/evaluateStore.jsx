import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
import { toast } from "react-hot-toast";

export const evaluateStore = create((set, get) => ({
  evaluated: [],
  isCreatingEval: false,
  currentEval: null,
  loading: false,
  currentAssessmentt: null,

  evalFormData: {
    title: "",
    member: [],
    assessmentFramework: "",
    criteriaAndScore: [],
  },

  setEvalFormData: (updates) =>
    set((state) => ({
      evalFormData: { ...state.evalFormData, ...updates },
    })),

  resetForm: () =>
    set({
      evalFormData: {
        title: "",
        member: [],
        assessmentFramework: "",
        criteriaAndScore: [],
      },
    }),

  updateCriteriaScore: (criteriaName, score) => {
    set((state) => {
      const existingIndex = state.evalFormData.criteriaAndScore.findIndex(
        (item) => item.criteriaName === criteriaName
      );

      if (existingIndex >= 0) {
        const updatedCriteria = [...state.evalFormData.criteriaAndScore];
        updatedCriteria[existingIndex] = {
          ...updatedCriteria[existingIndex],
          score: Number(score),
        };

        return {
          evalFormData: {
            ...state.evalFormData,
            criteriaAndScore: updatedCriteria,
          },
        };
      }

      return {
        evalFormData: {
          ...state.evalFormData,
          criteriaAndScore: [
            ...state.evalFormData.criteriaAndScore,
            { criteriaName, score: Number(score) },
          ],
        },
      };
    });
  },

  createEvaluation: async () => {
    set({ loading: true });
    try {
      const { evalFormData } = get();

      const criteriaTotalScore = evalFormData.criteriaAndScore.reduce(
        (total, item) => total + item.score,
        0
      );
      const data = {
        ...evalFormData,
        criteriaTotalScore,
      };
      await axiosInstance.post("/evaluate", data);
      toast.success("Evaluation created successfully");
      get().resetForm();
    } catch (error) {
      console.error("Evaluation error:", error);
      toast.error(error.message || "Failed to create evaluation");
    } finally {
      set({ loading: false });
    }
  },

  getAllEvaluated: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/evaluate");
      console.log("This are the", res.data);
      set({ evaluated: res.data });
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      toast.error("Failed to fetch evaluations");
    } finally {
      set({ loading: false });
    }
  },

  getOneAssessmentt: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/assessment-framework/${id}`);
      const assessment = res.data.assessmentFramework;

      // Initialize criteriaAndScore with all criteria
      const initialScores = assessment.criteria.map((criterion) => ({
        criteriaName: criterion.criteria,
        score: 0, // Initialize scores to 0
      }));

      set({
        currentAssessmentt: assessment,
        evalFormData: {
          ...get().evalFormData,
          assessmentFramework: id,
          criteriaAndScore: initialScores,
        },
      });
    } catch (error) {
      console.error("Error loading assessment:", error);
      toast.error("Failed to load assessment");
    } finally {
      set({ loading: false });
    }
  },

  deleteEvaluation: async (id) => {
    set({ loading: true });
    try {
      console.log(`Deleting assessment with ID: ${id}`); // Debugging
      await axiosInstance.delete(`/evaluate/${id}`);
      set((state) => ({
        evaluated: state.evaluated.filter((evalu) => evalu._id !== id),
      })),
        toast.success("Deleted succesfully");
      console.log("hah");
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  getOneEvaluation: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/evaluate/${id}`);
      console.log("Fetched eval:", res.data.data);
      set({ currentEval: res.data.data });
    } catch (error) {
      console.log("Error in getting eval", error);
    } finally {
      set({ loading: false });
    }
  },
}));
