import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "./Loading";

const AcceptedTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axiosSecure
      .get(`/accepted-tasks?email=${user.email}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, axiosSecure]);

  const handleAction = async (id, action) => {
    const isDone = action === "done";
    const result = await Swal.fire({
      title: isDone ? "Mark as Done?" : "Cancel Task?",
      text: isDone
        ? "This task will be marked as completed."
        : "This task will be removed from your list.",
      icon: isDone ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: isDone ? "#22c55e" : "#ef4444",
      confirmButtonText: isDone ? "Yes, Done!" : "Yes, Cancel!",
      cancelButtonText: "No, Keep",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/accepted-tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success(isDone ? "Task marked as done!" : "Task cancelled");
    } catch {
      toast.error("Failed to update task");
    }
  };

  

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">My Accepted Tasks</h2>

        {/* Mobile: Cards */}
        <div className="block lg:hidden">
          {tasks.length === 0 ? (
            <p className="text-center py-12">You haven't accepted any tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="card bg-base-100 shadow-md mb-6 rounded-xl overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-32 h-32 sm:h-auto">
                    <img
                      src={task.coverImage}
                      alt={task.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="badge badge-primary badge-sm">{task.category}</span>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1">{task.title}</h3>
                    <p className="text-sm opacity-80 mt-1 line-clamp-2">{task.summary}</p>
                    <p className="text-xs opacity-60 mt-2">
                      Accepted on: {new Date(task.acceptedAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleAction(task._id, "done")}
                        className="btn btn-success btn-sm flex-1"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleAction(task._id, "cancel")}
                        className="btn btn-error btn-sm flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop: Table */}
        
      </div>
    </div>
  );
};

export default AcceptedTasks;