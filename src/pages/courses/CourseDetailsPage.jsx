import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getCourseById, assignStudentToCourse, removeStudentFromCourse } from "../../services/courseService";
import EnrollStudentModal from "../../components/courses/EnrollStudentsModal";
import Table from "../../components/common/Table";
import ConfirmModal from "../../components/common/ConfirmModal";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader } from "../../components/ui";

const CourseDetailsPage = () => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removing, setRemoving] = useState(false);

  const fetchCourse = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const data = await getCourseById(id);
      setCourse(data);
    } catch (err) {
      setError(err?.message || "Failed to load course");
      setCourse(null);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError(err?.message || "Failed to load course");
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading course...</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  if (!course) {
    return <div className="p-6 text-sm text-slate-500">Course not found</div>;
  }

  const handleEnrollStudent = async (studentId) => {
    try {
      setEnrollLoading(true);
      await assignStudentToCourse(id, studentId);
      toast.success("Student enrolled successfully");
      await fetchCourse();
      setIsEnrollModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Student already enrolled");
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleRemoveStudent = async () => {
    if (!removeTarget) return;

    try {
      setRemoving(true);
      await removeStudentFromCourse(id, removeTarget.id);
      await fetchCourse();
      toast.success("Student removed from course");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove student");
    } finally {
      setRemoving(false);
      setRemoveTarget(null);
    }
  };

  const filteredStudents = course.students?.filter((student) => student.name?.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  return (
    <div className="space-y-6">
      <PageHeader title={course.courseName} description={course.description || "Course overview and enrolled students."} />

      <Card>
        <CardHeader>
          <CardTitle>Course details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Course code</p>
            <p className="mt-1 font-medium text-slate-900">{course.courseCode}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Credits</p>
            <p className="mt-1 font-medium text-slate-900">{course.credits}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Instructor</p>
            <p className="mt-1 font-medium text-slate-900">{course.teacherName || "Unassigned"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Enrolled students</CardTitle>
            <p className="text-sm text-slate-500">Manage the roster for this course.</p>
          </div>
          <Button onClick={() => setIsEnrollModalOpen(true)}>Enroll Student</Button>
        </CardHeader>
        <CardContent>
          <Input type="text" placeholder="Search student..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4" />

          {filteredStudents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              No students found.
            </div>
          ) : (
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{student.name}</td>
                    <td className="px-4 py-3 text-slate-600">{student.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <Button variant="danger" size="sm" onClick={() => setRemoveTarget(student)}>
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EnrollStudentModal isOpen={isEnrollModalOpen} onClose={() => setIsEnrollModalOpen(false)} onEnroll={handleEnrollStudent} loading={enrollLoading} />

      <ConfirmModal
        isOpen={Boolean(removeTarget)}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemoveStudent}
        title="Remove student"
        message={`Remove ${removeTarget?.name || "this student"} from the course roster?`}
        confirmLabel="Remove"
        loading={removing}
      />
    </div>
  );
};

export default CourseDetailsPage;
