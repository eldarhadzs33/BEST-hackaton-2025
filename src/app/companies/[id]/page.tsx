import { Pool } from "pg";
import { notFound } from "next/navigation";

// Define the company data structure
interface CompanyWithProject {
  id: number;
  name: string;
  description: string;
  email?: string;
  project_name: string;
  project_description: string;
}

// PostgreSQL Connection Setup
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

// Fetch company data (runs on the server)
async function getCompany(companyId: number) {
  try {
    const query = `
      SELECT
        c.id AS id,
        c.name AS name,
        c.description AS description,
        p.name AS project_name,
        p.description AS project_description
      FROM "Company" c
      LEFT JOIN "Project" p ON c.id_project = p.id
      WHERE c.id = $1
    `;
    const { rows } = await pool.query<CompanyWithProject>(query, [companyId]);

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error fetching company data:", error);
    return null;
  }
}

// ✅ Use `async` in server component
export default async function CompanyProfile({ params }: { params: { id?: string } }) {
  if (!params?.id) return notFound();

  const companyId = parseInt(params.id, 10);
  if (isNaN(companyId)) return notFound();

  const company = await getCompany(companyId);
  if (!company) return notFound();

  return (
      <div className="min-h-screen bg-gray-100 p-10">
        <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
          <h1 className="text-4xl font-bold text-gray-800">{company.name}</h1>
          <p className="mt-4 text-gray-600">{company.description}</p>
          {company.project_name && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Project: {company.project_name}
                </h2>
                <p className="mt-2 text-gray-600">{company.project_description}</p>
              </div>
          )}
        </div>
      </div>
  );
}
