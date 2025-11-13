import { useState, useEffect } from "react";
import { Link } from "react-router";
import Loading from "../Loading";
import useAxios from "../../hooks/useAxios";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/Jobs")
      .then((res) => {
        let sorted = [...res.data];

        if (sortOrder === "newest") {
          sorted.sort(
            (a, b) =>
              new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          );
        } else {
          sorted.sort(
            (a, b) =>
              new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
          );
        }

        setJobs(sorted);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [axiosInstance, sortOrder]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">
            All Jobs : <span className="text-primary">{jobs.length}</span>
          </h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered select-sm w-full sm:w-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="block lg:hidden">
          {jobs.map((job) => (
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
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/80?text=No+Image";
                    }}
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                    <span className="badge badge-primary badge-sm">
                      {job.category}
                    </span>
                    <span className="text-xs opacity-70">
                      by {job.postedBy}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-sm opacity-80 mt-1 line-clamp-2">
                    {job.summary}
                  </p>
                  <Link to={`/jobDetails/${job._id}`} className="mt-3 block">
                    <button className="btn btn-primary btn-sm w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 rounded-xl shadow-lg">
            <thead>
              <tr className="text-left">
                <th className="w-32"></th>
                <th>Title</th>
                <th>Category</th>
                <th>Posted By</th>
                <th>Summary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td>
                    <div className="avatar">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <img
                          src={job.coverImage}
                          alt={job.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/80?text=No+Image";
                          }}
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
                  <td className="text-sm opacity-70">{job.postedBy}</td>
                  <td className="max-w-xs text-sm opacity-80 line-clamp-2">
                    {job.summary}
                  </td>
                  <td>
                    <Link to={`/jobDetails/${job._id}`}>
                      <button className="btn btn-primary btn-sm">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {jobs.length === 0 && (
          <p className="text-center text-base-content/50 py-12">
            No jobs available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
