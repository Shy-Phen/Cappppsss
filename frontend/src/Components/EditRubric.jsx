import { useEffect } from "react";
import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";

const EditRubric = () => {
  const { currentAssessment, formData, setFormData, updateAssessment } =
    assessmentFrameworkStore();

  // Ensure each criteria has descriptor array with correct length
  useEffect(() => {
    if (formData && formData.criteria && formData.scoringScale) {
      const scaleCount = formData.scoringScale.length;

      const updatedCriteria = formData.criteria.map((criteriaItem) => {
        let descriptorArray = criteriaItem.descriptor || [];

        // Adjust descriptor array length to match scoring scale length
        while (descriptorArray.length < scaleCount) {
          descriptorArray.push("");
        }
        while (descriptorArray.length > scaleCount) {
          descriptorArray.pop();
        }

        return {
          ...criteriaItem,
          descriptor: descriptorArray,
        };
      });

      if (
        JSON.stringify(updatedCriteria) !== JSON.stringify(formData.criteria)
      ) {
        setFormData({
          ...formData,
          criteria: updatedCriteria,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    document.getElementById("my_modal_3").close();
  };

  // Handle descriptor change
  const handleDescriptorChange = (criteriaIndex, descriptorIndex, value) => {
    const updatedCriteria = [...formData.criteria];

    // Ensure descriptor array exists
    if (!updatedCriteria[criteriaIndex].descriptor) {
      updatedCriteria[criteriaIndex].descriptor = Array(
        formData.scoringScale.length
      ).fill("");
    }

    updatedCriteria[criteriaIndex].descriptor[descriptorIndex] = value;
    setFormData({ ...formData, criteria: updatedCriteria });
  };

  return (
    <dialog id="my_modal_3" className="modal overflow-y-auto">
      <div className="modal-box max-w-3xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>

        <h3 className="font-bold text-xl text-center mb-4">Edit Rubric</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAssessment(currentAssessment._id);
            closeModal();
          }}
          className="space-y-6"
        >
          <div className=" p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">Rubric Title</h4>
            <input
              type="text"
              placeholder="Assessment title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className=" p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">Scoring Scales</h4>
            <div className="mt-3 space-y-4">
              {formData.scoringScale.map((scale, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 items-center"
                >
                  <div className="col-span-2">
                    <label className="label text-sm">Score</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={scale.score}
                      onChange={(e) => {
                        const updatedScales = [...formData.scoringScale];
                        updatedScales[index].score = e.target.value;
                        setFormData({
                          ...formData,
                          scoringScale: updatedScales,
                        });
                      }}
                    />
                  </div>
                  <div className="col-span-10">
                    <label className="label text-sm">Description</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={scale.description}
                      onChange={(e) => {
                        const updatedScales = [...formData.scoringScale];
                        updatedScales[index].description = e.target.value;
                        setFormData({
                          ...formData,
                          scoringScale: updatedScales,
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">
              Criteria & Descriptors
            </h4>
            <div className="mt-3 space-y-6">
              {formData.criteria.map((criteriaItem, criteriaIndex) => (
                <div key={criteriaIndex} className=" pb-4 last:border-b-0">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">
                      Criteria {criteriaIndex + 1}
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={criteriaItem.criteria}
                      onChange={(e) => {
                        const updatedCriteria = [...formData.criteria];
                        updatedCriteria[criteriaIndex].criteria =
                          e.target.value;
                        setFormData({
                          ...formData,
                          criteria: updatedCriteria,
                        });
                      }}
                    />
                  </div>

                  <div className="ml-4 mt-2">
                    <h5 className="text-sm font-medium mb-2">Descriptors</h5>

                    <div className="space-y-3">
                      {formData.scoringScale.map((scale, scaleIndex) => (
                        <div key={scaleIndex} className="p-3 rounded">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              Score {scale.score}:
                            </span>
                            <span className="text-xs text-gray-600">
                              {scale.description}
                            </span>
                          </div>

                          <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder={`Descriptor for score level ${scale.score}`}
                            value={
                              (criteriaItem.descriptor &&
                                criteriaItem.descriptor[scaleIndex]) ||
                              ""
                            }
                            onChange={(e) =>
                              handleDescriptorChange(
                                criteriaIndex,
                                scaleIndex,
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button className="btn btn-primary" type="submit">
              Update Rubric
            </button>

            <button
              className="btn btn-neutral"
              onClick={closeModal}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditRubric;
