import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyJobs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalJob, setModalJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  useEffect(() => {
    axiosSecure.get(`/Jobs?email=${user.email}`).then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  }, [user, axiosSecure]);

  const openModal = (job) => {
    setModalJob(job);
    setFormData({
      title: job.title,
      category: job.category,
      summary: job.summary,
      coverImage: job.coverImage,
    });
    document.getElementById("update_modal").showModal();
  };

  const closeModal = () => {
    setModalJob(null);
    setFormData({ title: "", category: "", summary: "", coverImage: "" });
    document.getElementById("update_modal").close();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!modalJob) return;

    try {
      await axiosSecure.patch(`/Jobs/${modalJob._id}`, formData);
      setJobs((prev) =>
        prev.map((j) => (j._id === modalJob._id ? { ...j, ...formData } : j))
      );
      toast.success("Job updated successfully!");
      closeModal();
    } catch {
      toast.error("Failed to update job");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/Jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      toast.success("Job deleted successfully");
    } catch {
      toast.error("Failed to delete job");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">My Added Jobs</h2>

        <div className="block lg:hidden">
          {jobs.length === 0 ? (
            <p className="text-center py-12">You haven't added any jobs yet.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="card bg-base-100 shadow-md mb-6 rounded-xl overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-32 h-32 sm:h-auto">
                    <img
                      src={job.coverImage}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="badge badge-primary badge-sm">
                        {job.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-sm opacity-80 mt-1 line-clamp-2">
                      {job.summary}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openModal(job)}
                        className="btn btn-warning btn-sm flex-1"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-error btn-sm flex-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hidden lg:block overflow-x-auto">
          {jobs.length === 0 ? (
            <p className="text-center py-12">You haven't added any jobs yet.</p>
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
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-base-200">
                    <td>
                      <div className="avatar">
                        <div className="w-20 h-20 rounded-lg overflow-hidden">
                          <img
                            src={job.coverImage}
                            alt={job.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{job.title}</td>
                    <td>
                      <div className="badge badge-primary badge-sm">
                        {job.category}
                      </div>
                    </td>
                    <td className="max-w-xs text-sm opacity-80 line-clamp-3">
                      {job.summary}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(job)}
                          className="btn btn-warning btn-xs"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-error btn-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <dialog id="update_modal" className="modal">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Update Job</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Category</option>
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>UI/UX Design</option>
                  <option>Data Science</option>
                  <option>DevOps</option>
                  <option>Marketing</option>
                  <option>Content Writing</option>
                  <option>Graphic Design</option>
                  <option>Video Editing</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Summary</span>
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-32"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Cover Image URL</span>
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Job
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyJobs;
