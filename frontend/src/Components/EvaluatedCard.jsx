import { Trash2, View } from "lucide-react";
import { evaluateStore } from "../store/evaluateStore";
import { useNavigate } from "react-router-dom";

const EvaluatedCard = ({ evalu }) => {
  const { deleteEvaluation, getOneEvaluation } = evaluateStore();
  const navigate = useNavigate();

  const handleView = async (id) => {
    await getOneEvaluation(id);
    navigate("/view");
  };

  return (
    <div className="rounded-lg p-6 bg-slate-900 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
      {/* Group Name */}
      <h2 className="text-lg font-semibold text-white mb-2">
        Group/Project name: <span className="text-blue-300">{evalu.title}</span>
      </h2>

      {/* Member */}
      <p className="text-xs text-slate-300 mb-4">
        Member: <span className="font-medium">{evalu.member[0]}</span>
      </p>

      {/* Date and Actions */}
      <div className="flex justify-between items-center">
        {/* Date */}
        <p className="text-sm text-slate-400">
          {new Date(evalu.createdAt).toLocaleDateString()}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Delete Button */}
          <button
            aria-label="Delete evaluation"
            className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              if (evalu._id) {
                deleteEvaluation(evalu._id);
              } else {
                console.error("Evaluation ID is missing");
              }
            }}
          >
            <Trash2 className="size-4 text-white" />
          </button>

          {/* View Button */}
          <button
            aria-label="View evaluation"
            className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => handleView(evalu._id)}
          >
            <View className="size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluatedCard;
