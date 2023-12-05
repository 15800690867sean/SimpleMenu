import { NextResponse } from "next/server";
import mock from "./mockData";

export async function POST(req: any) {
    const isTestRequest = process.env.NODE_ENV === 'test';
    const body = isTestRequest ? JSON.parse(req.body) : await req.json();
    const {
        username,
        password,
    } = body;
    const user = mock.find((item) => {
        return item.username === username
    });
    // failed
    if (!user || user.password !== password) {
        return isTestRequest ? Promise.resolve({
            code: 1,
            status: 200,
        }) : NextResponse.json({code: 1}, {status: 200});
    }
    return isTestRequest
        ? Promise.resolve({
            code: 0,
            status: 200,
        })
        : NextResponse.json({code: 0}, {status: 200});
};
