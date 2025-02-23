"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDonateForm, setShowDonateForm] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");

    useEffect(() => {
        async function fetchProject() {
            try {
                const res = await fetch(`/api/projects/${id}`);
                if (!res.ok) {
                    throw new Error("Project not found");
                }
                const data = await res.json();
                setProject(data);
            } catch (err) {
                setError("Failed to load project");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchProject();
    }, [id]);

    const handleDonate = () => {
        setShowDonateForm(true);
    };

    const handlePayment = async () => {
        if (!donationAmount || isNaN(parseFloat(donationAmount)) || parseFloat(donationAmount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: parseFloat(donationAmount) }),
            });

            if (!res.ok) {
                throw new Error("Failed to update donation");
            }

            alert(`You donated $${donationAmount} to ${project.name}!`);
            setShowDonateForm(false);
            setDonationAmount("");

            const updatedProject = await res.json();
            setProject(updatedProject);
        } catch (error) {
            console.error("Error donating:", error);
            alert("Donation failed. Please try again.");
        }
    };

    if (loading) return <p className="text-center text-green-700">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-gray-100 p-6"
            style={{
                backgroundImage: "url('/background-projekata.jpg')", // Putanja do slike
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
        <div className="flex justify-center items-center bg-gray-100">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden border border-green-300 p-5">
                {project.picture && (
                    <div className="h-64 relative mt-5 ms-5 mb-5 me-5">
                        <Image
                            src={project.picture}
                            alt={project.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                    </div>
                )}
                <h1 className="text-3xl font-bold text-green-800 mt-4 text-center">{project.name}</h1>
                <h3 className="text-xl font-semibold text-green-700 text-center">
                    ESG Rating: {Array(project.esg_rating).fill("🍃").join(" ")}
                </h3>

                <p className="text-gray-600 text-sm mt-1 text-center">
                    Created on: {new Date(project.date_create).toLocaleDateString()}
                </p>
                <p className="mt-4 text-gray-700 text-center">{project.description}</p>
                <div className="mt-6 text-center">
                    <p className="text-lg text-green-700 font-semibold">Goal: ${project.goal}</p>
                    <p className="text-lg text-blue-600 font-semibold">Current Donations: ${project.donations}</p>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-5"
                        onClick={handleDonate}
                    >
                        Donate Now
                    </button>
                </div>

                {showDonateForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
                                Donate to {project.name}
                            </h2>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                placeholder="Enter amount (USD)"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                            />
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                    onClick={() => setShowDonateForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    onClick={handlePayment}
                                >
                                    Pay
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}
