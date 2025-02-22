// app/companies/page.tsx

import Image from "next/image";
import pool from "../lib/db";

interface Company {
    id: number;
    name: string;
    description: string;
    companyAddress: string;
    email: string;
    ESG: number;
    logo: string | null; // Store Base64 string instead of Buffer
}

export default async function CompaniesPage() {
    let companies: Company[] = [];

    try {
        // Fetch all companies from the database
        const result = await pool.query(
            `SELECT id, name, description, companyAddress, email, ESG, logo FROM "Company"`
        );

        if (result.rows.length > 0) {
            companies = result.rows.map((company) => ({
                ...company,
                logo: company.logo ? `data:image/png;base64,${Buffer.from(company.logo).toString("base64")}` : null,
            }));
        }
    } catch (error) {
        console.error("Error fetching companies:", error);
    }

    if (companies.length === 0) {
        return (
            <div className="container my-5">
                <h1 className="text-center" style={{ color: "darkgreen" }}>
                    No companies found.
                </h1>
            </div>
        );
    }

    return (
        <div className="container my-5" style={{ backgroundColor: "white" }}>
            <h1 className="text-center mb-4" style={{ color: "darkgreen" }}>
                Company Directory
            </h1>
            {companies.map((company) => (
                <div key={company.id} className="card mb-4 shadow">
                    <div className="card-body d-flex flex-column flex-md-row align-items-center">
                        {company.logo ? (
                            <img
                                src={company.logo} // ✅ Correctly formatted Base64 image
                                alt={`${company.name} Logo`}
                                className="rounded-circle img-fluid mb-3 mb-md-0"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <div
                                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-3 mb-md-0"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                }}
                            >
                                <span className="text-white">No Logo</span>
                            </div>
                        )}
                        <div className="ms-md-4">
                            <h2 className="card-title" style={{ color: "darkgreen" }}>
                                {company.name}
                            </h2>
                            <p className="card-text" style={{ color: "black" }}>
                                {company.description}
                            </p>
                            <p className="card-text" style={{ color: "black" }}>
                                <strong>Address:</strong> {company.companyAddress}
                            </p>
                            <p className="card-text" style={{ color: "black" }}>
                                <strong>Email:</strong> {company.email}
                            </p>
                            <p className="card-text" style={{ color: "black" }}>
                                <strong style={{ color: "darkgreen", fontSize: "1.2rem" }}>
                                    ESG:
                                </strong>{" "}
                                {company.ESG}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}