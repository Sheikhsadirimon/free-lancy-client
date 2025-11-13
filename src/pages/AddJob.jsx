import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddJob = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.summary ||
      !formData.coverImage
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    axiosSecure.post("/Jobs", {
      ...formData,
      postedBy: user?.displayName || user?.email?.split("@")[0],
      email: user?.email,
    });

    toast.success("Job posted successfully!");

    setFormData({
        title: "",
        category: "",
        summary: "",
        coverImage: "",
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-center mb-6">
              Post a New Job
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior React Developer"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Summary</span>
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Brief description of the job..."
                  className="textarea textarea-bordered w-full h-32"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Cover Image URL
                  </span>
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Posted By</span>
                </label>
                <input
                  type="text"
                  value={
                    user?.displayName ||
                    user?.email?.split("@")[0] ||
                    "Anonymous"
                  }
                  className="input input-bordered w-full bg-base-200"
                  disabled
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="input input-bordered w-full bg-base-200"
                  disabled
                />
              </div>

              <div className="flex gap-4 justify-end mt-8">
                <Link to="/">
                  <button type="button" className="btn btn-ghost">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary px-8"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Posting...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
