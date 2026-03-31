import { useState, useEffect } from "react";
import { fetchUsers, storeUsers } from "../utils/storageHelper";
import { useNavigate, useLocation } from "react-router-dom";

const UserForm = () => {
  const router = useNavigate();
  const currentLocation = useLocation();
  const existingUser = currentLocation.state?.user;

  const [inputData, setInputData] = useState({
    uid: Date.now(),
    fullName: "",
    userEmail: "",
    userAge: "",
    userPassword: "",
    userPhone: "",
    userCity: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (existingUser) setInputData(existingUser);
  }, []);

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let err = {};

    if (!inputData.fullName.trim()) err.fullName = "Name is required";

    if (!inputData.userEmail.trim()) {
      err.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inputData.userEmail)) {
      err.userEmail = "Invalid email";
    }

    if (!inputData.userAge) {
      err.userAge = "Age is required";
    } else if (isNaN(inputData.userAge) || inputData.userAge <= 0) {
      err.userAge = "Enter valid age";
    }

    if (!inputData.userPhone) {
      err.userPhone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(inputData.userPhone)) {
      err.userPhone = "Enter 10 digit number";
    }

    if (!inputData.userPassword) {
      err.userPassword = "Password is required";
    } else if (inputData.userPassword.length < 6) {
      err.userPassword = "Min 6 characters";
    }

    if (!inputData.userCity.trim()) err.userCity = "City is required";

    return err;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const errorsFound = validateForm();
    setValidationErrors(errorsFound);

    if (Object.keys(errorsFound).length > 0) return;

    let allUsers = fetchUsers();

    if (existingUser) {
      allUsers = allUsers.map((usr) => (usr.uid === inputData.uid ? inputData : usr));
    } else {
      allUsers.push(inputData);
    }

    storeUsers(allUsers);
    router("/display");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {existingUser ? "Edit User Details" : "Add User Details"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-3">
          {Object.keys(inputData)
            .filter((f) => f !== "uid")
            .map((fieldKey) => (
              <div key={fieldKey}>
                <input
                  type="text"
                  name={fieldKey}
                  placeholder={fieldKey}
                  value={inputData[fieldKey]}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                />

                {validationErrors[fieldKey] && (
                  <p className="text-red-400 text-sm mt-1">
                    {validationErrors[fieldKey]}
                  </p>
                )}
              </div>
            ))}

          <button className="w-full bg-cyan-500/80 hover:bg-cyan-400 py-3 rounded-lg font-semibold transition">
            {existingUser ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;