import AssessmentFramework from "../models/assessmentFrameworkModel.js";
import { Evaluate } from "../models/evaluate.js";

export const getStats = async (req, res) => {
  try {
    const user = req.userId;

    // Count all evaluations created by this user
    const totalEvaluations = await Evaluate.countDocuments({ createdBy: user });
    const totalRubrics = await AssessmentFramework.countDocuments({
      createdBy: user,
    });

    res.status(200).json({
      totalEvaluations,
      totalRubrics,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};
