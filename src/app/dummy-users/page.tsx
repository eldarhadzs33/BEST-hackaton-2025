"use client";
import React from "react";
import App from "@/components/ui/Navbar";
import Image from "next/image";
import { GlareCard } from "@/components/ui/glare-card"; // Assuming this is a custom component

export default function UserProfile() {
    // Dummy user data
    const user = {
        name: "Mirza The Math Wizard",
        username: "mirza_voli_mat",
        email: "mirza@school.com",
        phone: "+387 60 15 14 99 34",
        profilePicture: "/mirza.jpg", // Placeholder image
        xp: 3141
    };

    // Dummy supported projects
    const supportedProjects = [
        {
            id: 1,
            name: "Save the Rainforest",
            description: "A project focused on reforestation efforts in the Amazon.",
            image: "/rainforest.jpg",
        },
        {
            id: 2,
            name: "Ocean Cleanup Initiative",
            description: "Removing plastic waste from the oceans and protecting marine life.",
            image: "/ocean.jpg",
        },
        {
            id: 3,
            name: "Solar Energy for Schools",
            description: "Providing renewable energy solutions for underprivileged schools.",
            image: "/panels.jpg",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-white flex flex-col items-center mt-16">
            <App />

            <div className="container mx-auto flex flex-col items-center justify-center p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center text-center">

                    {/* Left Card */}
                    <GlareCard
                        className="p-6 bg-green-700 text-white shadow-lg rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold">🌿 Naturalist 🌿</h2>
                        <p className="text-center mt-2">
                            Protecting the environment is not an obligation; it’s our responsibility.
                        </p>
                        <br/>
                        <hr/>
                        <h4 className="text-center mt-2 font-bold text-info">Total LP:</h4>
                        <h1 className="text-4xl text-center mt-2 font-bold text-info">{user.xp}</h1>
                        <br/>
                        <h4 className="text-center mt-2 font-bold text-info">Leaderboard position:</h4>
                        <h1 className="text-5xl text-center mt-2 font-bold text-info">1</h1>
                    </GlareCard>

                    {/* Center Profile Details */}
                    <div className="bg-white p-9 shadow-lg rounded-lg flex flex-col items-center justify-center">
                        {/* Profile Picture */}
                        <Image
                            src={
                                user.profilePicture
                            }
                            alt="User Profile"
                            width={120}
                            height={120}
                            className="rounded-full border border-green-500 shadow-md"
                        />
                        {/* User Information */}
                        <h1 className="text-2xl font-bold text-green-800 mt-4">{user.name}</h1>
                        <p className="text-gray-600 text-lg">@{user.username}</p>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="text-gray-500">{user.phone}</p>
                    </div>
                </div>

                {/* Previously Supported Projects Section */}
                <div className="w-full mt-10">
                    <h2 className="text-3xl font-bold text-green-800 text-center mb-6">🌎 Previously Supported Projects</h2>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
                        {supportedProjects.map((project) => (
                            <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-green-700">{project.name}</h3>
                                    <p className="text-gray-600 text-sm">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}