import { NextResponse } from "next/server";
import mock from "./mockData";

export async function POST(req: any) {
    const body = await req.json();
    const {
        username,
        password,
    } = body;
    const user = mock.find((item) => {
        return item.username === username
    });
    // failed
    if (!user || user.password !== password) {
        return NextResponse.json({code: 1}, {status: 200});
    }
    return NextResponse.json({code: 0}, {status: 200});
};
