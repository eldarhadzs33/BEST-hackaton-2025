import { NextResponse } from "next/server";
import { Pool } from "pg";
import { cookies } from "next/headers";
import pool from "../../../lib/db";

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { params } = context; // Await context
        const projectId = params?.id; // Ensure ID is accessible

        if (!projectId) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

        const client = await pool.connect();
        const result = await client.query("SELECT * FROM \"Project\" WHERE id = $1", [projectId]);
        client.release();

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
    try {
        const { params } = context; // Await context
        const projectId = params?.id; // Ensure ID is accessible

        if (!projectId) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

        const { amount } = await req.json();

        if (!amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 });
        }

        // Get username from local cookies
        const cookieStore = await cookies(); // `cookies()` doesn't need await
        const username = cookieStore.get("username")?.value;

        if (!username) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const client = await pool.connect();

        // Update the donations column in the Project table
        const updateProjectQuery = `
            UPDATE "Project" 
            SET donations = donations + $1 
            WHERE id = $2 
            RETURNING *;
        `;
        const projectResult = await client.query(updateProjectQuery, [amount, projectId]);

        if (projectResult.rows.length === 0) {
            client.release();
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Update the user's XP in the Useri table
        const updateUserXPQuery = `
            UPDATE "Useri"
            SET xp = xp + $1

            WHERE username = $2

            RETURNING *;
        `;
        const userResult = await client.query(updateUserXPQuery, [ amount, username]);

        client.release();

        if (userResult.rows.length === 0 ) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            project: projectResult.rows[0],
            user: userResult.rows[0]
        });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
}
