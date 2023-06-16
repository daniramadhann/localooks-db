import express from 'express';
import {
  getProducts,
  getAllProducts,
  getProductById,
  getAllProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/Products.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getAllProductById);
router.post('/products', verifyUser, createProduct);
router.put('/products/:id', verifyUser, updateProduct);
router.delete('/products/:id', verifyUser, deleteProduct);

export default router;
