/* eslint-disable react/prop-types */
const ErrorMessage = ({ errorMessage }) => {
  return (
    <div
      className="mb-4 mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
