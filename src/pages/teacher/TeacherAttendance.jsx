import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getCourseStudents, markAttendance } from "../../services/teacherService";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader } from "../../components/ui";

function TeacherAttendance() {
  const { courseId } = useParams();

  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    let active = true;

    const fetchStudents = async () => {
      try {
        const data = await getCourseStudents(courseId);
        if (!active) return;
        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStudents();

    return () => {
      active = false;
    };
  }, [courseId]);

  const handleCheckboxChange = (studentId, checked) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: checked,
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);
      for (const student of students) {
        await markAttendance({
          studentId: student.id,
          courseId: Number(courseId),
          attendanceDate,
          present: attendanceData[student.id] || false,
        });
      }
      toast.success("Attendance saved successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading students...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Mark Attendance" description="Record attendance for the selected course and date." />

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Attendance list</CardTitle>
            <p className="text-sm text-slate-500">Tick students who are present for the chosen date.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Input label="Attendance Date" type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} />
            <Button variant="outline" onClick={handleSaveAttendance} loading={saving}>
              {saving ? "Saving..." : "Save Attendance"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{student.name}</h3>
                  <p className="text-sm text-slate-500">{student.email}</p>
                </div>
                <input
                  type="checkbox"
                  checked={attendanceData[student.id] || false}
                  onChange={(e) => handleCheckboxChange(student.id, e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeacherAttendance;
