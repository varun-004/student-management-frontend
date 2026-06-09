const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-300 text-red-600 p-4 rounded-lg">
      {message}
    </div>
  );
};

export default ErrorMessage;