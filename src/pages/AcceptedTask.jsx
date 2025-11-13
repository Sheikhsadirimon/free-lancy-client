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
    axiosSecure
      .get(`/accepted-tasks?email=${user.email}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user, axiosSecure]);

  const handleAction = async (acceptedTaskId, jobId, action) => {
    const isDone = action === "done";
    const result = await Swal.fire({
      title: isDone ? "Mark as Done?" : "Cancel Task?",
      text: isDone
        ? "This task will be completed and removed from all jobs."
        : "This task will be cancelled and removed from all jobs.",
      icon: isDone ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: isDone ? "#22c55e" : "#ef4444",
      confirmButtonText: isDone ? "Yes, Done!" : "Yes, Cancel!",
      cancelButtonText: "No, Keep",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/accepted-tasks/${acceptedTaskId}`);

      setTasks((prev) => prev.filter((t) => t._id !== acceptedTaskId));

      toast.success(
        isDone ? "Task completed and removed!" : "Task cancelled and removed"
      );
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to remove task");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          My Accepted Tasks
        </h2>

        <div className="block lg:hidden">
          {tasks.length === 0 ? (
            <p className="text-center py-12">
              You haven't accepted any tasks yet.
            </p>
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
                      <span className="badge badge-primary badge-sm">
                        {task.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1">
                      {task.title}
                    </h3>
                    <p className="text-sm opacity-80 mt-1 line-clamp-2">
                      {task.summary}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() =>
                          handleAction(task._id, task.jobId, "done")
                        }
                        className="btn btn-success btn-sm flex-1"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleAction(task._id, task.jobId, "cancel")
                        }
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

        <div className="hidden lg:block overflow-x-auto">
          {tasks.length === 0 ? (
            <p className="text-center py-12">
              You haven't accepted any tasks yet.
            </p>
          ) : (
            <table className="table table-zebra w-full bg-base-100 rounded-xl shadow-lg">
              <thead>
                <tr className="text-left">
                  <th className="w-32"></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Summary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-base-200">
                    <td>
                      <div className="avatar">
                        <div className="w-20 h-20 rounded-lg overflow-hidden">
                          <img
                            src={task.coverImage}
                            alt={task.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{task.title}</td>
                    <td>
                      <div className="badge badge-primary badge-sm">
                        {task.category}
                      </div>
                    </td>
                    <td className="max-w-xs text-sm opacity-80 line-clamp-3">
                      {task.summary}
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleAction(task._id, task.jobId, "done")
                          }
                          className="btn btn-success btn-xs"
                          title="Mark as Done"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleAction(task._id, task.jobId, "cancel")
                          }
                          className="btn btn-error btn-xs"
                          title="Cancel Task"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptedTasks;
