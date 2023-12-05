import { NextResponse } from "next/server";
import mock from "./mockData.json";

export async function GET(req: any) {
    return NextResponse.json({data: mock}, {status: 200});
};
