interface Props {
  stars: boolean[];
  passed: boolean | null;
}

const Stars = ({ stars, passed }: Props) => {
  return (
    <div className="-mt-20 mb-20 flex flex-col items-center">
      <h1
        className={`mb-4 w-full animate-fadeIn text-center text-xl ${
          passed ? "visible" : "hidden"
        }`}
      >
        Victory's sweet, enjoy your treat!
      </h1>

      <div className="rating rating-lg">
        {stars.map((star: boolean, index: number) => (
          <input
            key={index}
            type="radio"
            name="rating-8"
            className={`mask mask-star-2 cursor-default bg-orange-400 ${
              star ? "" : "opacity-50"
            } ${passed == false && "animate-bounceOut animate-delay-500"}`}
            disabled
          />
        ))}
      </div>
    </div>
  );
};

export default Stars;
