/* eslint-disable consistent-return */
import argon2 from 'argon2';
import User from '../models/UserModel.js';
import { requestResponse } from '../message.js';

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['uuid', 'name', 'email', 'role'],
    });
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'name', 'email', 'role'],
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) return res.status(404).json(requestResponse.failed('User Not Found'));
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const createUser = async (req, res) => {
  const {
    name, email, password, confPassword, role,
  } = req.body;
  if (password !== confPassword) return res.status(400).json(requestResponse.failed('Password did not match'));
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    res.status(201).json(requestResponse.success('Registration Success!'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json(requestResponse.failed('User Not Found'));

  const {
    name,
    email,
    password,
    confPassword,
    role,
  } = req.body;

  let hashPassword;

  if (password === '' || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confPassword) return res.status(400).json(requestResponse.failed('Password did not match'));

  try {
    await User.update({
      name,
      email,
      password: hashPassword,
      role,
    }, {
      where: {
        id: user.id,
      },
    });
    res.status(200).json(requestResponse.success('User has been updated'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json(requestResponse.failed('User Not Found'));

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json(requestResponse.success('User Deleted Successfully'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
};
