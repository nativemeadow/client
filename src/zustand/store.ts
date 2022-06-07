import create from 'zustand';

type Store = {
	productQty: number;
	setProductQty: (qty: number) => void;
	productSize: string;
	setProductSize: (size: string) => void;
	selectedValue: string;
	setSelectedValue: (value: string) => void;
};

const useStore = create<Store>(
	(set): Store => ({
		productQty: 0,
		setProductQty: (qty: number) => set((state) => ({ productQty: qty })),
		productSize: '',
		setProductSize: (size: string) =>
			set((state) => ({ productSize: size })),
		selectedValue: '',
		setSelectedValue: (value: string) =>
			set((state) => ({ selectedValue: value })),
	})
);

export default useStore;
