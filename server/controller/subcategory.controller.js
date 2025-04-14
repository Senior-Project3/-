const { models } = require('../models');
const { SubCategory, Category } = models;

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({
      include: [{
        model: Category,
        attributes: ['name', 'gender']
      }]
    });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id, {
      include: [{
        model: Category,
        attributes: ['name', 'gender']
      }]
    });
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    
    if (!name || !categoryId) {
      return res.status(400).json({ message: 'Name and categoryId are required' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = await SubCategory.create({
      name,
      description,
      CategoryId: categoryId
    });

    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const subCategory = await SubCategory.findByPk(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    await subCategory.update({
      name: name || subCategory.name,
      description: description || subCategory.description,
      CategoryId: categoryId || subCategory.CategoryId
    });

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    await subCategory.destroy();
    res.status(200).json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({
      where: { CategoryId: req.params.categoryId },
      include: [{
        model: Category,
        attributes: ['name', 'gender']
      }]
    });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByCategory
}; 