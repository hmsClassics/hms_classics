import { NextRequest, NextResponse } from 'next/server'

type ResponseData = {
  message: string
}

export async function POST(req: NextRequest, res: NextResponse<ResponseData>) {
  const valid =
    req.headers.get('authorization') ===
    `Bearer ${process.env.STRAPI_WEBHOOK_SECRET}`

  // set global app state to trigger a refetch of the page query

  return NextResponse.json(
    {
      message: valid ? 'Success' : 'Unauthorized',
    },
    {
      status: valid ? 200 : 401,
    }
  )
}
