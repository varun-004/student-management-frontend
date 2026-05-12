import { useEffect, useState } from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");

      setStudents(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch students");
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/students", {
        name,
        email,
      });
      alert("Student Added");
      setName("");
      setEmail("");
      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Failed to add student");
    }
  };

  useEffect(() => {
    const loadStudents = async () => {
      await fetchStudents();
    };

    loadStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);

      alert("Student Deleted");

      fetchStudents();
    } catch (error) {
      console.log(error);

      alert("Failed to delete student");
    }
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/students/${editId}`,

        {
          name,
          email,
        },
      );

      alert("Student Updated");

      setName("");

      setEmail("");

      setEditId(null);

      fetchStudents();
    } catch (error) {
      console.log(error);

      alert("Failed to update student");
    }
  };

  const handleEdit = (student) => {
    setName(student.name);

    setEmail(student.email);

    setEditId(student.id);
  };

  const filteredStudents = students.filter(

    (student) =>

        student.name
            .toLowerCase()
            .includes(search.toLowerCase())

);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <form onSubmit={editId ? updateStudent : addStudent}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Add Student</button>
      </form>

      <br />

      <button onClick={logout}>Logout</button>

      <br />
      <br />

      <input
    type="text"
    placeholder="Search Student"
    value={search}
    onChange={(e) =>
        setSearch(e.target.value)
    }
/>

<br /><br />
      <h3>Student List</h3>

      {filteredStudents.map((student) => (
        <div
          key={student.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>
            Name:
            {student.name}
          </p>
          <p>
            Email:
            {student.email}
          </p>

          <button onClick={() => handleEdit(student)}>Edit</button>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
