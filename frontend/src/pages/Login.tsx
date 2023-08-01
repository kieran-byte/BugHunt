import { Link, useNavigate } from "react-router-dom";
import UsernamePasswordForm from "../components/Login/UsernamePasswordForm";
import { useState, useRef } from "react";
import { findAllUsers } from "../services/user-service";
import { UserDto } from "../services/dto/user.dto";

/**
 * Displays a form allowing the user to log in. If they do, will attempt to login via the API.
 * If successful, will redirect the user to the homepage. Otherwise, an error message will be displayed.
 *
 * In addition, contains a link to the account creation page in case the user doesn't have an account.
 */
export default function Login() {
  const navigate = useNavigate();
  const meowthRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  async function handleSubmit(username: string, password: string) {
    const data = await findAllUsers();
    data.data.map((user: UserDto) => {
      if (user.username === username && user.password === password) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setShowAlert(true);
      }
    });
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      {showAlert && (
        <div className="alert alert-error absolute top-20 z-10 w-52 shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error logging in!</span>
          </div>
        </div>
      )}
      <div className="hero-content z-10 flex w-full justify-center text-center">
        <div>
          <h1 className="text-5xl font-bold">Bug Hunting time!</h1>
          <p className="py-6 italic"></p>
          <UsernamePasswordForm buttonText="Log in" onSubmit={handleSubmit} />
          <p className="mt-6">
            New to the site?{" "}
            <Link to="/register" className="link-primary link transition">
              Create an account!
            </Link>
          </p>
        </div>
        <div className="flex w-fit animate-fade-up animate-delay-300 max-md:hidden">
          <img
            src="/pikachu.webp"
            alt="pikachu"
            ref={meowthRef}
            className="w-96"
          />
        </div>
      </div>
    </div>
  );
}
