const Category = require('../models/Category');


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createCategory = async (req, res) => {
  try {
    const { name, gender, description } = req.body;
    if (!name || !gender) {
      return res.status(400).json({ message: 'Name and gender are required' });
    }
    if (!['mens', 'womens'].includes(gender)) {
      return res.status(400).json({ message: 'Gender must be either "mens" or "womens"' });
    }

    const category = await Category.create({
      name,
      gender,
      description
    });

    res.status(201).json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, gender, description } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    
    if (gender && !['mens', 'womens'].includes(gender)) {
      return res.status(400).json({ message: 'Gender must be either "mens" or "womens"' });
    }

    await category.update({
      name: name || category.name,
      gender: gender || category.gender,
      description: description || category.description
    });

    res.status(200).json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}; 