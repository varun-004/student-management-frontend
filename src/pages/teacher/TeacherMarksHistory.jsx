import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getMarksByCourse, deleteMarks, updateMarks } from "../../services/teacherService";
import ConfirmModal from "../../components/common/ConfirmModal";
import Table from "../../components/common/Table";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader } from "../../components/ui";

function TeacherMarksHistory() {
  const { courseId } = useParams();

  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMark, setEditingMark] = useState(null);
  const [editedScore, setEditedScore] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadMarks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMarksByCourse(courseId);
      setMarks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    let isMounted = true;

    const fetchMarks = async () => {
      try {
        const data = await getMarksByCourse(courseId);
        if (isMounted) setMarks(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMarks();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteMarks(deleteTarget.id);
      await loadMarks();
      toast.success("Marks record deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete marks");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading marks...</div>;
  }

  const handleEdit = (mark) => {
    setEditingMark(mark);
    setEditedScore(mark.score);
  };

  const handleUpdate = async () => {
    try {
      await updateMarks(editingMark.id, { score: Number(editedScore) });
      setEditingMark(null);
      await loadMarks();
      toast.success("Marks updated");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Marks History" description="Review and update student marks for this course." />

      <Card>
        <CardHeader>
          <CardTitle>Course marks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {marks.map((mark) => (
                <tr key={mark.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-medium text-slate-900">{mark.studentName}</td>
                  <td className="px-4 py-3 text-slate-600">{mark.subject}</td>
                  <td className="px-4 py-3">
                    {editingMark?.id === mark.id ? (
                      <Input type="number" min="0" max="100" value={editedScore} onChange={(e) => setEditedScore(e.target.value)} className="w-24" />
                    ) : (
                      mark.score
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{mark.grade}</td>
                  <td className="px-4 py-3">
                    {editingMark?.id === mark.id ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setEditingMark(null)}>
                          Cancel
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleUpdate}>
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleEdit(mark)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => setDeleteTarget(mark)}>
                          Delete
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete marks record"
        message="Remove this marks entry from the course history?"
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default TeacherMarksHistory;
