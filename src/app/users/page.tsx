import Image from "next/image";
import pool from "../lib/db";

export default async function UsersPage() {
    // Query the database to get first_name and last_name from Useri table.
    let users = [];
    try {
        const result = await pool.query('SELECT first_name, last_name FROM "Useri"');
        users = result.rows;
    } catch (error) {
        console.error("Database query error:", error);
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center">
                    <Image
                        src="/download.png"
                        alt="Centered Image"
                        width={500}
                        height={300}
                        className="rounded-md mb-6"
                    />
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                        User Directory
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Discover our community of professionals.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
                    <ul className="divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <li
                                    key={index}
                                    className="py-4 flex items-center justify-between"
                                >
                  <span className="text-lg text-gray-800 font-medium">
                    {user.first_name} {user.last_name}
                  </span>
                                    <span className="text-sm text-gray-500">Member</span>
                                </li>
                            ))
                        ) : (
                            <li className="py-4 text-center text-gray-500">
                                No users found
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
