import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserAddress = () => {

    const navigate = useNavigate();

    const [userAddress, setUserAddress] = useState({
        name: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: ""
    });

    const handleUserAddress = (e) => {
        const { name, value } = e.target;
        setUserAddress({ ...userAddress, [name]: value });
    }

    const handleSubmitUserAddress = async () => {
        try {
            const response = await fetch("http://localhost:3006/useraddress/user-address", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userAddress)
            })
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            navigate("/malemeasurement");
            return data;
        } catch (error) {
            console.log("User Address Not Send: ", error);
        }
    }

    const sections = [
        {
            title: "Contact Detail",
            fileds: [
                { placeholder: "Name", name: "name", value: userAddress.name },
                { placeholder: "Phone", name: "phone", value: userAddress.phone },
            ]
        },
        {
            title: "Address Detail",
            fileds: [
                { placeholder: "addressLine1", name: "addressLine1", value: userAddress.addressLine1 },
                { placeholder: "addressLine2", name: "addressLine2", value: userAddress.addressLine2 },
                { placeholder: "city", name: "city", value: userAddress.city },
                { placeholder: "state", name: "state", value: userAddress.state },
                { placeholder: "postalCode", name: "postalCode", value: userAddress.postalCode },
            ]
        }
    ]

    return (
        <>
            <div className='w-full flex justify-center p-6'>
                <div className='border-2 border-gray-400 rounded-2xl w-[600px] p-6'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitUserAddress();
                    }}>
                        {sections.map((section, index) => (
                            <div key={index} className='mb-6'>
                                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                    {section.title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {section.fileds.map((field, i) => (
                                        <div key={i}>
                                            <label className="block text-gray-600 mb-1">{field.label}</label>
                                            <input
                                                type="text"
                                                value={field.value}
                                                name={field.name}
                                                onChange={handleUserAddress}
                                                placeholder={`Enter ${field.placeholder}`}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className='w-full flex justify-center '>
                            <button className='w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserAddress