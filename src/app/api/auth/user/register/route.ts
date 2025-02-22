import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "../../../../lib/db";


export async function POST(req: Request) {
    try {
        const { first_name, last_name, username, password } = await req.json();

        if (!first_name || !last_name || !username || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if username already exists
        const userCheck = await pool.query(`SELECT * FROM "Useri" WHERE username = $1`, [username]);
        if (userCheck.rows.length > 0) {
            return NextResponse.json({ error: "Username already taken" }, { status: 409 });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await pool.query(
            `INSERT INTO "Useri" (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`,
            [first_name, last_name, username, hashedPassword]
        );

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
