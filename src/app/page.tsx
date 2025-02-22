"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import App from "@/components/ui/Navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

// Define TypeScript interfaces matching the API response
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
        // Ensure the leading slash is present
        const res = await fetch("/api/companies");
        const data = await res.json();
        setCompanies(data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading data...</p>
      </div>
    );
  }
  return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-white py-10">
        <div className="container mx-auto flex flex-col items-center gap-8">
          <App/>
          <TypewriterEffect
              words={[
                {text: "Change"},
                {text: "starts"},
                {text: "from"},
                {text: "YOU"}
              ]}
          />
          {companies.map(({company, project}) => (
              <div
                  key={company.id}
                  className="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
              >
                <Link href={`/projects/${project.id}`}>
                <DirectionAwareHover
                    imageUrl="/download.png" // Replace with your actual image path if needed
                    children="Support the cause!"
                    childrenClassName="text-2xl font-bold"
                    imageClassName="object-cover"
                    className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg shadow-lg overflow-hidden"
                />
                </Link>
                <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-md">
                  {/* Clickable company name that leads to the company profile page */}
                  <Link
                      href={`/companies/${company.id}`}
                      className="text-3xl font-extrabold text-gray-800 hover:underline"
                  >
                    {company.name}
                  </Link>
                  <h2 className="text-xl font-semibold text-gray-600">
                    {project.name}
                  </h2>
                  <p className="text-gray-500 text-center">
                    {company.description} — {project.description}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
