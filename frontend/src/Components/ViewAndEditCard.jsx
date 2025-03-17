import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";

const ViewAndEditCard = () => {
  const { currentAssessment, formData, setFormData, updateAssessment } =
    assessmentFrameworkStore();

  const closeModal = () => {
    document.getElementById("my_modal_3").close();
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg"></h3>
        <p className="py-4">{formData.title}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAssessment(currentAssessment._id);
          }}
        >
          <div className="flex items-center justify-center">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {formData.scoringScale.map((scale, index) => (
                <div key={index} className="grid grid-cols-2">
                  <div>
                    <label className="label">Score</label>
                    <input
                      type="Number"
                      className="input input-bordered w-10 md:w-16 max-w-xs"
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
                  <div>
                    <label className="label">Description</label>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
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
              {formData.criteria.map((item, index) => (
                <div key={index}>
                  <label className="label">Criteria</label>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={item.criteria}
                    onChange={(e) => {
                      const updatedCriteria = [...formData.criteria];
                      updatedCriteria[index].criteria = e.target.value;
                      setFormData({ ...formData, criteria: updatedCriteria });
                    }}
                  />
                </div>
              ))}
            </label>
          </div>
          <div className="flex grid-cols-2 justify-center items-center mt-4 gap-4">
            <button
              className="btn btn-sm hover:bg-slate-800 bg-cyan-500 rounded"
              type="submit"
            >
              Update
            </button>

            {/* if there is a button, it will close the modal */}
            <button className="btn btn-sm" onClick={closeModal} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ViewAndEditCard;
