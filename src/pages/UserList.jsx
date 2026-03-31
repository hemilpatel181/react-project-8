import { useEffect, useState } from "react";
import { fetchUsers, storeUsers, fetchRemovedUsers, storeRemovedUsers } from "../utils/storageHelper";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sortName, setSortName] = useState("");
  const [sortAge, setSortAge] = useState("");

  const router = useNavigate();

  useEffect(() => {
    const data = fetchUsers() || [];
    setUserList(data);
  }, []);

  const handleRemove = (uid) => {
    const selectedUser = userList.find((usr) => usr.uid === uid);

    const updatedUsers = userList.filter((usr) => usr.uid !== uid);
    setUserList(updatedUsers);
    storeUsers(updatedUsers);

    let removed = fetchRemovedUsers() || [];
    removed.push(selectedUser);
    storeRemovedUsers(removed);
  };

 
  let processedUsers = userList.filter((usr) => {
    const text = search.toLowerCase();

    const matchSearch =
      usr.fullName?.toLowerCase().includes(text) ||
      usr.userEmail?.toLowerCase().includes(text) ||
      usr.userCity?.toLowerCase().includes(text);

    const matchAge = ageFilter
      ? ageFilter === "young"
        ? usr.userAge <= 22
        : ageFilter === "mid"
        ? usr.userAge > 22 && usr.userAge <= 26
        : usr.userAge > 26
      : true;

    return matchSearch && matchAge;
  });

 
  if (sortName) {
    processedUsers.sort((a, b) => {
      const nameA = a.fullName ? a.fullName.toLowerCase() : "";
      const nameB = b.fullName ? b.fullName.toLowerCase() : "";

      return sortName === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

 
  if (sortAge) {
    processedUsers.sort((a, b) =>
      sortAge === "asc"
        ? a.userAge - b.userAge
        : b.userAge - a.userAge
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        User Detail
      </h1>

      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search name, email, city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md"
        />

        <select
          onChange={(e) => setAgeFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20 backdrop-blur-md"
        >
          <option className="bg-gray-900 text-white" value="">All Age</option>
          <option className="bg-gray-900 text-white" value="young">Below 22</option>
          <option className="bg-gray-900 text-white" value="mid">22-26</option>
          <option className="bg-gray-900 text-white" value="old">Above 26</option>
        </select>

        <select
          onChange={(e) => setSortName(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20 backdrop-blur-md"
        >
          <option className="bg-gray-900 text-white" value="">Sort Name</option>
          <option className="bg-gray-900 text-white" value="asc">A → Z</option>
          <option className="bg-gray-900 text-white" value="desc">Z → A</option>
        </select>

        <select
          onChange={(e) => setSortAge(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20 backdrop-blur-md"
        >
          <option className="bg-gray-900 text-white" value="">Sort Age</option>
          <option className="bg-gray-900 text-white" value="asc">Low → High</option>
          <option className="bg-gray-900 text-white" value="desc">High → Low</option>
        </select>
      </div>

      <div className="overflow-x-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-gray-300 uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {processedUsers.length > 0 ? (
              processedUsers.map((usr) => (
                <tr key={usr.uid} className="border-t border-white/10 hover:bg-white/5 transition duration-300">
                  <td className="px-6 py-4 font-semibold text-purple-300">{usr.fullName}</td>
                  <td className="px-6 py-4 text-gray-300">{usr.userEmail}</td>
                  <td className="px-6 py-4">{usr.userAge}</td>
                  <td className="px-6 py-4">{usr.userCity}</td>

                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button
                      onClick={() => router("/form", { state: { user: usr } })}
                      className="px-4 py-1 rounded-lg bg-yellow-400/90 text-black backdrop-blur-md hover:scale-105 hover:bg-yellow-300 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleRemove(usr.uid)}
                      className="px-4 py-1 rounded-lg bg-red-500/80 backdrop-blur-md hover:scale-105 hover:bg-red-400 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
