import { useState, useEffect, useMemo } from "react";
import { BookOpen, CalendarCheck2, TrendingUp } from "lucide-react";

import { getCourseWiseAttendance } from "../../services/attendanceService";
import { getStudentByEmail } from "../../services/studentService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardGridSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
} from "../../components/ui";

const getAttendanceVariant = (percentage) => {
  if (percentage >= 85) return "success";
  if (percentage >= 70) return "warning";
  return "danger";
};

const AttendanceReportPage = () => {
  useDocumentTitle("Attendance Report");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const student = await getStudentByEmail(user.email);
        const data = await getCourseWiseAttendance(student.id);
        setAttendance(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  const overallPercentage = useMemo(() => {
    if (attendance.length === 0) return 0;
    return attendance.reduce((sum, c) => sum + c.percentage, 0) / attendance.length;
  }, [attendance]);

  const healthyCourses = useMemo(
    () => attendance.filter((c) => c.percentage >= 85).length,
    [attendance],
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <CardGridSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My records"
        title="Attendance Report"
        description="Track your attendance percentage across all enrolled courses."
      />

      {attendance.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Overall Attendance"
            value={`${overallPercentage.toFixed(1)}%`}
            icon={CalendarCheck2}
            description="Average across all courses"
            trend={overallPercentage >= 85 ? "up" : "down"}
            trendLabel={overallPercentage >= 85 ? "Healthy" : "Needs attention"}
          />
          <StatCard
            label="Courses Enrolled"
            value={attendance.length}
            icon={BookOpen}
            description="Active course enrollments"
            trend="neutral"
            trendLabel="Enrolled"
          />
          <StatCard
            label="On Track"
            value={healthyCourses}
            icon={TrendingUp}
            description="Courses with 85%+ attendance"
            trend="up"
            trendLabel="Healthy"
          />
        </div>
      )}

      {attendance.length === 0 ? (
        <EmptyState
          icon={CalendarCheck2}
          title="No attendance data"
          description="Your attendance records will appear here once they are recorded."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {attendance.map((course) => (
            <Card key={course.courseId} hover>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>{course.courseName}</CardTitle>
                  <CardDescription>Course attendance summary</CardDescription>
                </div>
                <Badge variant={getAttendanceVariant(course.percentage)}>
                  {course.percentage >= 85
                    ? "Good"
                    : course.percentage >= 70
                      ? "Fair"
                      : "Low"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {course.percentage.toFixed(1)}%
                  </p>
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                    <span>Progress</span>
                    <span>{course.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        course.percentage >= 85
                          ? "bg-emerald-500"
                          : course.percentage >= 70
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(course.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceReportPage;
