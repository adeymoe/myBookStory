import upload_area from './upload_area.png'


const currency = '\u20A6';
const N = currency;

export const assets = {
  upload_area
}

export const products = [
    {
      name: "Product 1",
      id: 1,
      price: `${N}10009.99`,
      description: "4 months old and in perfect condition",
      img: ["https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80", "https://images.unsplash.com/photo-1508423134147-addf71308178?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"]
    },
    {
      name: "Product 2",
      id: 2,
      price: `${N}2000.99`,
      description: "Oil spot on page 53",
      img: ["https://images.unsplash.com/photo-1508423134147-addf71308178?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80", "https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80", "https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"],
    },
  ];

export  const orders = [
    {
      orderType: "Sell",
      orderNumber: "4567",
      bookName: "Broken",
      price: "₦500",
      status: "Package Being Delivered",
      dateOrdered: "20/01/2025",
    },

    {
      orderType: "Sell",
      orderNumber: "4489",
      bookName: "Now you see me",
      price: "₦200",
      status: "Pending buy request",
      dateOrdered: "20/01/2025",
    }
  ];