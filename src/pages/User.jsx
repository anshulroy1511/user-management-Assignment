import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

// Fetch users from API based on page number
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

// Delete user by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  // Update user details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${editUser.id}`, {
        first_name: editUser.first_name,
        last_name: editUser.last_name,
        email: editUser.email,
      });

      // Update user in state
      const updatedUsers = users.map((user) =>
        user.id === editUser.id ? { ...user, ...editUser } : user
      );
      setUsers(updatedUsers);
      toast.success("User updated successfully!");
      setEditUser(null);
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  // Fetch users when component mounts or page changes
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

 // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-300 p-8 relative">
      <div className="max-w-5xl mt-20 mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center mb-9 text-blue-700">Our Users</h2>

        
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {loading ? (
          <p className="text-center text-slate-700">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-slate-600">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl shadow-md flex flex-col gap-2 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-16 h-16 rounded-full border-2 border-blue-400"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-slate-700">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditUser(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-blue-400 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-500"
          >
            Prev
          </button>
          <span className="self-center text-blue-700 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-blue-400 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-500"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50 transition-all duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border border-gray-200 relative animate-fade-in">
            <button
              onClick={() => setEditUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
            >
              ✖
            </button>
            <h3 className="text-2xl mb-6 text-blue-700 font-semibold text-center">Edit User</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editUser.first_name}
                onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                value={editUser.last_name}
                onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Last Name"
                required
              />
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
                required
              />
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-sm"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
