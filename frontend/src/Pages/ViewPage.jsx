import { useRef, useEffect } from "react";
import domtoimage from "dom-to-image";
import { HomeIcon } from "lucide-react";
import { evaluateStore } from "../store/evaluateStore";
import { useNavigate, useParams } from "react-router-dom";

const ViewPage = () => {
  const { id } = useParams();
  const { currentEval, getOneEvaluation } = evaluateStore();

  useEffect(() => {
    if (id) getOneEvaluation(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const navigate = useNavigate();
  const componentRef = useRef(null);
  const handleDownload = () => {
    const node = componentRef.current;

    const options = {
      quality: 1,
      width: node.clientWidth,
      height: node.clientHeight,
      style: {
        margin: "0",
        padding: "0",
      },
    };

    domtoimage
      .toPng(node, options)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "evaluation-details.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating image", error);
      });
  };

  return (
    <div className="ml-4 sm:ml-10 lg:ml-64 mt-14 p-4 min-h-screen bg-base-200">
      <div
        className="max-w-5xl mx-auto bg-white rounded-lg shadow-md my-6"
        ref={componentRef}
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Evaluation Details
          </h1>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Project name / Group Name
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {currentEval?.title}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {currentEval?.createdAt}
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-lg pl-5 text-black"> Members</h1>
          <div className="grid grid-cols-2 items-center gap-2 m-4 mb-8">
            {currentEval?.member?.map((mem, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-auto rounded bg-none border-2 border-black"
              >
                <h1 className="text-black">{mem}</h1>
              </div>
            ))}
          </div>

          <div className="flex justify-center my-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 items-center  border-2 border-black rounded pr-8 gap-4">
              {currentEval?.assessmentFramework?.scoringScale?.map(
                (scoreScale) => (
                  <div
                    key={scoreScale._id || scoreScale.score}
                    className="flex items-center justify-center rounded"
                  >
                    <h1 className="text-black">
                      <span className="">{scoreScale.score}</span> -{" "}
                      {scoreScale.description}
                    </h1>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-700 text-white py-3 px-4 text-left rounded-tl-lg">
                      Criteria
                    </th>

                    <th className="bg-gray-700 text-white py-3 px-4 text-center rounded-tr-lg w-32">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEval?.criteriaAndScore?.map((CNS) => (
                    <tr key={CNS._id}>
                      <td className="py-3 text-black px-4 border-b border-gray-200">
                        <span className="text-2xl">• </span>
                        {CNS.criteriaName}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 text-center font-medium">
                        <span className="inline-block bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                          {CNS.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h1 className="text-xl text-black">
            Total Score: {currentEval?.criteriaTotalScore}
          </h1>
        </div>
      </div>

      <div className="flex justify-end mt-8 max-w-5xl mx-auto">
        <button className="btn btn-primary mr-2" onClick={handleDownload}>
          Download Report
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          <HomeIcon size={18} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default ViewPage;
