import { Router } from 'express';
import { createAddress, getUserContinent } from '../controller/address.controller';
const ipRoutes =  Router();
ipRoutes.route('/')
.get(getUserContinent)
.post(createAddress)
export default ipRoutes;