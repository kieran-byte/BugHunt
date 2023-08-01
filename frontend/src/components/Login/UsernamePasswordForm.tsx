import { useState } from "react";

/**
 * Allows the user to enter a username and password. When the "submit" button
 * is clicked, raises its onSubmit event, supplying the entered username and
 * password. Button text can be customized using the buttonText prop.
 */

interface Props {
  buttonText?: string;
  onSubmit: (username: string, password: string) => void;
  loading?: boolean;
}

export default function UsernamePasswordForm({
  buttonText,
  onSubmit,
  loading,
}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(username, password);
  }

  return (
    <div className="card mx-auto w-96 max-w-sm bg-base-100 shadow-2xl max-md:w-full">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={username}
              required
              className="input-bordered input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              required
              className="input-bordered input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            <button
              className={`btn ${loading ? "loading" : "btn-primary"}`}
              type="submit"
            >
              {buttonText || "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
