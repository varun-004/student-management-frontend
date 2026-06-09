import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div
      className="
        bg-white
        border
        rounded-xl
        p-5
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      <h2 className="text-xl font-semibold mb-2">
        {course.courseName}
      </h2>

      <p className="text-gray-600 mb-2">
        Code: {course.courseCode}
      </p>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {course.description ||
          "No description available"}
      </p>

      <div className="flex gap-4">

        <Link
          to={`/courses/${course.id}`}
          className="
            text-blue-600
            font-medium
            hover:underline
          "
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default CourseCard;