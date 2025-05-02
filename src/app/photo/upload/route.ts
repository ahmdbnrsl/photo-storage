import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';
import { fileTypeFromBuffer } from 'file-type';

const OctoWithPlugin = Octokit.plugin(restEndpointMethods);

const githubUsername: string = process.env.GH_USN || '';
const octoConfig = new OctoWithPlugin({
	auth: process.env.GH_TOKEN || '',
});

export async function POST(request: Request) {
	const { FileBase64 } = await request.json();
	const buffer = Buffer.from(FileBase64, 'base64');
	const fileExtension = await fileTypeFromBuffer(buffer);

	if (!fileExtension) throw new Error('File extension not found');
	if (!['png', 'jpg', 'jpeg'].includes(fileExtension.ext))
		throw new Error('File extension not found');

	const content = buffer.toString('base64');
	try {
		const response = await octoConfig.rest.repos.createOrUpdateFileContents(
			{
				owner: githubUsername,
				repo: 'storage',
				path: `storage/${Date.now().toString()}.png`,
				message: Date.now().toString(),
				content,
			}
		);
		if (response.status === 201) {
			return NextResponse.json(
				{
					status: 'success',
					code: 200,
					message: 'Success Upload image to storage',
				},
				{ status: 200 }
			);
		}
		throw new Error('Failed Upload image to storage');
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ status: 'error', code: 500, message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json(
		{ status: 'error', code: 405, message: 'Method Not Allowed' },
		{ status: 405 }
	);
}
