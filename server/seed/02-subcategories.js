module.exports = {
  seed: async (models) => {
    const { SubCategory, Category } = models;
    
    // Check if subcategories already exist
    const existingSubCategories = await SubCategory.findAll();
    if (existingSubCategories.length > 0) {
      console.log('SubCategories already exist, skipping seed');
      return;
    }
    
    // Get category IDs
    const tshirts = await Category.findOne({ where: { name: 'T-Shirts' } });
    const jeans = await Category.findOne({ where: { name: 'Jeans' } });
    const jackets = await Category.findOne({ where: { name: 'Jackets' } });
    const dresses = await Category.findOne({ where: { name: 'Dresses' } });
    const skirts = await Category.findOne({ where: { name: 'Skirts' } });
    const blouses = await Category.findOne({ where: { name: 'Blouses' } });
    const onesies = await Category.findOne({ where: { name: 'Onesies' } });
    const schoolWear = await Category.findOne({ where: { name: 'School Wear' } });
    
    const subcategories = [
      // Men's T-Shirts subcategories
      {
        name: 'Casual T-Shirts',
        description: 'Everyday casual t-shirts for men',
        image: '/images/subcategories/casual-tshirts.jpg',
        CategoryId: tshirts.id
      },
      {
        name: 'Graphic T-Shirts',
        description: 'T-shirts with unique graphic designs',
        image: '/images/subcategories/graphic-tshirts.jpg',
        CategoryId: tshirts.id
      },
      
      // Men's Jeans subcategories
      {
        name: 'Slim Fit Jeans',
        description: 'Slim fit jeans for a modern look',
        image: '/images/subcategories/slim-jeans.jpg',
        CategoryId: jeans.id
      },
      {
        name: 'Regular Fit Jeans',
        description: 'Classic regular fit jeans',
        image: '/images/subcategories/regular-jeans.jpg',
        CategoryId: jeans.id
      },
      
      // Men's Jackets subcategories
      {
        name: 'Leather Jackets',
        description: 'Stylish leather jackets for men',
        image: '/images/subcategories/leather-jackets.jpg',
        CategoryId: jackets.id
      },
      {
        name: 'Denim Jackets',
        description: 'Classic denim jackets for all seasons',
        image: '/images/subcategories/denim-jackets.jpg',
        CategoryId: jackets.id
      },
      
      // Women's Dresses subcategories
      {
        name: 'Casual Dresses',
        description: 'Everyday casual dresses',
        image: '/images/subcategories/casual-dresses.jpg',
        CategoryId: dresses.id
      },
      {
        name: 'Formal Dresses',
        description: 'Elegant formal dresses for special occasions',
        image: '/images/subcategories/formal-dresses.jpg',
        CategoryId: dresses.id
      },
      
      // Women's Skirts subcategories
      {
        name: 'Mini Skirts',
        description: 'Stylish mini skirts for women',
        image: '/images/subcategories/mini-skirts.jpg',
        CategoryId: skirts.id
      },
      {
        name: 'Maxi Skirts',
        description: 'Elegant and comfortable maxi skirts',
        image: '/images/subcategories/maxi-skirts.jpg',
        CategoryId: skirts.id
      },
      
      // Women's Blouses subcategories
      {
        name: 'Silk Blouses',
        description: 'Luxurious silk blouses for women',
        image: '/images/subcategories/silk-blouses.jpg',
        CategoryId: blouses.id
      },
      {
        name: 'Cotton Tops',
        description: 'Comfortable cotton tops for everyday wear',
        image: '/images/subcategories/cotton-tops.jpg',
        CategoryId: blouses.id
      },
      
      // Kids' Onesies subcategories
      {
        name: 'Baby Onesies',
        description: 'Comfortable onesies for infants',
        image: '/images/subcategories/baby-onesies.jpg',
        CategoryId: onesies.id
      },
      {
        name: 'Toddler Onesies',
        description: 'Cute and colorful onesies for toddlers',
        image: '/images/subcategories/toddler-onesies.jpg',
        CategoryId: onesies.id
      },
      
      // Kids' School Wear subcategories
      {
        name: 'Uniforms',
        description: 'School uniforms for children',
        image: '/images/subcategories/school-uniforms.jpg',
        CategoryId: schoolWear.id
      },
      {
        name: 'Casual School Clothes',
        description: 'Casual clothes for school-going children',
        image: '/images/subcategories/casual-school.jpg',
        CategoryId: schoolWear.id
      }
    ];
    
    await SubCategory.bulkCreate(subcategories);
    console.log('Subcategories seeded successfully');
  }
}; 