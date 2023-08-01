import { FunctionComponent } from "react";
import { UserDto } from "../../services/dto/user.dto";
import { useState, useEffect } from "react";
import { findAllUsers } from "../../services/user-service";

interface PostGameComponentProps {
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

const PostGameComponent: FunctionComponent<PostGameComponentProps> = ({
  onPlayAgain,
  onMainMenu,
}) => {
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    findAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-base-200">
      <div className="mb-10 overflow-x-auto">
        <table className="table w-full bg-neutral text-primary shadow-xl">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Win Matches</th> */}
              <th>Elo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                {/* <td>{user.winMatches}</td> */}
                <td>{user.elo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-4 text-2xl">Rise up the ranks! Check the ELO board to see your position now.</div>
      <div className="space-x-4">
        <button className="btn-primary btn" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn-ghost btn" onClick={onMainMenu}>
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default PostGameComponent;
