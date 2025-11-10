import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FemaleMeasurementDetails = () => {

    const [imageOpen, setImageOpen] = useState(null);


    const usenavigate = useNavigate();


    const [measurementDetails, SetmeasurementDetails] = useState({
        bust: "",
        waist: "",
        hips: "",
        shoulder: "",
        neck: "",
        armhole: "",
        sleeveLength: "",
        bicep: "",
        wrist: "",
        thigh: "",
        inseam: "",
        outseam: "",
    })

    const handleMeasurementDetails = (e) => {
        const { name, value } = e.target;
        SetmeasurementDetails({ ...measurementDetails, [name]: value });
    }

    const handleSubmitMeasurementDetails = async () => {
        try {
            const response = await fetch("http://localhost:3006/femalemeasurement/add-measurement", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(measurementDetails)
            })
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            usenavigate("/address");
            return data;
        } catch (error) {
            console.log("Not Add Measurement Details: ", error);
        }
    }

    const fields = [
        { label: "Bust", value: measurementDetails.bust, name: "bust", img: "/MensMeasurementImg/shoulder_measurement.jpg" },
        { label: "Waist", value: measurementDetails.waist, name: "waist", img: "/MensMeasurementImg/sleeve_length_measurement.jpg" },
        { label: "Hips", value: measurementDetails.hips, name: "hips", img: "/MensMeasurementImg/chest_measurement.jpg" },
        { label: "Shoulder", value: measurementDetails.shoulder, name: "shoulder", img: "/MensMeasurementImg/waist_measurement.jpg" },
        { label: "Neck", value: measurementDetails.neck, name: "neck", img: "/MensMeasurementImg/hip_measurement.jpg" },
        { label: "Armhole", value: measurementDetails.armhole, name: "armhole", img: "/MensMeasurementImg/hip_measurement.jpg" },
        { label: "SleeveLength", value: measurementDetails.sleeveLength, name: "sleeveLength", img: "/MensMeasurementImg/hip_measurement.jpg" },
        { label: "Bicep", value: measurementDetails.bicep, name: "bicep", img: "/MensMeasurementImg/hip_measurement.jpg" },
        { label: "Wrist", value: measurementDetails.wrist, name: "wrist", img: "/MensMeasurementImg/hip_measurement.jpg" },
        { label: "Thigh", value: measurementDetails.thigh, name: "thigh", img: "/MensMeasurementImg/hip_measurement.jpg" },
        { label: "Inseam", value: measurementDetails.inseam, name: "inseam", img: "/MensMeasurementImg/hip_measurement.jpg" },
        { label: "Outseam", value: measurementDetails.outseam, name: "outseam", img: "/MensMeasurementImg/hip_measurement.jpg" },

    ]

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitMeasurementDetails();
                }}>
                    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                            Female Measurement Form
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
        </>
    )
}

export default FemaleMeasurementDetails