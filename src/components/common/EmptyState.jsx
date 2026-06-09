const EmptyState = ({
  message = "No data available",
}) => {
  return (
    <div
      className="
        bg-white
        shadow
        rounded-xl
        p-8
        text-center
      "
    >
      <p className="text-gray-500">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;