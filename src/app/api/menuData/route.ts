import { NextResponse } from "next/server";
import mock from "./mockData.json";

export async function GET(req: any) {
    const isTestRequest = process.env.NODE_ENV === 'test';
    return isTestRequest
        ? Promise.resolve({
            data: mock,
            status: 200,
        })
        : NextResponse.json({data: mock}, {status: 200});
};
