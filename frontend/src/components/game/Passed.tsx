import { BsFillAwardFill } from "react-icons/bs";

interface Props {
  hasHint: boolean;
}

const Passed = ({ hasHint }: Props) => {
  return (
    <div className="absolute left-1/2 top-10 flex -translate-x-1/2 flex-col items-center">
      <div className="alert alert-success relative w-fit animate-jackInTheBox shadow-lg max-md:py-1 max-md:pb-2">
        {hasHint && (
          <div
            className="tooltip tooltip-right absolute -right-4 -top-4 animate-bounceIn animate-delay-1000"
            data-tip="No Hint Hero"
          >
            <div className="badge-info badge badge-lg gap-2 py-4 text-2xl text-white">
              <BsFillAwardFill />
            </div>
          </div>
        )}
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xl max-md:text-sm">Congratulations 🎉</span>
        </div>
      </div>
    </div>
  );
};

export default Passed;
