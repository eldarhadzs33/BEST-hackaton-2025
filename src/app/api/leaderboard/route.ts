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
            SELECT id, first_name, last_name, username, xp,
                   encode(profile_picture, 'base64') AS profile_picture
            FROM "Useri"
            ORDER BY xp DESC
            LIMIT 10;
        `);
        client.release();

        return NextResponse.json({ users: result.rows });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}
