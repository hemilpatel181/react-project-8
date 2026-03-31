import { useEffect, useState } from "react";
import { fetchRemovedUsers, storeRemovedUsers, fetchUsers, storeUsers } from "../utils/storageHelper";

const RemovedUsers = () => {
  const [archivedUsers, setArchivedUsers] = useState([]);

  useEffect(() => {
    setArchivedUsers(fetchRemovedUsers());
  }, []);

  const handleRecover = (usr) => {
    let users = fetchUsers();
    users.push(usr);
    storeUsers(users);

    let updatedList = archivedUsers.filter((u) => u.uid !== usr.uid);
    setArchivedUsers(updatedList);
    storeRemovedUsers(updatedList);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Deleted User Detail
      </h1>

      <div className="overflow-x-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-gray-300 uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {archivedUsers.map((usr) => (
              <tr key={usr.uid} className="border-t border-white/10 hover:bg-white/5 transition duration-300">
                <td className="px-6 py-4 font-semibold text-purple-300">{usr.fullName}</td>
                <td className="px-6 py-4 text-gray-300">{usr.userEmail}</td>
                <td className="px-6 py-4">{usr.userAge}</td>
                <td className="px-6 py-4">{usr.userCity}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleRecover(usr)}
                    className="px-4 py-1 rounded-lg bg-green-500/80 backdrop-blur-md hover:scale-105 hover:bg-green-400 transition"
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemovedUsers;