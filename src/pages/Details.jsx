import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Details({ refresh }) {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const fetchProjects = () => {
    fetch("http://localhost:3000/projects")
      .then((r) => r.json())
      .then(data => {
        const cleanData = Array.isArray(data) ? data.flat().filter(p => p.id) : [];
        setProjects(cleanData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        toast.error("Failed to load projects");
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    }
  };

  const handleEditClick = (project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/projects/${currentProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });

      if (!response.ok) throw new Error("Update failed");
      toast.success("Project updated successfully");
      setIsEditing(false);
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project");
    }
  };

  const filteredProjects = projects.filter(project =>
    (project.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Project Details
      </h1>

      <input
        type="text"
        placeholder="Search projects..."
        className="mb-6 w-full max-w-md p-2 rounded border dark:bg-gray-800 dark:text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Category:</strong> {project.category}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Description:</strong> {project.description}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Status:</strong> {project.status}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Stack:</strong> {project.stack}</p>

              <div className="flex gap-3 mt-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => handleEditClick(project)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Project</h2>

            {['name', 'category', 'description', 'status', 'stack'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block mb-1 capitalize text-sm text-gray-700 dark:text-gray-300">{field}</label>
                {field === 'description' ? (
                  <textarea
                    name={field}
                    value={currentProject[field]}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                    required
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={currentProject[field]}
                    onChange={handleEditChange}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                    required
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
