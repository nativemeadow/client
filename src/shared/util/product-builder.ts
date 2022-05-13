import { Product } from '../../shared/interfaces/product';

function ProductBuilder(prod: Product) {
	const currentProduct: Product = {
		categoryId: prod.categoryId,
		id: prod.id,
		sku: prod.sku,
		title: prod.title,
		description: prod.description,
		image: prod.image,
		pricing: prod.pricing,
	};
	return currentProduct;
}

export function ProductArrayBuilder(prodData: Product[]) {
	const currentProducts: Product[] = [];
	prodData.forEach((prod: Product) => {
		currentProducts.push(ProductBuilder(prod));
	});
	return currentProducts;
}

export default ProductBuilder;
