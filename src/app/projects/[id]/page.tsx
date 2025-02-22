"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

            } finally {
                setLoading(false);
            }
        }
        if (id) fetchProject();
    }, [id]);

    if (loading) return <p className="text-center text-green-700">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-green-300">
            {project.picture && (
                <div className="w-full h-64 relative">
                    <Image
                        src={`data:image/png;base64,${project.picture.toString("base64")}`}
                        alt={project.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </div>
            )}
            <h1 className="text-3xl font-bold text-green-800 mt-4">{project.name}</h1>
            <p className="text-gray-600 text-sm mt-1">
                Created on: {new Date(project.date_create).toLocaleDateString()}
            </p>
            <p className="mt-4 text-gray-700">{project.description}</p>
            <div className="mt-6">
                <p className="text-lg text-green-700 font-semibold">Goal: ${project.goal}</p>
                <p className="text-lg text-blue-600 font-semibold">Current Donations: ${project.donations}</p>
            </div>
            <div className="mt-6 flex justify-between">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Donate Now
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    Share Project
                </button>
            </div>
        </div>
    );
}
