import { PlusCircleIcon, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { statsStore } from "../store/statsStore";
import { useEffect } from "react";

const HomePage = () => {
  const { fetchStats, stats, loading } = statsStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  console.log(stats);

  const { authUser } = useAuthStore();

  const navigate = useNavigate();

  const handleRubric = () => {
    navigate("/assessment-framework");
  };

  const handleEvaluate = () => {
    navigate("/evaluate");
  };
  return (
    <div className="ml-10 lg:ml-64 mt-14 h-screen overflow-auto bg-base-200">
      {loading && (
        <div className="flex items-center justify-center h-screen ">
          <Loader className="size-10 animate-spin" />
        </div>
      )}
      <div className="flex pl-12 pb-5 items-center">
        <h1 className="mt-10 text-xl lg:text-3xl">
          Hello, <span className="text-blue-400">{authUser?.username}</span>
        </h1>
      </div>
      <div className="w-auto h-full">
        <div className="grid lg:grid-cols-2 gap-8 h-44 mx-3 lg:mx-11 rounded">
          <div className="h-44 bg-blue-700 rounded flex flex-col justify-between">
            <div className="mt-5 ml-7">
              <h1 className="stats-title">Total Rubrics</h1>
              <h1 className="stat-value text-black">
                {stats?.totalRubrics?.toString() || "0"}
              </h1>
            </div>
            <div className="flex justify-end mb-4 mr-7">
              <button
                onClick={handleRubric}
                className="btn btn-primary sm:btn-sm md:btn-md"
              >
                <PlusCircleIcon /> Rubrics
              </button>
            </div>
          </div>
          <div className="h-44 bg-blue-700 rounded flex flex-col justify-between">
            <div className="mt-5 ml-7">
              <h1 className="stats-title">Total Evaluations</h1>
              <h1 className="stat-value text-black">
                {stats?.totalEvaluations?.toString() || "0"}
              </h1>
            </div>
            <div className="flex justify-end mb-4 mr-7">
              <button
                onClick={handleEvaluate}
                className="btn btn-primary sm:btn-sm md:btn-md"
              >
                <PlusCircleIcon /> Evaluate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
