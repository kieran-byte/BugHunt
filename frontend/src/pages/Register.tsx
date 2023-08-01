import { Link, useNavigate } from "react-router-dom";
import UsernamePasswordForm from "../components/Login/UsernamePasswordForm";
import { useState } from "react";
import { createUser } from "../services/user-service";
import { CreateUserDto } from "../services/dto/user.dto";

/**
 * Displays a form allowing the user to create an account. If they do, will attempt to register via the API.
 * If successful, will redirect the user to the homepage. Otherwise, an error message will be displayed.
 *
 * In addition, contains a link to the login page in case the user already has an account.
 */
export default function Register() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(username: string, password: string) {
    setLoading(true);
    await createUser({ username, password });
    setLoading(false);

    navigate("/login");
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
            <span>Error registering!</span>
          </div>
        </div>
      )}
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-12 text-5xl font-bold">Let's get signed up!</h1>
          <UsernamePasswordForm
            buttonText="Create account"
            onSubmit={handleSubmit}
            loading={loading}
          />
          <p className="mt-6">
            Already have an account?{" "}
            <Link to="/login" className="link-primary link transition">
              Click here to log in!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
