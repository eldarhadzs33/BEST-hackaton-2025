// src/app/api/companies/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure DATABASE_URL is set
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const query = `
      SELECT
        c.id AS id,
        c.name AS name,
        c.description AS description,
        c.email AS email,
        c.id_project AS id_project,
        p.id AS project_id,
        p.name AS project_name,
        p.description AS project_description,
        p.date_create AS date_create,
        p.goal AS goal,
        p.likes AS likes,
        p.donations AS donations
      FROM "Company" c
      INNER JOIN "Project" p ON c.id_project = p.id
    `;
    const { rows } = await pool.query(query);

    // Map each row to an object with both company and project data
    const companies = rows.map((row) => ({
      company: {
        id: row.id,
        name: row.name,
        description: row.description,
        email: row.email,
        id_project: row.id_project,
      },
      project: {
        id: row.project_id,
        name: row.project_name,
        description: row.project_description,
        date_create: row.date_create,
        goal: row.goal,
        likes: row.likes,
        donations: row.donations,
      },
    }));

    return NextResponse.json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
