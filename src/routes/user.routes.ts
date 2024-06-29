import { Router } from 'express';
import {  createUser, deleteUser, getRankAddress, getRankAll, getRankUser, getUser, getUsers, updateUser } from '../controller/user.controller';

const userRoutes = Router();

userRoutes.route('/')
  .get(getUsers)
  .post(createUser);

userRoutes.route('/:UserId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

userRoutes.route('/rank/:UserId').get(getRankUser);
userRoutes.route('/rank-address/:Address').get(getRankAddress);
userRoutes.route('/rank-all').get(getRankAll);


export default userRoutes;
