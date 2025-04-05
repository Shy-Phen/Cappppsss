import { PlusSquare, SquarePlus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";
import { useNavigate } from "react-router-dom";

const CreateRub = () => {
  const navigate = useNavigate();

  const { createAssessment, isCreating } = assessmentFrameworkStore();

  // State for criteria fields with descriptors
  const [criteriaFields, setCriteriaFields] = useState([
    { criteria: "", descriptor: [] },
  ]);

  // State for scoring scale
  const [fields, setFields] = useState([{ score: "", description: "" }]);

  // Title state
  const [Title, setTitle] = useState({ title: "" });

  // Active tab state
  const [activeTab, setActiveTab] = useState("1");

  // Update descriptors when criteria or scoring scale changes
  useEffect(() => {
    // Create updated criteria fields with correct number of descriptors
    const updatedCriteriaFields = criteriaFields.map((criteriaItem) => {
      // Ensure descriptor array is the same length as fields array
      const descriptors = [...criteriaItem.descriptor];

      // Add or remove descriptors to match fields length
      while (descriptors.length < fields.length) {
        descriptors.push("");
      }
      while (descriptors.length > fields.length) {
        descriptors.pop();
      }

      return {
        ...criteriaItem,
        descriptor: descriptors,
      };
    });

    setCriteriaFields(updatedCriteriaFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length]);

  const handleAddCriteria = () => {
    const emptyDescriptors = Array(fields.length).fill("");

    setCriteriaFields([
      ...criteriaFields,
      { criteria: "", descriptor: emptyDescriptors },
    ]);
  };

  const handleDeleteCriteria = (index) => {
    setCriteriaFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleChangee = (index, event) => {
    const updatedFields = [...criteriaFields];
    updatedFields[index].criteria = event.target.value;
    setCriteriaFields(updatedFields);
  };

  // Handle descriptor change
  const handleDescriptorChange = (criteriaIndex, descriptorIndex, value) => {
    const updatedFields = [...criteriaFields];
    updatedFields[criteriaIndex].descriptor[descriptorIndex] = value;
    setCriteriaFields(updatedFields);
  };

  //add scoring scale
  const handleFields = () => {
    setFields([...fields, { score: "", description: "" }]);
  };

  const handleDelete = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleChange = (index, key, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
  };

  const isValid = fields.every(
    (field) => field.score.trim() !== "" && field.description.trim() !== ""
  );

  const isValidCriteria = criteriaFields.every(
    (Criteria) => Criteria.criteria.trim() !== ""
  );

  // Check if all descriptors are filled
  const isValidDescriptors = criteriaFields.every((criteria) =>
    criteria.descriptor.every((desc) => desc.trim() !== "")
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        title: Title.title,
        scoringScale: fields,
        criteria: criteriaFields,
      };

      console.log("Submitting data...", newData);

      // Await the completion of createAssessment
      await createAssessment(newData);

      console.log("Submission successful, navigating...");

      // Delay navigation slightly to ensure state updates complete
      setTimeout(() => {
        navigate("/assessment-framework");
      }, 100);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to create rubric. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/assessment-framework");
  };

  return (
    <div className="ml-10 lg:ml-64 mt-20">
      <div className="grid place-items-center">
        <h1 className="text-2xl font-bold mb-6">Create Rubric</h1>
      </div>
      <div className="flex justify-between mb-8">
        <div
          className={`w-1/3 text-center pb-2 ${
            activeTab === "1" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Performance Level
        </div>
        <div
          className={`w-1/3 text-center pb-2 ${
            activeTab === "2" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Criteria
        </div>
        <div
          className={`w-1/3 text-center pb-2 ${
            activeTab === "3" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Descriptors
        </div>
      </div>
      <div className="mt-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-5 grid place-items-center"
        >
          {activeTab === "1" && (
            <>
              <label className="w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Rubric title</span>
                </div>
                <input
                  type="text"
                  placeholder="Example: Essay Evaluation Rubric"
                  className="input input-bordered w-full max-w-xs"
                  value={Title.title}
                  onChange={(e) =>
                    setTitle({ ...Title, title: e.target.value })
                  }
                />
              </label>
              <div className="w-full flex grid-cols-2 justify-center gap-28 md:gap-40 h-5">
                <h4 className="text-sm">Scoring Scale</h4>
                <div className="flex justify-items-center items-center space-x-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleFields}
                  >
                    <PlusSquare />
                  </button>
                </div>
              </div>

              {fields.map((field, index) => (
                <div
                  key={index}
                  className="flex grid-cols-2 gap-14 items-center"
                >
                  <label className="w-5 max-w-xs">
                    <div className="label">
                      <span className="label-text">Score</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-10 max-w-xs"
                      value={field.score}
                      onChange={(e) =>
                        handleChange(index, "score", e.target.value)
                      }
                    />
                  </label>
                  <label className="w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Description</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={field.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                    />
                  </label>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      className="rounded bg-red-500 text-white h-10 mt-10"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
          {activeTab === "2" && (
            <div className="w-full p-4">
              <div className="flex justify-center items-center size-8 absolute right-5 bg-cyan-600 rounded ">
                <h1 onClick={handleAddCriteria}>
                  <SquarePlus />
                </h1>
              </div>

              <h3 className="text-lg font-semibold mb-2">Set Criteria</h3>
              <div className="grid grid-cols-1 gap-4">
                {criteriaFields.map((field, index) => (
                  <div key={index} className="flex items-start gap-2 w-full">
                    <label className="form-control flex-1">
                      <div className="label">
                        <span className="label-text">Criteria</span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered h-10 w-full p-2"
                        placeholder="Enter criteria"
                        value={field.criteria}
                        onChange={(e) => handleChangee(index, e)}
                      />
                    </label>

                    {criteriaFields.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 rounded flex justify-center items-center h-10 w-8 mt-10 hover:bg-red-700 transition"
                        onClick={() => handleDeleteCriteria(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "3" && (
            <div className="w-full p-4">
              <h3 className="text-lg font-semibold mb-4">Set Descriptors</h3>

              {criteriaFields.map((criteria, criteriaIndex) => (
                <div
                  key={criteriaIndex}
                  className="mb-6 bg-black p-3 rounded-lg"
                >
                  <h4 className="font-medium mb-2">
                    {criteria.criteria || `Criteria ${criteriaIndex + 1}`}
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    {fields.map((scoreItem, scoreIndex) => (
                      <div key={scoreIndex} className=" p-2 rounded">
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium mr-2">
                            Scale/Perforamnce level: {scoreItem.score} -
                          </span>
                          <span className="text-xs text-white">
                            {scoreItem.description}
                          </span>
                        </div>
                        <textarea
                          className="textarea textarea-bordered w-full p-2"
                          placeholder={`Descriptor for this score level`}
                          value={criteria.descriptor[scoreIndex] || ""}
                          onChange={(e) =>
                            handleDescriptorChange(
                              criteriaIndex,
                              scoreIndex,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex grid-cols-2 justify-center m-10 mb-5 gap-4">
                <div>
                  <button
                    className="btn bg-primary btn-md text-black"
                    disabled={
                      isCreating ||
                      !Title.title ||
                      !criteriaFields ||
                      !fields ||
                      !isValid ||
                      !isValidCriteria ||
                      !isValidDescriptors
                    }
                    type="submit"
                  >
                    {isCreating ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                      </>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
                <div>
                  <button
                    className="w-20 h-10 rounded btn-neutral"
                    onClick={handleCancel}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="mt-5 flex justify-center">
          <div className="join">
            <button
              className={`join-item btn ${activeTab === "1" && "btn-active"} `}
              onClick={() => setActiveTab("1")}
            >
              1
            </button>
            <button
              className={`join-item btn ${activeTab === "2" && "btn-active"} `}
              onClick={() => setActiveTab("2")}
            >
              2
            </button>
            <button
              className={`join-item btn ${activeTab === "3" && "btn-active"} `}
              onClick={() => setActiveTab("3")}
            >
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRub;
