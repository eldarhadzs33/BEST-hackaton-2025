import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.POSTGRES_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT 
                p.id, 
                p.name, 
                p.description, 
                p.goal, 
                p.likes, 
                p.donations, 
                p.date_create,
                c.name AS company_name,
                encode(p.picture, 'base64') AS image  -- Convert BYTEA to Base64 for frontend
            FROM "Project" p
            LEFT JOIN "Company" c ON p.id_company = c.id
        `);
        client.release();

        console.log("Database Query Result:", result.rows); // Debugging

        if (result.rows.length === 0) {
            return NextResponse.json({ projects: [] });
        }

        return NextResponse.json({ projects: result.rows });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}

