import { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";

import { getAllCourses } from "../../services/courseService";
import { getAttendanceByCourse, exportAttendanceCsv } from "../../services/attendanceService";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  PageHeader,
  Select,
  TableSkeleton,
} from "../../components/ui";

const AttendanceHistoryPage = () => {
  useDocumentTitle("Attendance History");
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExport = async () => {
    if (!selectedCourse) {
      notify.error("Please select a course first.");
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
      notify.success("CSV exported successfully");
    } catch (error) {
      console.error(error);
      notify.error("Failed to export CSV");
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
      <PageHeader
        eyebrow="Records"
        title="Attendance History"
        description="Review attendance records and export them for reporting."
      >
        <Button
          variant="outline"
          leftIcon={Download}
          onClick={handleExport}
          disabled={!selectedCourse}
        >
          Export CSV
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select a course and search by student name.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <Select
              label="Course"
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Select>
            <Input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={Search}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : !selectedCourse ? (
        <EmptyState
          icon={Search}
          title="Select a course"
          description="Choose a course from the filter above to view attendance history."
        />
      ) : filteredAttendance.length === 0 ? (
        <EmptyState
          title="No attendance records found"
          description={
            searchTerm
              ? "No records match your search."
              : "No attendance has been recorded for this course yet."
          }
        />
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
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {record.studentName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{record.courseName}</td>
                    <td className="px-4 py-3 text-slate-600">{record.attendanceDate}</td>
                    <td className="px-4 py-3">
                      <Badge variant={record.present ? "success" : "danger"}>
                        {record.present ? "Present" : "Absent"}
                      </Badge>
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
