module.exports = {
  seed: async (models) => {
    const { Category } = models;
    
    // Check if categories already exist
    const existingCategories = await Category.findAll();
    if (existingCategories.length > 0) {
      console.log('Categories already exist, skipping seed');
      return;
    }
    
    const categories = [
      {
        name: 'T-Shirts',
        gender: 'mens',
        description: 'Men\'s T-shirts including short-sleeve, long-sleeve, and graphic designs',
        image: '/images/categories/mens-tshirts.jpg'
      },
      {
        name: 'Jeans',
        gender: 'mens',
        description: 'Men\'s jeans in various fits, colors and styles',
        image: '/images/categories/mens-jeans.jpg'
      },
      {
        name: 'Jackets',
        gender: 'mens',
        description: 'Men\'s jackets for all seasons and occasions',
        image: '/images/categories/mens-jackets.jpg'
      },
      {
        name: 'Dresses',
        gender: 'womens',
        description: 'Women\'s dresses for casual, formal, and special occasions',
        image: '/images/categories/womens-dresses.jpg'
      },
      {
        name: 'Skirts',
        gender: 'womens',
        description: 'Women\'s skirts in various lengths and styles',
        image: '/images/categories/womens-skirts.jpg'
      },
      {
        name: 'Blouses',
        gender: 'womens',
        description: 'Women\'s blouses and tops for any occasion',
        image: '/images/categories/womens-blouses.jpg'
      },
      {
        name: 'Onesies',
        gender: 'kids',
        description: 'Comfortable and cute onesies for babies',
        image: '/images/categories/kids-onesies.jpg'
      },
      {
        name: 'School Wear',
        gender: 'kids',
        description: 'Uniforms and everyday clothes for school-going children',
        image: '/images/categories/kids-schoolwear.jpg'
      }
    ];
    
    await Category.bulkCreate(categories);
    console.log('Categories seeded successfully');
  }
}; 