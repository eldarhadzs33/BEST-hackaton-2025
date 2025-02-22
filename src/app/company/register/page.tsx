"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyRegister() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", description: "", email: "", companyAddress: "" });
    const [logo, setLogo] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setLogo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("email", form.email);
        formData.append("companyAddress", form.companyAddress);
        if (logo) formData.append("logo", logo);

        const res = await fetch("/api/auth/company/register", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            router.push("/company/login");
        } else {
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Company Register</h1>
                {["name", "description", "email", "companyAddress"].map((field) => (
                    <div key={field} className="mb-4">
                        <label className="block text-gray-700 capitalize">{field.replace("_", " ")}</label>
                        <input
                            type={field === "description" ? "textarea" : "text"}
                            name={field}
                            value={form[field as keyof typeof form]}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-gray-700">Logo (JPG/PNG)</label>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    );
}
