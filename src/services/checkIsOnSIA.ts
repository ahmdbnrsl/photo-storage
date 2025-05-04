const WA_API_URL = process.env.WA_API_URL || '';
const WA_API_SECRET = process.env.WA_API_SECRET || '';

export async function checkIsOnSIA(wa_number: string) {
	try {
		const res = await fetch(WA_API_URL + 'insia', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				secret: WA_API_SECRET,
				number: wa_number,
			}),
		});
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}
		const result = await res.json();
		return result.status;
	} catch (error) {
		console.error(error);
		return false;
	}
}
