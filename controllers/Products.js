/* eslint-disable consistent-return */
import { Op } from 'sequelize';
import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import { requestResponse } from '../message.js';

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === 'user') {
      response = await Product.findAll({
        attributes: ['uuid', 'productName', 'description', 'category', 'image_url', 'web_url'],
        where: {
          userId: req.userId,
        },
        include: [{
          model: User,
          attributes: ['name'],
        }],
      });
    } else {
      response = await Product.findAll({
        attributes: ['uuid', 'productName', 'description', 'category', 'image_url', 'web_url'],
        include: [{
          model: User,
          attributes: ['name'],
        }],
      });
    }
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: ['uuid', 'productName', 'description', 'category', 'image_url', 'web_url'],
      include: [{
        model: User,
        attributes: ['name'],
      }],
    });
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json(requestResponse.failed('Product Not Found'));

    let response;
    if (req.role === 'user') {
      response = await Product.findOne({
        attributes: ['uuid', 'productName', 'description', 'category', 'image_url', 'web_url'],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [{
          model: User,
          attributes: ['name'],
        }],
      });
    } else {
      response = await Product.findOne({
        attributes: ['uuid', 'productName', 'description', 'category', 'image_url', 'web_url'],
        where: {
          id: product.id,
        },
        include: [{
          model: User,
          attributes: ['name'],
        }],
      });
    }
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const getAllProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json(requestResponse.failed('Product Not Found'));

    const response = await Product.findOne({
      attributes: ['uuid', 'productName', 'description', 'category', 'image_url', 'web_url'],
      where: {
        id: product.id,
      },
      include: [{
        model: User,
        attributes: ['name'],
      }],
    });
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const createProduct = async (req, res) => {
  const {
    productName, description, category, image_url, web_url
  } = req.body;

  try {
    await Product.create({
      productName,
      description,
      category,
      image_url,
      web_url,
      userId: req.userId,
    });

    res.status(201).json(requestResponse.success('Product has been added'));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};



export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json(requestResponse.failed('Produk Not Found'));
    const {
      productName,
      category,
      description,
    } = req.body;

    if (req.role === 'admin') {
      await Product.update({
        productName,
        description,
        category,
        image_url,
        web_url,
      }, {
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId) return res.status(403).json(requestResponse.failed('Access Denied'));

      await Product.update({
        productName,
        description,
        category,
        image_url,
        web_url,
      }, {
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json(requestResponse.success('Product has been updated'));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json(requestResponse.failed('Product Not Found'));

    if (req.role === 'admin') {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId) return res.status(403).json(requestResponse.failed('Access Denied'));

      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json(requestResponse.success('Product has been deleted'));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};
