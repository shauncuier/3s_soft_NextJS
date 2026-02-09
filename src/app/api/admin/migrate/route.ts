import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const dataPath = path.join(process.cwd(), "src/data");

        // Helper to read JSON
        const readJson = (file: string) => JSON.parse(fs.readFileSync(path.join(dataPath, file), "utf8"));

        const data = {
            blogs: readJson("blogs.json"),
            portfolio: readJson("portfolio.json").portfolio,
            team: readJson("team.json"),
            testimonials: readJson("testimonials.json"),
            services: readJson("services.json")
        };

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Migration read error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
