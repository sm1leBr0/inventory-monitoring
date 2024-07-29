import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddUserDetailsForm from "./AddUserDetailsForm";
import AddEquipmentCardForm from "./AddEquipmentCardForm";

const EquipmentDetails = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [userDetailsOptions, setUserDetailsOptions] = useState([]);
  const [equipmentCardOptions, setEquipmentCardOptions] = useState([]);
  const [equipmentVersions, setEquipmentVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    inventoryNumber: "",
    location: "",
    user: "",
    note: "",
  });
  const [selectedEquipmentCard, setSelectedEquipmentCard] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [showAddUserDetails, setShowAddUserDetails] = useState(false);
  const [showAddEquipmentCard, setShowAddEquipmentCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user details, equipment card options, and equipment details
        const [
          userDetailsResponse,
          equipmentCardResponse,
          equipmentResponse,
          versionsResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3000/api/userDetails", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/equipmentCard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/api/equipment/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/api/equipment/${id}/versions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserDetailsOptions(userDetailsResponse.data);
        setEquipmentCardOptions(equipmentCardResponse.data);
        setEquipmentVersions(versionsResponse.data);

        const equipmentData = equipmentResponse.data;
        setEquipment(equipmentData);
        setFormData({
          name: equipmentData.name,
          inventoryNumber: equipmentData.inventoryNumber,
          location: equipmentData.location,
          user: equipmentData.user,
          note: equipmentData.note,
        });

        // Set the selected values for the dropdowns
        setSelectedEquipmentCard(equipmentData.name);
        const userOption = userDetailsResponse.data.find(
          (user) => user.fullName === equipmentData.user
        );
        setSelectedUser(userOption ? userOption.id : "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/equipment/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditMode(false);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/equipment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard"); // Redirect to equipment list after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEquipmentCardChange = (e) => {
    const selectedCardName = e.target.value;
    setSelectedEquipmentCard(selectedCardName);
    setFormData((prevData) => ({
      ...prevData,
      name: selectedCardName,
    }));
  };

  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedUserObj = userDetailsOptions.find(
      (user) => String(user.id) === String(selectedUserId)
    );

    if (selectedUserObj) {
      setSelectedUser(selectedUserId);
      setFormData((prevData) => ({
        ...prevData,
        user: selectedUserObj.fullName,
        location: selectedUserObj.office,
      }));
    } else {
      setSelectedUser("");
      setFormData((prevData) => ({
        ...prevData,
        user: "",
        location: "",
      }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!equipment) return <p>No equipment found</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Equipment Details</h2>
      {editMode ? (
        <form onSubmit={handleUpdate} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700 mt-2">Equipment Card</label>
            <select
              value={selectedEquipmentCard}
              onChange={handleEquipmentCardChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Equipment Card</option>
              {equipmentCardOptions.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowAddEquipmentCard(true)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Equipment Card
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Inventory Number</label>
            <input
              type="text"
              name="inventoryNumber"
              value={formData.inventoryNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">User</label>
            <select
              value={selectedUser}
              onChange={handleUserChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select User</option>
              {userDetailsOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.fullName}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowAddUserDetails(true)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add User Details
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      ) : (
        <>
          <p>
            <strong>Name:</strong> {equipment.name}
          </p>
          <p>
            <strong>Inventory Number:</strong> {equipment.inventoryNumber}
          </p>
          <p>
            <strong>Location:</strong> {equipment.location}
          </p>
          <p>
            <strong>User:</strong> {equipment.user}
          </p>
          <p>
            <strong>Description:</strong> {equipment.note}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4"
          >
            Delete
          </button>
        </>
      )}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Versions</h3>
        {equipmentVersions.length > 0 ? (
          <ul>
            {equipmentVersions.map((version) => (
              <li
                key={version.id}
                className="mb-2 border-b border-gray-300 pb-2"
              >
                <p>
                  <strong>Version:</strong> {version.version}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(version.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Data:</strong> {JSON.stringify(version.data, null, 2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No versions available</p>
        )}
      </div>
      {showAddUserDetails && (
        <AddUserDetailsForm
          onClose={() => setShowAddUserDetails(false)}
          onAdd={(newUser) => {
            setUserDetailsOptions((prev) => [...prev, newUser]);
            setSelectedUser(newUser.id);
            setFormData((prev) => ({
              ...prev,
              user: newUser.fullName,
              location: newUser.office,
            }));
          }}
        />
      )}
      {showAddEquipmentCard && (
        <AddEquipmentCardForm
          onClose={() => setShowAddEquipmentCard(false)}
          onAdd={(newCard) => {
            setEquipmentCardOptions((prev) => [...prev, newCard]);
            setSelectedEquipmentCard(newCard.name);
            setFormData((prev) => ({
              ...prev,
              name: newCard.name,
            }));
          }}
        />
      )}
    </div>
  );
};

export default EquipmentDetails;
