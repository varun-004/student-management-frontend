import { useState, useEffect, useMemo } from "react";
import {
  Download,
  FileText,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import {
  getStudentMarks,
  getStudentAverage,
  getStudentGPA,
} from "../../services/marksService";
import { getStudentByEmail } from "../../services/studentService";
import { downloadStudentReport } from "../../services/reportService";
import notify from "../../utils/toast";
import AnimatedTableRow from "../../components/common/AnimatedTableRow";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
  TableSkeleton,
} from "../../components/ui";

const getGradeVariant = (grade) => {
  if (!grade) return "default";
  const g = grade.charAt(0).toUpperCase();
  if (g === "A") return "success";
  if (g === "B") return "brand";
  if (g === "C") return "warning";
  return "danger";
};

const StudentMarksReportPage = () => {
  useDocumentTitle("Marks Report");
  const [marks, setMarks] = useState([]);
  const [average, setAverage] = useState(null);
  const [gpa, setGpa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const loadMarks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const student = await getStudentByEmail(user.email);
        setStudentId(student.id);

        const marksData = await getStudentMarks(student.id);
        const averageData = await getStudentAverage(student.id);
        const gpaData = await getStudentGPA(student.id);

        setMarks(marksData || []);
        setAverage(averageData);
        setGpa(gpaData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMarks();
  }, []);

  const handleDownloadReport = async () => {
    try {
      setDownloading(true);
      const pdf = await downloadStudentReport(studentId);
      const url = window.URL.createObjectURL(new Blob([pdf]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "Student_Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      notify.success("Report card downloaded successfully");
    } catch (error) {
      console.error(error);
      notify.error("Failed to download report card");
    } finally {
      setDownloading(false);
    }
  };

  const subjectCount = useMemo(
    () => new Set(marks.map((m) => m.subject)).size,
    [marks],
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
        <TableSkeleton rows={6} cols={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My records"
        title="Marks Report"
        description="View your academic performance, GPA summary, and download your report card."
      >
        <Button
          leftIcon={Download}
          onClick={handleDownloadReport}
          loading={downloading}
        >
          Download Report Card
        </Button>
      </PageHeader>

      {marks.length > 0 && (
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Student</p>
              <p className="text-lg font-semibold text-slate-900">
                {marks[0].studentName}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {average !== null && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="GPA"
            value={gpa?.toFixed(2) ?? "—"}
            icon={TrendingUp}
            description="Grade point average"
            trend={(gpa ?? 0) >= 3.5 ? "up" : "neutral"}
            trendLabel={(gpa ?? 0) >= 3.5 ? "Strong" : "Stable"}
          />
          <StatCard
            label="Average Marks"
            value={average.toFixed(2)}
            icon={GraduationCap}
            description="Across all assessments"
            trend={(average ?? 0) >= 75 ? "up" : "neutral"}
            trendLabel={(average ?? 0) >= 75 ? "Good" : "Fair"}
          />
          <StatCard
            label="Subjects"
            value={subjectCount}
            icon={FileText}
            description="Unique subjects assessed"
            trend="neutral"
            trendLabel="Total"
          />
          <StatCard
            label="Assessments"
            value={marks.length}
            icon={GraduationCap}
            description="Total marks entries"
            trend="neutral"
            trendLabel="Records"
          />
        </div>
      )}

      {average !== null && (
        <Card>
          <CardHeader>
            <CardTitle>GPA Summary</CardTitle>
            <CardDescription>Your academic standing at a glance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">GPA Progress</span>
                  <span className="font-semibold text-slate-900">
                    {gpa?.toFixed(2)} / 4.0
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-600 transition-all"
                    style={{ width: `${Math.min(((gpa ?? 0) / 4) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Average Marks</span>
                  <span className="font-semibold text-slate-900">
                    {average.toFixed(1)} / 100
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${Math.min(average, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {marks.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No marks recorded"
          description="Your assessment results will appear here once they are published."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Report card</CardTitle>
            <CardDescription>Detailed breakdown of your assessment results.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {marks.map((mark, index) => (
                  <AnimatedTableRow key={mark.id} index={index} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {mark.subject}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{mark.courseName}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-900">{mark.score}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getGradeVariant(mark.grade)}>{mark.grade}</Badge>
                    </td>
                  </AnimatedTableRow>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentMarksReportPage;
