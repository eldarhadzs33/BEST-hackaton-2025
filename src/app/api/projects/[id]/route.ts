import { NextResponse } from "next/server";
import { Pool } from "pg";

import pool from "../../../lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM \"Project\" WHERE id = $1", [params.id]);
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
