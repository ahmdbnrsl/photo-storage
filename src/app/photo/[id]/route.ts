import { NextResponse, NextRequest } from 'next/server';

const STORAGE_URL = process.env.STORAGE_URL || null;

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;
	if (!STORAGE_URL) {
		return NextResponse.json(
			{ status: 'error', code: 500, message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
	const image = await fetch(`${STORAGE_URL}/${id}`);
	if (!image.ok) {
		return NextResponse.json(
			{ status: 'error', code: 404, message: 'Not Found' },
			{ status: 404 }
		);
	}
	return image;
}
