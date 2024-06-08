export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    image_url: string;
    category_id: number;
  };
  
  export type Category = {
    id: number;
    name: string;
    description: string;
    image_url: string;
  };