"use client";
import React, { useEffect, useState } from "react";
import App from "@/components/ui/Navbar";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    xp: number;
    profile_picture?: string; // Base64 image string
}

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const res = await fetch("/api/leaderboard");
                const data = await res.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-white py-10 flex flex-col items-center">
            <App />
            <h1 className="text-4xl font-bold text-gray-800 mt-10">Leaferboard</h1>

            {loading ? (
                <p className="text-xl text-gray-600 mt-6">Loading...</p>
            ) : (
                <div className="mt-8 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="p-3">Rank</th>
                            <th className="p-3">User</th>
                            <th className="p-3 text-right">XP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="border-b">
                                <td className="p-3 text-center font-bold">{index + 1}</td>
                                <td className="p-3 flex items-center gap-4">
                                    <img
                                        src={
                                            user.profile_picture
                                                ? `data:image/png;base64,${user.profile_picture}`
                                                : "/default-avatar.png"
                                        }
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-medium text-gray-800">
                                            {user.first_name} {user.last_name} (@{user.username})
                                        </span>
                                </td>
                                <td className="p-3 text-right font-semibold text-green-600">{user.xp}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
