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

  getBySubcategory: async (req, res) => {
    try {
      const subcategoryId = req.params.subcategoryId;
      const products = await Product.findAll({
        where: { SubCategoryId: subcategoryId },
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
  
  getByCategoryId: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      
      // Find all subcategories of this category
      const subcategories = await models.SubCategory.findAll({
        where: { CategoryId: categoryId }
      });
      
      const subcategoryIds = subcategories.map(subcat => subcat.id);
      
      // Find all products in these subcategories
      const products = await Product.findAll({
        where: { SubCategoryId: subcategoryIds },
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

  getByGender: async (req, res) => {
    try {
      const gender = req.params.gender;
      
      if (!['mens', 'womens', 'kids'].includes(gender)) {
        return res.status(400).json({ error: "Invalid gender. Must be 'mens', 'womens', or 'kids'." });
      }
      
      // First find all categories of this gender
      const categories = await models.Category.findAll({
        where: { gender }
      });
      
      const categoryIds = categories.map(cat => cat.id);
      
      // Then find all subcategories of these categories
      const subcategories = await models.SubCategory.findAll({
        where: { CategoryId: categoryIds }
      });
      
      const subcategoryIds = subcategories.map(subcat => subcat.id);
      
      // Finally find all products in these subcategories
      const products = await Product.findAll({
        where: { SubCategoryId: subcategoryIds },
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
};
