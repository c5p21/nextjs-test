import { NextRequest, NextResponse } from "next/server";

// 设置为动态路由(强制每次请求都重新生成)
// 不加这行代码，会缓存数据，不会重新生成
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

    console.log('request**************************');

    return NextResponse.json({ message: `Hello` });
}