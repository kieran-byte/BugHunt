import { FunctionComponent } from "react";
import { UserDto } from "../../services/dto/user.dto";

interface WaitingStateComponentProps {
  user1: UserDto | null;
  user2: UserDto | undefined;
}

const WaitingStateComponent: FunctionComponent<WaitingStateComponentProps> = ({
  user1,
  user2,
}) => (
  <div className="flex h-screen items-center justify-center bg-base-200">
    <div className="flex space-x-4">
      <div
        className={`animate__animated card w-64 bg-base-100 shadow-xl ${
          user1 ? "" : "animate__flip infinite"
        }`}
      >
        <div className="card-body items-center text-center">
          {user1 ? (
            <>
              <h2 className="card-title">{user1.username}</h2>
              <p>Elo: {user1.elo}</p>
            </>
          ) : (
            <div>Waiting for player...</div>
          )}
        </div>
      </div>
      <div className="divider text-center lg:divider-horizontal">VS</div>
      <div
        className={`animate__animated card w-64 bg-base-100 shadow-xl ${
          user2 ? "" : "animate__flip infinite"
        }`}
      >
        <div className="card-body items-center text-center">
          {user2 ? (
            <>
              <h2 className="card-title">{user2.username}</h2>
              <p>Elo: {user2.elo}</p>
            </>
          ) : (
            <div>Waiting for player...</div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default WaitingStateComponent;
