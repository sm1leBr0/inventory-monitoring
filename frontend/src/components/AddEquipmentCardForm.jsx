// src/components/AddEquipmentCardForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AddEquipmentCardForm = ({ onEquipmentCardAdded }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [technicalCharacteristics, setTechnicalCharacteristics] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      name,
      photo,
      technicalCharacteristics,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/equipmentCard",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onEquipmentCardAdded(response.data);
      setName("");
      setPhoto("");
      setTechnicalCharacteristics("");
    } catch (error) {
      console.error("Error adding equipment card:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Add Equipment Card</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Technical Characteristics
          </label>
          <textarea
            value={technicalCharacteristics}
            onChange={(e) => setTechnicalCharacteristics(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Equipment Card
        </button>
      </form>
    </div>
  );
};

export default AddEquipmentCardForm;
