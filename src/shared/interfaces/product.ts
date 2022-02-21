export interface Pricing {
	key: number;
	title: string;
	description: string;
	price: number;
	size?: string;
	units: string;
	coverage: string;
	coverage_value: number;
}

export interface Product {
	categoryId?: number;
	id: number;
	sku: string;
	title: string;
	description: string;
	image: string;
	pricing: Pricing[];
}
