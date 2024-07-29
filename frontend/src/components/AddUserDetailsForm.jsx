// src/components/AddUserDetailsForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AddUserDetailsForm = ({ onUserDetailsAdded }) => {
  const [fullName, setFullName] = useState("");
  const [office, setOffice] = useState("");
  const [department, setDepartment] = useState("");
  const [organization, setOrganization] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      fullName,
      office,
      department,
      organization,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/userDetails",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUserDetailsAdded(response.data);
      setFullName("");
      setOffice("");
      setDepartment("");
      setOrganization("");
    } catch (error) {
      console.error("Error adding user details:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Add User Details</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Office</label>
          <input
            type="text"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Organization</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add User Details
        </button>
      </form>
    </div>
  );
};

export default AddUserDetailsForm;
