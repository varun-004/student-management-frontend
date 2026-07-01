import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllTeachers, deleteTeacher } from "../../services/adminTeacherService";
import ConfirmModal from "../../components/common/ConfirmModal";
import Table from "../../components/common/Table";
import { Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from "../../components/ui";

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTeachers();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteTeacher(deleteTarget.id);

      setTeachers((prev) => prev.filter((teacher) => teacher.id !== deleteTarget.id));
      toast.success("Teacher deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete teacher");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers"
        description="Manage teacher accounts, departments, and assignments from one place."
      >
        <Link to="/admin/teachers/add">
          <Button>+ Add Teacher</Button>
        </Link>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Teacher roster</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {teachers.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-500">
              No teachers available yet.
            </div>
          ) : (
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {teacher.firstName} {teacher.lastName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{teacher.email}</td>
                    <td className="px-4 py-3 text-slate-600">{teacher.department}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/teachers/edit/${teacher.id}`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget(teacher)}
                        >
                          Delete
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

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete teacher"
        message={`Remove ${deleteTarget?.firstName || "this teacher"} from the roster? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default TeachersPage;