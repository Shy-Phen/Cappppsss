import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";
import { EyeIcon } from "lucide-react";
const SearchRubricCard = ({ rubricData }) => {
  const { getOneAssessment, currentAssessment } = assessmentFrameworkStore();

  const handleView = async (id) => {
    await getOneAssessment(id);
    document.getElementById("viewRubric").showModal();
  };

  return (
    <div className="rounded-lg p-6 bg-slate-900 shadow-lg hover:shadow-xl h-40 w-full flex flex-col justify-between">
      <dialog id="viewRubric" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{currentAssessment?.title}</h3>

          <table className="w-full border-separate border-spacing-0 rounded-lg border border-gray-300 overflow-hidden mt-8">
            <thead>
              <tr className="bg-gray-950">
                <th className="p-2 border-b border-r border-gray-300 text-left">
                  Level
                </th>
                <th className="p-2 border-b border-gray-300 text-left">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAssessment?.scoringScale?.map((CNS) => (
                <tr key={CNS._id} className="hover:bg-black">
                  <td className="p-1 border-b border-r border-gray-300 text-left">
                    {CNS.description}
                  </td>
                  <td className="p-1 border-b border-gray-300 text-left">
                    {CNS.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="w-full border-separate border-spacing-0 rounded-lg border border-gray-300 overflow-hidden mt-8">
            <thead>
              <tr className="bg-gray-950">
                <th className="p-2 border-b border-r border-gray-300 text-center">
                  Performance Criteria
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAssessment?.criteria?.map((cri) => (
                <tr key={cri._id} className="hover:bg-black">
                  <td className="p-1 border-b border-gray-300 text-left">
                    {cri.criteria}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dialog>

      <h2 className="text-sm font-semibold text-white mb-2">
        Group/Project name:{" "}
        <span className="text-sm text-blue-300">{rubricData.title}</span>
      </h2>

      <div className="flex items-center gap-8">
        <p className="text-sm text-slate-400">
          {new Date(rubricData.createdAt).toLocaleDateString()}
        </p>

        <button
          className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {
            handleView(rubricData._id);
          }}
        >
          <EyeIcon className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchRubricCard;
