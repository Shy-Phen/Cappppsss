import { PlusCircleIcon, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { statsStore } from "../store/statsStore";
import { useEffect } from "react";
import ViewRubric from "../Components/ViewRubric";
import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";

const HomePage = () => {
  const { fetchStats, getEval, getRub, fetchEval, fetchRub, stats, loading } =
    statsStore();

  const { getOneAssessment } = assessmentFrameworkStore();

  useEffect(() => {
    fetchStats();
    getEval();
    getRub();
  }, [fetchStats, getEval, getRub]);

  const { authUser } = useAuthStore();

  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/assessment-framework");
  };

  const handleEvaluate = () => {
    navigate("/create");
  };

  const handleGoToCreateRub = () => {
    navigate("/createRubric");
  };

  const handleView = async (id) => {
    navigate(`/view/${id}`);
  };

  const handleseeAllEval = () => {
    navigate("/evaluate");
  };

  const handleViewRub = (id) => {
    getOneAssessment(id);
    <ViewRubric />;
    document.getElementById("viewModal").showModal();
  };

  console.log(fetchEval);
  return (
    <div className="ml-10 lg:ml-64 mt-14 h-screen overflow-auto bg-base-200">
      {loading && (
        <div className="flex items-center justify-center h-screen ">
          <Loader className="size-10 animate-spin" />
        </div>
      )}
      <ViewRubric />
      <div className="flex pl-12 pb-5 items-center">
        <h1 className="mt-10 text-xl lg:text-3xl">
          Hello, <span className="text-blue-400">{authUser?.username}</span>
        </h1>
      </div>
      <div className="w-auto h-full">
        <div className="grid lg:grid-cols-2 gap-8 h-40 mx-3 lg:mx-11 rounded">
          <div className="h-40 bg-blue-700 rounded flex flex-col justify-between">
            <div className="mt-5 ml-7">
              <h1 className="stats-title">Total Rubrics</h1>
              <h1 className="stat-value text-black">
                {stats?.totalRubrics?.toString() || "0"}
              </h1>
            </div>
            <div className="flex justify-end mb-4 lg:mr-7 overflow-hidden">
              <button
                className="btn btn-primary sm:btn-sm md:btn-md"
                onClick={handleGoToCreateRub}
              >
                <PlusCircleIcon /> Rubrics
              </button>
            </div>
          </div>
          <div className="h-40 bg-blue-700 rounded flex flex-col justify-between">
            <div className="mt-5 ml-7">
              <h1 className="stats-title">Total Evaluations</h1>
              <h1 className="stat-value text-black">
                {stats?.totalEvaluations?.toString() || "0"}
              </h1>
            </div>
            <div className="flex justify-end mb-4 lg:mr-7 overflow-hidden">
              <button
                onClick={handleEvaluate}
                className="btn btn-primary sm:btn-sm md:btn-md"
              >
                <PlusCircleIcon /> Evaluate
              </button>
            </div>
          </div>

          <div className="w-full h-36 col-span-2 rounded">
            <div className="flex justify-between px-2 items-center w-full h-8 my-2">
              <h1 className="font-semibold">Recent Rubrics</h1>
              <button
                className="bg-blue-700 p-1 rounded"
                onClick={handleSeeAll}
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto rounded-box border pt-2 border-base-content/5 bg-base-100">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchRub?.rub?.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No Rubrics Created Yet
                      </td>
                    </tr>
                  ) : (
                    fetchRub?.rub?.map((item) => (
                      <tr className="p-2" key={item._id}>
                        <td>{item.title}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
                        <td>
                          <button
                            className="bg-blue-700 p-2 rounded-lg"
                            onClick={() => handleViewRub(item._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between px-2 items-center w-full h-8 my-2">
              <h1 className="font-semibold">Recent Evaluations</h1>
              <button
                className="px-1 bg-blue-700 p-1 rounded"
                onClick={handleseeAllEval}
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto rounded-box border pt-2 border-base-content/5 bg-base-100">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchEval?.evaluate?.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No Evaluations Found
                      </td>
                    </tr>
                  ) : (
                    fetchEval?.evaluate?.map((item) => (
                      <tr className="p-2" key={item._id}>
                        <td>{item.title}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
                        <td>
                          <button
                            className="bg-blue-700 p-2 rounded-lg"
                            onClick={() => {
                              handleView(item._id);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
