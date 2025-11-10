import { useState } from 'react'
import { X } from "lucide-react"
import { useNavigate } from 'react-router-dom';

const MaleMeasurementDetails = () => {

  const [imageOpen, setImageOpen] = useState(null);

  const usenavigate = useNavigate();

  const [measurementDetails, SetmeasurementDetails] = useState({
    fullShoulder: "",
    fullSleeves: "",
    fullChest: "",
    waist: "", 
    hips: "",
    frontChest: "", 
    backChestLength: "",
    jacket: "",
    pantWaist: "",
    thigh: "",
    fullCrotch: "",
    pantLength: "",
    arms: "",
    neck: ""
  })

  const handleMeasurementDetails = (e) => {
    const { name, value } = e.target;
    SetmeasurementDetails({ ...measurementDetails, [name]: value });
  }

  const handleImgOpen = (index) => {
    setImageOpen(index);
  }  

  const handleSubmitMeasurementDetails = async () => {
    try {
      const response = await fetch("http://localhost:3006/malemeasurement/add-measurement", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(measurementDetails)
      })
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      console.log("data save successfully");
      usenavigate("/address");
      return data;
    } catch (error) {
        console.log("Not Add Measurement Details: ", error);
      
    }
  }

  const fields = [
    { label: "Full Shoulder", value: measurementDetails.fullShoulder, name: "fullShoulder", img: "/MensMeasurementImg/shoulder_measurement.jpg" },
    { label: "Full Sleeves", value: measurementDetails.fullSleeves, name: "fullSleeves", img: "/MensMeasurementImg/sleeve_length_measurement.jpg" },
    { label: "Full Chest", value: measurementDetails.fullChest, name: "fullChest", img: "/MensMeasurementImg/chest_measurement.jpg" },
    { label: "Waist", value: measurementDetails.waist, name: "waist", img: "/MensMeasurementImg/waist_measurement.jpg" },
    { label: "Hips", value: measurementDetails.hips, name: "hips", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Front Chest", value: measurementDetails.frontChest, name: "frontChest", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Back Chest Length", value: measurementDetails.backChestLength, name: "backChestLength", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Jacket", value: measurementDetails.jacket, name: "jacket", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Pant Waist", value: measurementDetails.pantWaist, name: "pantWaist", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Thigh", value: measurementDetails.thigh, name: "thigh", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Full Crotch", value: measurementDetails.fullCrotch, name: "fullCrotch", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Pant Length", value: measurementDetails.pantLength, name: "pantLength", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Arms", value: measurementDetails.arms, name: "arms", img: "/MensMeasurementImg/hip_measurement.jpg" },
    { label: "Neck", value: measurementDetails.neck, name: "neck", img: "/MensMeasurementImg/hip_measurement.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmitMeasurementDetails();
      }}>
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Male Measurement Form
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition relative">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    value={field.value}
                    name={field.name}
                    onChange={handleMeasurementDetails}
                    placeholder={`Enter ${field.label}`}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                  />
                </div>
                <img
                  src={field.img}
                  alt={field.label}
                  onClick={() => handleImgOpen(index)}
                  className="w-16 h-16 object-cover ml-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>

          <button
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Image Modal */}
      {imageOpen !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative max-w-3xl max-h-[80vh]">
            <img
              src={fields[imageOpen].img}
              alt={fields[imageOpen].label}
              className="rounded-lg shadow-2xl object-contain max-h-[80vh] transition-transform transform scale-100"
            />
            <button
              onClick={() => setImageOpen(null)}
              className="absolute top-5 right-5 bg-black rounded-full p-2 shadow  transition cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaleMeasurementDetails
