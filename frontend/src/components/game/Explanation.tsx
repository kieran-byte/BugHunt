import { AiFillInfoCircle } from "react-icons/ai";

interface Props {
  explanation: string | null;
}

const Explanation = ({explanation}: Props) => {
  return (
    <div className="collapse z-50 w-5/12 max-md:w-full">
      <input type="checkbox" />
      <div className="collapse-title p-4 text-lg font-medium max-md:hidden">
        Why is that the answer ?
      </div>
      <div className="collapse-title hidden p-4 text-lg font-medium max-md:block">
        <AiFillInfoCircle className="text-2xl text-info" />
      </div>
      <div className="collapse-content bg-white">
        <p>
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default Explanation;
