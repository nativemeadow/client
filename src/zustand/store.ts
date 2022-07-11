import create from 'zustand';
import { rule } from '../shared/interfaces/product';
import { Orders } from '../components/cart/orders';

type Store = {
	// productQty: number;
	// setProductQty: (qty: number) => void;
	// productSize: string;
	// setProductSize: (size: string) => void;
	// selectedValue: string;
	// setSelectedValue: (value: string) => void;
	extendedValue: string;
	setExtendedValue: (value: string) => void;
	extendedRules: Array<rule>;
	setExtendedRules: (rules: Array<rule>) => void;
	removeExtendedValue: () => void;
	removeExtendedRule: () => void;
	orders: Array<Orders>;
	addOrder: (order: Orders) => void;
	removeOrder: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
};

const useStore = create<Store>((set) => ({
	// productQty: 0,
	// setProductQty: (qty: number) => set((state) => ({ productQty: qty })),
	// productSize: '',
	// setProductSize: (size: string) => set((state) => ({ productSize: size })),
	// selectedValue: '',
	// setSelectedValue: (value: string) =>
	// 	set((state) => ({ selectedValue: value })),
	extendedValue: '', // extended value is the value of the extended field
	setExtendedValue: (value: string) =>
		set((state) => ({ extendedValue: value })),
	extendedRules: [],
	setExtendedRules: (rules: Array<rule>) =>
		set((state) => ({ extendedRules: rules })),
	removeExtendedValue: () => set((state) => ({ extendedValue: '' })),
	removeExtendedRule: () => set((state) => ({ extendedRules: [] })),
	orders: [],
	addOrder: (order: Orders) =>
		set((state) => ({ orders: [...state.orders, order] })),
	removeOrder: (id: number) =>
		set((state) => ({
			orders: state.orders.filter((order) => order.id !== id),
		})),
	updateQuantity: (id: number, quantity: number) =>
		set((state) => {
			const orders = state.orders.map((order) => {
				if (order.id === id) {
					order.qty = quantity;
				}
				return order;
			});
			return { orders };
		}),
}));

export default useStore;
