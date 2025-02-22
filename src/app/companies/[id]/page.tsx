// File: src/app/companies/[id]/page.tsx
import { Pool } from "pg";
import { notFound } from "next/navigation";

interface CompanyWithProject {
  id: number;
  name: string;
  description: string;
  email?: string;
  project_name: string;
  project_description: string;
  // Add other fields as needed
}

export default async function CompanyProfile({
  params,
}: {
  params: { id: string };
}) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  // Query the specific company joined with its project
  const query = `
    SELECT
      c.id AS id,
      c.name AS name,
      c.description AS description,
      p.name AS project_name,
      p.description AS project_description
    FROM "Company" c
    INNER JOIN "Project" p ON c.id_project = p.id
    WHERE c.id = $1
  `;
  const { rows } = await pool.query<CompanyWithProject>(query, [params.id]);

  if (!rows || rows.length === 0) {
    notFound();
  }

  const company = rows[0];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-4xl font-bold text-gray-800">{company.name}</h1>
        <p className="mt-4 text-gray-600">{company.description}</p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Project: {company.project_name}
          </h2>
          <p className="mt-2 text-gray-600">{company.project_description}</p>
        </div>
      </div>
    </div>
  );
}
