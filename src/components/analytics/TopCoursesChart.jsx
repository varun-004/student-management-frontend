import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const TopCoursesChart = ({ courses }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5 mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Top Courses Chart
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={courses}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="courseName" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="totalStudents"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCoursesChart;
