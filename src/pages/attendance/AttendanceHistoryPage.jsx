import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllCourses } from "../../services/courseService";
import { getAttendanceByCourse, exportAttendanceCsv } from "../../services/attendanceService";
import Table from "../../components/common/Table";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader, Select } from "../../components/ui";

const AttendanceHistoryPage = () => {
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExport = async () => {
    if (!selectedCourse) {
      toast.error("Please select a course first.");
      return;
    }

    try {
      const file = await exportAttendanceCsv(selectedCourse);
      const url = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "attendance.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("CSV exported");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export CSV");
    }
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.content || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadCourses();
  }, []);

  const handleCourseChange = async (courseId) => {
    try {
      setLoading(true);
      setSelectedCourse(courseId);

      if (!courseId) {
        setAttendance([]);
        return;
      }

      const data = await getAttendanceByCourse(courseId);
      setAttendance(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendance = attendance.filter((record) =>
    record.studentName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance History" description="Review attendance records and export them for reporting." />

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Filters</CardTitle>
            <p className="text-sm text-slate-500">Select a course and search by student name.</p>
          </div>
          <Button variant="outline" onClick={handleExport} disabled={!selectedCourse}>
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <Select value={selectedCourse} onChange={(e) => handleCourseChange(e.target.value)}>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Select>
            <Input type="text" placeholder="Search Student..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {loading && <div className="text-sm text-slate-500">Loading attendance...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && filteredAttendance.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-slate-500">No attendance records found.</CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{record.studentName}</td>
                    <td className="px-4 py-3 text-slate-600">{record.courseName}</td>
                    <td className="px-4 py-3 text-slate-600">{record.attendanceDate}</td>
                    <td className="px-4 py-3">
                      <span className={record.present ? "rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700" : "rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700"}>
                        {record.present ? "Present" : "Absent"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceHistoryPage;
