import { NextResponse } from "next/server";
import pool from "../../../../lib/db";
import { upload } from "../../../../lib/multer";
import sharp from "sharp";

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const email = formData.get("email") as string;
        const companyAddress = formData.get("companyAddress") as string;
        const logo = formData.get("logo") as File | null;

        if (!name || !description || !email || !companyAddress || !logo) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if email already exists
        const companyCheck = await pool.query(
            `SELECT * FROM "Company" WHERE email = $1`, [email]
        );
        if (companyCheck.rows.length > 0) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        // Convert image to binary (resize and optimize using sharp)
        const logoBuffer = await logo.arrayBuffer();
        const optimizedLogo = await sharp(Buffer.from(logoBuffer))
            .resize(200, 200)
            .jpeg({ quality: 80 })
            .toBuffer();

        // Insert company into database
        await pool.query(
            `INSERT INTO "Company" (name, description, companyAddress, email, logo) VALUES ($1, $2, $3, $4, $5)`,
            [name, description, companyAddress, email, optimizedLogo]
        );

        return NextResponse.json({ message: "Company registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
