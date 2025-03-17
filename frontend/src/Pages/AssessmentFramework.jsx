import { PlusCircleIcon } from "lucide-react";
import { assessmentFrameworkStore } from "../store/assessmentFrameworkStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import AssessmentCard from "../Components/assessmentCard";
import CreateAssessmentModal from "../Components/CreateAssessmentModal";
import ViewAndEditCard from "../Components/ViewAndEditCard";

const AssessmentFramework = () => {
  const { getAllAssessmentFramework, loading, assessments } =
    assessmentFrameworkStore();

  useEffect(() => {
    getAllAssessmentFramework();
  }, [getAllAssessmentFramework]);

  return (
    <div className="ml-10 lg:ml-64 mt-14 h-screen overflow-auto bg-base-200">
      {assessments.length === 0 && !loading && (
        <div className="flex justify-center items-center size-full">
          <h1 className="text-white text-4xl">Create Rubric</h1>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-screen ">
            <Loader className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-8 gap-4">
            {assessments.map((assessment) => (
              <AssessmentCard key={assessment._id} assessment={assessment} />
            ))}
          </div>
        )}
      </div>
      <CreateAssessmentModal />
      <ViewAndEditCard />
      <div className=" flex justify-center items-center rounded-full size-10 bg-black hover:bg-white absolute right-5 bottom-5">
        <button
          className="flex justify-center items-center bg-zinc-50 rounded-full"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <PlusCircleIcon className="w-8 text-white bg-black h-8 rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default AssessmentFramework;
