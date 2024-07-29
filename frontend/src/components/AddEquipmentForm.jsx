import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddUserDetailsForm from "./AddUserDetailsForm";
import AddEquipmentCardForm from "./AddEquipmentCardForm";

const AddEquipmentForm = () => {
  const [name, setName] = useState("");
  const [inventoryNumber, setInventoryNumber] = useState("");
  const [location, setLocation] = useState("");
  const [user, setUser] = useState("");
  const [note, setNote] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedEquipmentCard, setSelectedEquipmentCard] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userDetailsOptions, setUserDetailsOptions] = useState([]);
  const [equipmentCardOptions, setEquipmentCardOptions] = useState([]);
  const [showAddUserDetails, setShowAddUserDetails] = useState(false);
  const [showAddEquipmentCard, setShowAddEquipmentCard] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const userDetailsResponse = await axios.get(
          "http://localhost:3000/api/userDetails",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const equipmentCardResponse = await axios.get(
          "http://localhost:3000/api/equipmentCard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserDetailsOptions(userDetailsResponse.data);
        setEquipmentCardOptions(equipmentCardResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEquipmentCardChange = (e) => {
    const selectedCardName = e.target.value;
    setSelectedEquipmentCard(selectedCardName);
    setName(selectedCardName);
  };

  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    console.log("Selected User ID:", selectedUserId);

    const selectedUserObj = userDetailsOptions.find(
      (user) => String(user.id) === String(selectedUserId)
    );

    console.log("Selected User Object:", selectedUserObj);

    if (selectedUserObj) {
      setSelectedUser(selectedUserId);
      setUser(selectedUserObj.fullName);
      setLocation(selectedUserObj.office);
    } else {
      setSelectedUser("");
      setUser("");
      setLocation("");
    }
  };

  const handleNameChange = (e) => {
    const enteredName = e.target.value;
    setName(enteredName);
    setSelectedEquipmentCard("");
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      name, // Equipment name (either from EquipmentCard or entered manually)
      inventoryNumber, // Unique inventory number
      location, // Location of the equipment
      user, // Full name of the user (directly from UserDetails)
      note, // Optional note about the equipment
      serialNumber, // Unique serial number
      // No need for equipmentCardId as we're using 'name' for EquipmentCard
    };

    try {
      await axios.post("http://localhost:3000/api/equipment", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Equipment added successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding equipment:", error);
      setErrorMessage("Failed to add equipment. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleUserDetailsAdded = (newUserDetails) => {
    setUserDetailsOptions((prevOptions) => [...prevOptions, newUserDetails]);
    setShowAddUserDetails(false);
  };

  const handleEquipmentCardAdded = (newEquipmentCard) => {
    setEquipmentCardOptions((prevOptions) => [
      ...prevOptions,
      newEquipmentCard,
    ]);
    setName(newEquipmentCard.name);
    setSelectedEquipmentCard(newEquipmentCard.name);
    setShowAddEquipmentCard(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <div className="mt-2">
            <label className="block text-gray-700">Equipment Card</label>
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
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Inventory Number</label>
          <input
            type="text"
            value={inventoryNumber}
            onChange={(e) => setInventoryNumber(e.target.value)}
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
            value={location}
            onChange={handleLocationChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Equipment
        </button>
      </form>
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          {errorMessage}
        </div>
      )}
      {showAddUserDetails && (
        <AddUserDetailsForm onUserDetailsAdded={handleUserDetailsAdded} />
      )}
      {showAddEquipmentCard && (
        <AddEquipmentCardForm onEquipmentCardAdded={handleEquipmentCardAdded} />
      )}
    </div>
  );
};

export default AddEquipmentForm;
