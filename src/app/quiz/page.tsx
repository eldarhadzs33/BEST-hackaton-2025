"use client";

import { useState } from "react";

interface Question {
    id: number;
    text: string;
    answers: { id: number; text: string }[];
    correctAnswerId : number;
}

export default function GlobalWarmingQuiz() {
    const questions: Question[] = [
        {
            id: 1,
            text: "What is the primary cause of global warming?",
            correctAnswerId: 2,
            answers: [
                { id: 1, text: "Deforestation" },
                { id: 2, text: "Burning fossil fuels" }, // ✅ Correct
                { id: 3, text: "Solar flares" },
                { id: 4, text: "Increased volcanic activity" }
            ],
        },
        {
            id: 2,
            text: "Which greenhouse gas is the biggest contributor to global warming?",
            correctAnswerId: 2,
            answers: [
                { id: 1, text: "Oxygen (O₂)" },
                { id: 2, text: "Carbon dioxide (CO₂)" }, // ✅ Correct
                { id: 3, text: "Nitrogen (N₂)" },
                { id: 4, text: "Hydrogen (H₂)" }
            ],
        },
        {
            id: 3,
            text: "What is the effect of rising global temperatures on sea levels?",
            correctAnswerId: 1,
            answers: [
                { id: 1, text: "Sea levels rise" }, // ✅ Correct
                { id: 2, text: "Sea levels stay the same" },
                { id: 3, text: "Sea levels decrease" },
                { id: 4, text: "No impact" }
            ],
        },
        {
            id: 4,
            text: "Which of these energy sources is the most sustainable for reducing global warming?",
            correctAnswerId: 3,
            answers: [
                { id: 1, text: "Coal" },
                { id: 2, text: "Nuclear" },
                { id: 3, text: "Solar" }, // ✅ Correct
                { id: 4, text: "Natural gas" }
            ],
        },
        {
            id: 5,
            text: "What percentage of scientists agree that human activities contribute to global warming?",
            correctAnswerId: 3,
            answers: [
                { id: 1, text: "50%" },
                { id: 2, text: "75%" },
                { id: 3, text: "97%" }, // ✅ Correct
                { id: 4, text: "30%" }
            ],
        },
        {
            id: 6,
            text: "Which sector emits the most CO₂ globally?",
            correctAnswerId: 4,
            answers: [
                { id: 1, text: "Agriculture" },
                { id: 2, text: "Transportation" },
                { id: 3, text: "Industry" },
                { id: 4, text: "Energy production" } // ✅ Correct
            ],
        },
        {
            id: 7,
            text: "What is the term for the long-term heating of Earth's climate system?",
            correctAnswerId: 2,
            answers: [
                { id: 1, text: "Climate fluctuation" },
                { id: 2, text: "Climate change" }, // ✅ Correct
                { id: 3, text: "Seasonal variation" },
                { id: 4, text: "El Niño" }
            ],
        },
        {
            id: 8,
            text: "Which international agreement aims to reduce global carbon emissions?",
            correctAnswerId: 2,
            answers: [
                { id: 1, text: "Kyoto Protocol" },
                { id: 2, text: "Paris Agreement" }, // ✅ Correct
                { id: 3, text: "Montreal Protocol" },
                { id: 4, text: "Rio Summit" }
            ],
        },
        {
            id: 9,
            text: "What is a major consequence of Arctic ice melting?",
            correctAnswerId: 2,
            answers: [
                { id: 1, text: "More polar bears" },
                { id: 2, text: "Rising sea levels" }, // ✅ Correct
                { id: 3, text: "Decrease in earthquakes" },
                { id: 4, text: "More fresh water supply" }
            ],
        },
        {
            id: 10,
            text: "Which human activity contributes the most to carbon emissions?",
            correctAnswerId: 2,
            answers: [
                { id: 1, text: "Using electric vehicles" },
                { id: 2, text: "Burning fossil fuels" }, // ✅ Correct
                { id: 3, text: "Drinking bottled water" },
                { id: 4, text: "Eating organic food" }
            ],
        },
        {
            id: 11,
            text: "How can individuals reduce their carbon footprint?",
            correctAnswerId: 1,
            answers: [
                { id: 1, text: "Using energy-efficient appliances" }, // ✅ Correct
                { id: 2, text: "Driving more often" },
                { id: 3, text: "Burning wood for fuel" },
                { id: 4, text: "Eating more processed foods" }
            ],
        },
        {
            id: 12,
            text: "Which of these actions does NOT help combat global warming?",
            correctAnswerId: 2,
            answers: [
                { id: 1, text: "Planting trees" },
                { id: 2, text: "Burning coal for heat" }, // ✅ Correct
                { id: 3, text: "Using public transportation" },
                { id: 4, text: "Installing solar panels" }
            ],
        }
    ];

    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const lp = score*10;

    const handleChange = (questionId: number, answerId: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    };

    const updateUserXP = async (lpValue: number) => {
        try {
            const res = await fetch("/api/update-xp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lp: lpValue })
            });

            if (!res.ok) {
                console.error("Failed to update XP.");
            }
        } catch (error) {
            console.error("Error updating XP:", error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswerId) {
                correctCount++;
            }
        });

        const earnedLp = correctCount * 10; // Calculate LP points

        setScore(correctCount);
        setSubmitted(true);

        // ✅ Call updateUserXP to update XP in the database
        updateUserXP(earnedLp);
    };

    return (
        <div className="max-w-3xl mx-auto bg-green-100 shadow-lg rounded-lg p-6 border border-green-300 mt-10">
            <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
                🌍 Global Warming Quiz
            </h1>
            {submitted ? (
                <p className="text-lg text-green-700 font-semibold text-center">
                    ✅ Quiz Submitted! You got {score} out of {questions.length} correct. <br />
                    🎉 You earned <span className="font-bold">{lp}</span> Leafer Points! <br />
                    🚀 Your XP has been updated in your profile.
                </p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {questions.map((q) => (
                        <div key={q.id} className="mb-6">
                            <p className="font-bold text-green-900">{q.text}</p>
                            {q.answers.map((a) => (
                                <label key={a.id} className="block text-green-800">
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={a.id}
                                        onChange={() => setAnswers(prev => ({ ...prev, [q.id]: a.id }))}
                                        className="mr-2"
                                        required
                                    />
                                    {a.text}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all"
                    >
                        Submit Quiz
                    </button>
                </form>
            )}
        </div>
    );
}