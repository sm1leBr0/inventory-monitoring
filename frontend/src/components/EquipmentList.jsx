import React, { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/equipment", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch equipment");
        }
        const data = await response.json();
        setEquipment(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Equipment List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Info
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Inventory Number
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                User
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/equipment/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    <FaInfo className="inline-block mr-1" />
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.inventoryNumber}</td>
                <td className="py-2 px-4 border-b">{item.location}</td>
                <td className="py-2 px-4 border-b">{item.user}</td>
                <td className="py-2 px-4 border-b">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentList;
