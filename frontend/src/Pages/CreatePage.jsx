import { evaluateStore } from "../store/evaluateStore";
import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";
import { ArrowRight, PlusCircle, Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CreatePage = () => {
  const { getAllAssessmentFramework, assessments } = assessmentFrameworkStore();
  const {
    createEvaluation,
    evalFormData,
    setEvalFormData,
    getOneAssessment,
    currentAssessmentt,
    updateCriteriaScore,
  } = evaluateStore();

  const navigate = useNavigate();
  const [Page, setPage] = useState(true);
  const [show, setShow] = useState(false);

  // Fetch assessments on mount
  useEffect(() => {
    getAllAssessmentFramework();
  }, [getAllAssessmentFramework]);

  // Member management
  const members = Array.isArray(evalFormData.member)
    ? evalFormData.member
    : [""];

  const handleBackNavigate = () => navigate("/evaluate");
  const handleToggle = (e) => {
    e.preventDefault();
    setPage((prev) => !prev);
  };

  const addMember = () => {
    setEvalFormData({
      ...evalFormData,
      member: [...members, ""],
    });
  };

  const updateMember = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setEvalFormData({
      ...evalFormData,
      member: updatedMembers,
    });
  };

  const removeMember = (index) => {
    setEvalFormData({
      ...evalFormData,
      member: members.filter((_, i) => i !== index),
    });
  };

  const handleSelectedAssessment = (id) => {
    getOneAssessment(id);
    setShow(true);
  };

  const handleScoreChange = (criteriaName, score) => {
    updateCriteriaScore(criteriaName, score);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = [];
    if (!evalFormData.title.trim()) validationErrors.push("Title is required");
    if (evalFormData.member.filter((m) => m.trim() !== "").length === 0) {
      validationErrors.push("At least one member is required");
    }
    if (
      evalFormData.member.length === 0 ||
      evalFormData.member.some((member) => member.trim() === "")
    ) {
      validationErrors.push("All team members must have a name");
    }
    if (!evalFormData.assessmentFramework) {
      validationErrors.push("Select Rubric");
    }
    if (evalFormData.criteriaAndScore.some((item) => item.score === 0)) {
      validationErrors.push("Score all criteria before submitting");
    }

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    try {
      await createEvaluation();
      navigate("/evaluate"); // Redirect to success page
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="ml-10 lg:ml-64 h-full bg-base-200">
      <div className="flex justify-center items-center h-screen p-5 bg-base-200">
        <form onSubmit={handleSubmit}>
          {Page ? (
            <div className="">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Project title/Group name"
                  className="input input-bordered w-full max-w-xs"
                  value={evalFormData.title}
                  onChange={(e) =>
                    setEvalFormData({ ...evalFormData, title: e.target.value })
                  }
                  required
                />
              </label>

              <div className="flex justify-between items-center mb-2 mt-3">
                <span className="label-text">Members</span>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={addMember}
                >
                  Add Member
                </button>
              </div>

              <div className="my-4 h-28 overflow-scroll">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="input input-bordered w-full max-w-xs"
                      value={member}
                      onChange={(e) => updateMember(index, e.target.value)}
                    />
                    {members.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => removeMember(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {show ? (
                <div className="mt-20 bg-base-200 border-zinc-200 rounded p-4 h-96 overflow-scroll">
                  {currentAssessmentt?.criteria.map((criterion) => {
                    const currentScore = evalFormData.criteriaAndScore.find(
                      (item) => item.criteriaName === criterion.criteria
                    )?.score;

                    return (
                      <div
                        key={criterion._id}
                        className="mb-6 p-6 rounded-lg shadow-md shadow-black"
                      >
                        <div className="mb-4 border-b border-black h-10 w-auto">
                          <p className="text-lg font-semibold mb-4">
                            <span className="text-xl">• </span>
                            {criterion.criteria}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {currentAssessmentt?.scoringScale.map((scale) => (
                            <div
                              key={scale._id}
                              className="flex items-center gap-3"
                            >
                              <input
                                type="radio"
                                id={`scoringScale_${criterion._id}_${scale.score}`}
                                name={`scoringScale_${criterion._id}`}
                                value={scale.score}
                                onChange={() =>
                                  handleScoreChange(
                                    criterion.criteria,
                                    scale.score
                                  )
                                }
                                checked={currentScore === scale.score}
                                className={`radio ${
                                  currentScore === 0
                                    ? "radio-error"
                                    : "radio-primary"
                                }`}
                              />
                              <label
                                htmlFor={`scoringScale_${criterion._id}_${scale.score}`}
                                className="flex-1"
                              >
                                <span className="font-medium">
                                  {scale.score}
                                </span>
                                <span className="ml-2 text-white">
                                  - {scale.description}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full flex justify-center items-center">
                  <div className="dropdown dropdown-bottom">
                    <label tabIndex={0} className="btn btn-primary m-1">
                      Select a rubric for evaluation
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {assessments.map((assessment) => (
                        <li key={assessment._id}>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectedAssessment(assessment._id)
                            }
                            className="hover:bg-gray-100 p-2 rounded"
                          >
                            {assessment.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-center items-center gap-4 m-5">
            {Page ? (
              <>
                <button
                  className="btn btn-neutral"
                  onClick={handleBackNavigate}
                  type="button"
                >
                  <Undo2 /> Back
                </button>
                <button
                  className="btn bg-primary btn-md text-black"
                  onClick={handleToggle}
                  type="button"
                  disabled={
                    !evalFormData.title ||
                    evalFormData.member.length === 0 ||
                    evalFormData.member.some((member) => member.trim() === "")
                  }
                >
                  Next <ArrowRight className="ml-1" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn bg-primary btn-md text-black"
                  onClick={handleToggle}
                  type="button"
                >
                  Back <Undo2 className="ml-1" />
                </button>
                <button
                  type="submit"
                  className="btn bg-primary btn-md text-black"
                  disabled={evalFormData.criteriaAndScore.some(
                    (item) => item.score === 0
                  )}
                >
                  <PlusCircle />
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
