const express = require('express');
const router = express.Router();
const {
  getAllSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByCategory
} = require('../controller/subcategory.controller');

router.get('/', getAllSubCategories);

router.get('/category/:categoryId', getSubCategoriesByCategory);

router.get('/:id', getSubCategoryById);
router.post('/add', createSubCategory);
router.put('/:id', updateSubCategory);
router.delete('/:id', deleteSubCategory);

module.exports = router; 