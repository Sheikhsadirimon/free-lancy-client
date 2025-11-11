"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LatestJobsCard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/Jobs")
      .then((res) => {
        setJobs(res.data.slice(0, 6)); // just first 6, no sorting
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-error">{error}</div>;
  }

  return (
    <div className="my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Latest Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <Link
            key={job._id}
            to={`/job/${job._id}`}
            className="block group"
          >
            <div className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
              <figure className="h-48">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </figure>

              <div className="card-body p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-primary">{job.category}</span>
                  <span className="text-sm opacity-70">by {job.postedBy}</span>
                </div>

                <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                  {job.title}
                </h3>

                <p className="text-sm opacity-80 mt-2 line-clamp-2">
                  {job.summary}
                </p>

                <button className="btn btn-primary btn-sm mt-4 w-full">
                  View Job
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}