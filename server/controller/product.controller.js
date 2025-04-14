const { models: { Product } } = require("../models/index.js");
const { models } = require("../models/index.js");


module.exports = {
 
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [{
          model: models.SubCategory,
          include: [{
            model: models.Category
          }]
        }]
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getByCategory: async (req, res) => {
    try {
      const { categorySlug } = req.params;
      const category = await Category.findOne({ where: { slug: categorySlug } });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const products = await Product.findAll({
        where: { CategoryId: category.id },
      });
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  getById: async (req, res) => {
    try {
      console.log('Getting product with ID:', req.params.id);
      const product = await Product.findByPk(req.params.id, {
        include: [{
          model: models.SubCategory,
          include: [{
            model: models.Category
          }]
        }]
      });
      
      if (!product) {
        console.log('Product not found');
        return res.status(404).json({ error: "Product not found" });
      }
      
      console.log('Found product:', product);
      res.json(product);
    } catch (error) {
      console.error('Error in getById:', error);
      res.status(500).json({ error: error.message });
    }
  },


  create: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      await product.update(req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  remove: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      await product.destroy();
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
