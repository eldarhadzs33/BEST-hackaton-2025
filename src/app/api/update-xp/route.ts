import { NextResponse } from "next/server";
import pool from "../../lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { lp } = await req.json();

        // Get username from cookies (assuming users are authenticated)
        const cookieStore = await cookies();
        const username = cookieStore.get("username")?.value;

        if (!username) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const client = await pool.connect();
        const updateUserXPQuery = `
            UPDATE "Useri"
            SET xp = xp + $1
            WHERE username = $2
            RETURNING xp;
        `;

        const result = await client.query(updateUserXPQuery, [lp, username]);
        client.release();

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "XP updated successfully", xp: result.rows[0].xp });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to update XP" }, { status: 500 });
    }
}
