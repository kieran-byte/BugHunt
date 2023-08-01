import { useNavigate } from "react-router-dom";

export default function Nav(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.onClick != null) {
      props.onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="navbar flex flex-row bg-[#3D4451] text-slate-200">
      <div className="flex w-1/3">
        <button
          onClick={handleClick}
          className="btn-ghost btn-circle btn hover:btn-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
      </div>

      <div className="flex w-1/3 items-center justify-center justify-items-center ">
        <a
          href="http://localhost:5173"
          className="btn-ghost btn text-xl normal-case text-slate-200 hover:btn-accent"
        >
          Bug Hunt
        </a>
      </div>
      <div className="flex w-1/3 justify-end">
        <div className="dropdown-end dropdown">
          <label
            tabIndex={0}
            className="btn-ghost btn-circle btn hover:btn-accent"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>

              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-3 w-52 bg-gray-600 shadow"
          >
            <div className="card-body">
              <div className="text-info">
                <ul>
                  <li>
                    <div className="stack">
                      <div className="card bg-primary text-primary-content shadow-md">
                        <div className="card-body">
                          <h2 className="card-title">Notification 1</h2>
                          <p>You have 3 unread messages. Tap here to see.</p>
                        </div>
                      </div>
                      <div className="card bg-primary text-primary-content shadow">
                        <div className="card-body">
                          <h2 className="card-title">Notification 2</h2>
                          <p>You have 3 unread messages. Tap here to see.</p>
                        </div>
                      </div>
                      <div className="card bg-primary text-primary-content shadow-sm">
                        <div className="card-body">
                          <h2 className="card-title">Notification 3</h2>
                          <p>You have 3 unread messages. Tap here to see.</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown-end dropdown">
          <label
            tabIndex={0}
            className="btn-ghost btn-circle avatar btn hover:btn-accent"
          >
            <div className="relative h-10 w-10 scale-75 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
              <svg
                className="absolute -left-1 h-12 w-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-gray-600 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
