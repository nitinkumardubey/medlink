const Category = require('../models/category');

// @desc    Get all active categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: 'active' });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// @desc    Create new category (admin only)
const createCategory = async (req, res) => {
  const { specialization, status } = req.body;

  try {
    const newCategory = new Category({ specialization, status });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category', error: err.message });
  }
};

// @desc    Update category (admin only)
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update category', error: err.message });
  }
};

// @desc    Delete category (admin only)
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
