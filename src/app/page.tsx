"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import App from "@/components/ui/Navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import {HeroHighlightDemo} from "@/components/ui/hero-highlight";

// Definisanje TypeScript interfejsa za podatke iz API-ja
interface CompanyData {
    id: number;
    name: string;
    description: string;
    email: string;
    id_project: number;
}

interface ProjectData {
    id: number;
    name: string;
    description: string;
    date_create: string;
    goal: number;
    likes: number;
    donations: number;
    picture: string;
}

interface CompanyWithProject {
    company: CompanyData;
    project: ProjectData;
}

export default function Page() {
    const [companies, setCompanies] = useState<CompanyWithProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await fetch("/api/companies");
                const data = await res.json();
                setCompanies(data.companies);
            } catch (error) {
                console.error("Greška pri dohvaćanju kompanija:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCompanies();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-500">Učitavanje podataka...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#059669] to-white py-10">
            <App/>
            <div className="w-full">
                <img
                    src="/slika_za_app.jpg"
                    alt="Hero Image"
                    className="w-full h-96 object-cover"
                />
            </div>
            <div className="h-96">
                <HeroHighlightDemo>
                </HeroHighlightDemo>
            </div>
            <div className="container mx-auto flex flex-col items-center gap-12">
                <TypewriterEffect
                    words={[
                        {text: "Change"},
                        {text: "starts"},
                        {text: "with"},
                        {text: "YOU!"},
                    ]}
                    className="pt-56 pb-10 text-center text-4xl font-bold"
                />

                {companies.map(({company, project}) => (
                    <div
                        key={company.id}
                        className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg gap-8"
                    >
                        <Link href={`/projects/${project.id}`}>
                            <DirectionAwareHover
                                imageUrl={project.picture} // Zamijeni sa pravom slikom ako je potrebno
                                children="Support the cause!"
                                childrenClassName="text-2xl font-bold text-white"
                                imageClassName="object-cover"
                                className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg shadow-md overflow-hidden"
                            />
                        </Link>

                        <div className="flex flex-col items-center text-center gap-4 p-4">
                            <Link
                                href={`/companies/${company.id}`}
                                className="text-3xl font-extrabold text-gray-800 hover:underline"
                            >
                                {company.name}
                            </Link>
                            <h2 className="text-xl font-semibold text-gray-600">
                                {project.name}
                            </h2>
                            <p className="text-gray-500">{company.description} — {project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
