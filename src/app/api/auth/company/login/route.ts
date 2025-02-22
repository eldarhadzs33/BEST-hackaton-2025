import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export const POST = async (req: Request) => {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Retrieve company from database
        const companyResult = await pool.query(
            `SELECT * FROM "Company" WHERE name = $1 AND email = $2`, [name, email]
        );

        if (companyResult.rows.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
