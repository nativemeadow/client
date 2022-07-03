export interface JSON {
	width: string;
	height: string;
}
export interface Pricing {
	key: number;
	sku: string;
	title: string;
	description: string;
	image: string;
	price: number;
	size?: string;
	units: string;
	coverage: string;
	coverage_value: number;
	online_minimum: number;
}

export interface Product {
	categoryId?: number;
	id: number;
	sku: string;
	title: string;
	description: string;
	image: string;
	imageLensSize: string;
	pricing: Pricing[];
}
