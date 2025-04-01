import { PlusSquare, SquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";

const CreateAssessmentModal = () => {
  const { createAssessment, isCreating } = assessmentFrameworkStore();
  const [criteriaFields, setCriteriaFields] = useState([{ criteria: "" }]);

  const handleAddCriteria = () => {
    setCriteriaFields([...criteriaFields, { criteria: "" }]);
  };

  const handleDeleteCriteria = (index) => {
    setCriteriaFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleChangee = (index, event) => {
    const updatedFields = [...criteriaFields];
    updatedFields[index].criteria = event.target.value;
    setCriteriaFields(updatedFields);
  };

  const [page, setPage] = useState(true);

  const [fields, setFields] = useState([{ score: "", description: "" }]);

  //add
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

  const [Title, setTitle] = useState({ title: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit called!");

    const newData = {
      title: Title.title,
      scoringScale: fields,
      criteria: criteriaFields,
    };

    createAssessment(newData);
    console.log(`NewData: ${JSON.stringify(newData, null, 2)}`);

    setTitle({ title: "" });
    setFields([{ score: "", description: "" }]);
    setCriteriaFields([{ criteria: "" }]);
  };

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-5 grid place-items-center"
        >
          {page ? (
            <>
              <h3 className="flex justify-center font-bold text-lg">
                Create Rubric
              </h3>
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
          ) : (
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
              <div className="flex grid-cols-2 justify-center m-10 mb-5 gap-4">
                <div>
                  <button
                    className="w-20 h-10 rounded btn-active btn-primary"
                    disabled={
                      isCreating ||
                      !Title.title ||
                      !criteriaFields ||
                      !fields ||
                      !isValid ||
                      !isValidCriteria
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
                    onClick={closeModal}
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
          <div className="flex justify-end">
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="1"
              defaultChecked
              onClick={() => setPage(true)}
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="2"
              onClick={() => setPage(false)}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreateAssessmentModal;
