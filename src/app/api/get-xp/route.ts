import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "../../lib/db"; // Database connection

export async function GET() {
    try {
        const cookieStore = await cookies();
        const username = cookieStore.get("username")?.value;

        if (!username) {
            return NextResponse.json({ error: "Username not found in cookies." }, { status: 401 });
        }

        const client = await pool.connect();
        const result = await client.query(
            `SELECT xp FROM "Useri" WHERE username = $1`,
            [username]
        );
        client.release();

        if (result.rows.length > 0) {
            return NextResponse.json({ xp: result.rows[0].xp });
        } else {
            return NextResponse.json({ error: "User not found in database." }, { status: 404 });
        }
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch XP." }, { status: 500 });
    }
}
