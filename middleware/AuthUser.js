/* eslint-disable consistent-return */
import User from '../models/UserModel.js';
import { requestResponse } from '../message.js';

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json(requestResponse.failed('Please log in before proceeding'));
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json(requestResponse.failed('User Not Found'));
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json(requestResponse.failed('User Not Found'));
  if (user.role !== 'admin') return res.status(403).json(requestResponse.failed('Access Denied'));
  next();
};
