import { Star, Shield, CheckCircle2, LogIn } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Banner() {
  const { user } = useAuth();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200 to-cyan-200 rounded-full 
                     animate-pulse-scale"
        ></div>
        <div
          className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full 
                     animate-pulse-scale"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full 
                     animate-pulse-scale"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-indigo-600 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
        </div>

        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-5xl lg:text-6xl font-bold text-base-700 mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FreeLancy
            </span>
          </h1>
        </div>

        <p
          className="text-lg text-base-400 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          The ultimate platform where talented freelancers and visionary clients
          collaborate to create extraordinary projects and build successful
          partnerships.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up items-center"
          style={{ animationDelay: "0.2s" }}
        >
          <Link to="/add-job">
            <button class="button px-8 py-3 text-nowrap">
              <svg
                class="svgIcon"
                viewBox="0 0 512 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
              </svg>
              Create A Job
            </button>
          </Link>
          {!user && (
            <Link to="/auth/login">
              <button className="bg-white text-slate-700 px-8 py-3 rounded-full font-bold text-lg border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                Sign In{" "}
                <span className="text-sm">
                  <LogIn />
                </span>
              </button>
            </Link>
          )}
        </div>

        <div
          className="flex flex-col items-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-sm text-base-700 font-medium">
            Trusted by professionals worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-base-700 font-medium">
                4.9/5 Rating
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span className="text-sm text-base-700 font-medium">
                Verified Secure
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-600" />
              <span className="text-sm text-base-700 font-medium">
                ISO Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
