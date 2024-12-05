/* eslint-disable react/prop-types */
const PrimaryLoading = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-[4px] border-t-black" />
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default PrimaryLoading;
