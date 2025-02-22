"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/auth/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            alert("Login successful!");
            router.push("/users");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {["username", "password"].map((field) => (
                    <div key={field} className="mb-4">
                        <label className="block text-gray-700 capitalize">{field}</label>
                        <input
                            type={field === "password" ? "password" : "text"}
                            name={field}
                            value={form[field as keyof typeof form]}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
