export
const products = {
  "1": {
    name: "The Ademola",
    category: "Men's Mule",
    price: "₦55,000",
    description:
      "A refined mule designed to bring effortless elegance and comfort to every look.",
    colors: [
      {
        name: "Wine",
        image: "/products/men/ademola.jpg",
      },
      {
        name: "White",
        image: "/products/men/ademola2.jpg",
      },
      {
        name: "Blue",
        image: "/products/men/ademola3.jpg",
      },
      {
        name: "Grey",
        image: "/products/men/ademola4.jpg",
      },
      {
        name: "Black",
        image: "/products/men/ademola5.jpg",
      },
      {
        name: "Nude",
        image: "/products/men/ademola6.jpg",
      },
      {
        name: "Green",
        image: "/products/men/ademola7.jpg",
      },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },

  "2": {
    name: "The Adunni",
    category: "Women's Leather Slippers",
    price: "₦35,000",
    description:
      "An elegant statement piece designed for evenings, celebrations and unforgettable occasions.",
    colors: [
      {
        name: "Wine",
        image: "/products/women/adunni.jpg",
      },
      
    ],
    sizes: ["36", "37", "38", "39", "40", "41" ],
  },

  "3": {
    name: "The Abefe",
    category: "Men's Half Shoe",
    price: "₦45,000",
    description:
      "Classic men's footwear with a polished silhouette made for effortless everyday style.",
    colors: [
      {
        name: "Black",
        image: "/products/men/abefe.jpg",
      },
      
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },

  "4": {
    name: "The Ajibola",
    category: "Executive Men's Shoe",
    price: "₦70,000",
    description:
      "Executive men's shoe with a polished silhouette made for effortless everyday style.",
    colors: [
      {
        name: "Black & White",
        image: "/products/men/ajibola.jpg",
      },
      
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
};

export type Product = (typeof products)[keyof typeof products];