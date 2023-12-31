export type Cart = Required<Product> & {
  qt: number;
};

export type Store = {
  allCategory: string[];
  products: Product[];
  isLoading: boolean;
  cart: Cart[];
};

export type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type SearchedField = {
  category: string;
  productName: string;
};
