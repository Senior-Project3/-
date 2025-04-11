module.exports = {
  seed: async (models) => {
    const { Product, SubCategory } = models;
    
    // Check if products already exist
    const existingProducts = await Product.findAll();
    if (existingProducts.length > 0) {
      console.log('Products already exist, skipping seed');
      return;
    }
    
    // Get subcategory IDs
    const casualTshirts = await SubCategory.findOne({ where: { name: 'Casual T-Shirts' } });
    const graphicTshirts = await SubCategory.findOne({ where: { name: 'Graphic T-Shirts' } });
    const slimJeans = await SubCategory.findOne({ where: { name: 'Slim Fit Jeans' } });
    const regularJeans = await SubCategory.findOne({ where: { name: 'Regular Fit Jeans' } });
    const leatherJackets = await SubCategory.findOne({ where: { name: 'Leather Jackets' } });
    const denimJackets = await SubCategory.findOne({ where: { name: 'Denim Jackets' } });
    const casualDresses = await SubCategory.findOne({ where: { name: 'Casual Dresses' } });
    
    const products = [
      // Casual T-Shirts
      {
        name: 'Basic White T-Shirt',
        description: 'Classic white t-shirt made of 100% cotton',
        price: 19.99,
        image: '/images/products/white-tshirt.jpg',
        size: 'M',
        color: 'White',
        stock: 50,
        sales: 120,
        SubCategoryId: casualTshirts.id
      },
      {
        name: 'Black V-Neck T-Shirt',
        description: 'Stylish black v-neck t-shirt for casual wear',
        price: 24.99,
        image: '/images/products/black-vneck.jpg',
        size: 'L',
        color: 'Black',
        stock: 35,
        sales: 85,
        SubCategoryId: casualTshirts.id
      },
      
      // Graphic T-Shirts
      {
        name: 'Vintage Rock Band T-Shirt',
        description: 'Retro rock band graphic t-shirt',
        price: 29.99,
        image: '/images/products/rock-tshirt.jpg',
        size: 'M',
        color: 'Gray',
        stock: 25,
        sales: 65,
        SubCategoryId: graphicTshirts.id
      },
      {
        name: 'Nature Graphic T-Shirt',
        description: 'T-shirt with beautiful nature print',
        price: 27.99,
        image: '/images/products/nature-tshirt.jpg',
        size: 'S',
        color: 'Green',
        stock: 40,
        sales: 55,
        SubCategoryId: graphicTshirts.id
      },
      
      // Slim Fit Jeans
      {
        name: 'Blue Slim Fit Jeans',
        description: 'Classic blue slim fit jeans',
        price: 59.99,
        image: '/images/products/slim-blue-jeans.jpg',
        size: '32',
        color: 'Blue',
        stock: 30,
        sales: 95,
        SubCategoryId: slimJeans.id
      },
      {
        name: 'Black Slim Fit Jeans',
        description: 'Stylish black slim fit jeans',
        price: 64.99,
        image: '/images/products/slim-black-jeans.jpg',
        size: '34',
        color: 'Black',
        stock: 25,
        sales: 75,
        SubCategoryId: slimJeans.id
      },
      
      // Regular Fit Jeans
      {
        name: 'Classic Regular Fit Jeans',
        description: 'Comfortable regular fit jeans',
        price: 54.99,
        image: '/images/products/regular-jeans.jpg',
        size: '36',
        color: 'Blue',
        stock: 45,
        sales: 110,
        SubCategoryId: regularJeans.id
      },
      {
        name: 'Stonewashed Regular Jeans',
        description: 'Stonewashed regular fit jeans',
        price: 59.99,
        image: '/images/products/stonewashed-jeans.jpg',
        size: '34',
        color: 'Light Blue',
        stock: 35,
        sales: 90,
        SubCategoryId: regularJeans.id
      },
      
      // Leather Jackets
      {
        name: 'Classic Leather Jacket',
        description: 'Timeless black leather jacket',
        price: 199.99,
        image: '/images/products/leather-jacket.jpg',
        size: 'L',
        color: 'Black',
        stock: 15,
        sales: 45,
        SubCategoryId: leatherJackets.id
      },
      {
        name: 'Brown Vintage Leather Jacket',
        description: 'Distressed brown leather jacket with vintage look',
        price: 249.99,
        image: '/images/products/brown-leather-jacket.jpg',
        size: 'M',
        color: 'Brown',
        stock: 10,
        sales: 30,
        SubCategoryId: leatherJackets.id
      },
      
      // Denim Jackets
      {
        name: 'Classic Denim Jacket',
        description: 'Timeless blue denim jacket',
        price: 79.99,
        image: '/images/products/denim-jacket.jpg',
        size: 'M',
        color: 'Blue',
        stock: 25,
        sales: 70,
        SubCategoryId: denimJackets.id
      },
      {
        name: 'Black Denim Jacket',
        description: 'Stylish black denim jacket',
        price: 84.99,
        image: '/images/products/black-denim-jacket.jpg',
        size: 'L',
        color: 'Black',
        stock: 20,
        sales: 55,
        SubCategoryId: denimJackets.id
      },
      
      // Casual Dresses
      {
        name: 'Floral Summer Dress',
        description: 'Light floral summer dress',
        price: 49.99,
        image: '/images/products/floral-dress.jpg',
        size: 'M',
        color: 'Multicolor',
        stock: 30,
        sales: 85,
        SubCategoryId: casualDresses.id
      },
      {
        name: 'Casual Maxi Dress',
        description: 'Comfortable maxi dress for everyday wear',
        price: 59.99,
        image: '/images/products/maxi-dress.jpg',
        size: 'S',
        color: 'Navy',
        stock: 25,
        sales: 70,
        SubCategoryId: casualDresses.id
      }
    ];
    
    await Product.bulkCreate(products);
    console.log('Products seeded successfully');
  }
}; 