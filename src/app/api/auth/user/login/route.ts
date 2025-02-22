import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import pool from "../../../../lib/db";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Retrieve user from database
        const userResult = await pool.query(`SELECT * FROM "Useri" WHERE username = $1`, [username]);

        if (userResult.rows.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const user = userResult.rows[0];

        const cookieStore = await cookies();
        cookieStore.set("name", user.first_name, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 10 });
        cookieStore.set("username", user.username, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 10  });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
