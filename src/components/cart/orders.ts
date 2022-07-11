export type Orders = {
	categoryId: number | undefined;
	id: number | undefined;
	sku: string | undefined;
	title: string | undefined;
	image: string | undefined;
	price: number;
	qty: number;
	unit: string | undefined;
	color?: string | undefined;
};
