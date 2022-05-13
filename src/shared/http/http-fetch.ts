async function httpFetch<T>(
	url: string,
	method: string = 'GET',
	body: BodyInit | null | undefined = null,
	headers: {} = {}
): Promise<T> {
	try {
		const response = await fetch(url, {
			method,
			body,
			headers,
		});
		const data = await response.json();

		return data as T;
	} catch (err: any) {
		console.error('Error occurred fetching data', err);
		throw new Error(err.message);
	}
}

export default httpFetch;
