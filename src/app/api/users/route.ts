import { NextResponse } from "next/server";
import { Pool } from "pg";
import { cookies } from "next/headers";

// PostgreSQL Connection
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.POSTGRES_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

// GET User from cookie username
export async function GET() {
    try {
        const username =  (await cookies()).get("username")?.value;
        if (!username) {
            return NextResponse.json({ error: "User not logged in" }, { status: 401 });
        }

        const client = await pool.connect();
        const query = `
            SELECT first_name, last_name, xp, username, leaf, daily_streak, 
                   encode(profile_picture, 'base64') AS profile_picture
            FROM "Useri"
            WHERE username = $1
        `;
        const result = await client.query(query, [username]);
        client.release();

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}
