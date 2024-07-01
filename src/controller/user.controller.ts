import { Address } from './../interface/address';

import { Request, Response } from 'express';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../config/mysql.config';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { User } from '../interface/user';
import { QUERY } from '../query/user.query';
import { Faker, en } from '@faker-js/faker';
import { log } from 'console';
import {createAddress, getAddress } from './address.controller';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getUsers = async (req: Request, res: Response): Promise<Response<User[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USERS);
    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Connect success', result[0]));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USER, [req.params.UserId]);
    if (((result[0]) as Array<any>).length > 0) {
      return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'User retrieved', result[0]));
    } else {
      return res.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
    }
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  let User: User = { ...req.body };
  try {
    const pool = await connection();
    const address = User.address;
    if(address)
      {
        const addressResult = await getAddress(address);
        if(addressResult[0].count == 0)
        {
          const createAddress1 = await createAddress({ country: address });
          await insertRandomUsers(address);
        }
      }
    const result: ResultSet = await pool.query(QUERY.CREATE_USER, Object.values(User));
    User = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
    return res.status(Code.CREATED)
      .send(new HttpResponse(Code.CREATED, Status.CREATED, 'User created', User.id));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  let User: User = { ...req.body };
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USER, [req.params.UserId]);
    console.log(req.params.UserId)
    if (((result[0]) as Array<any>).length > 0) {
      const result: ResultSet = await pool.query(QUERY.UPDATE_USER, [...Object.values(User), req.params.UserId]);
      return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'User updated', { ...User, id: req.params.UserId }));
    } else {
      return res.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
    }
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USER, [req.params.UserId]);
    if (((result[0]) as Array<any>).length > 0) {
      const result: ResultSet = await pool.query(QUERY.DELETE_USER, [req.params.UserId]);
      return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'User deleted'));
    } else {
      return res.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
    }
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};
export const insertRandomUsers = async (address: string): Promise<any> => {
  
  try {
    const pool = await connection();
    const users = [];
    const customFaker = new Faker({ locale: [en] });
    for (let i = 0; i < 20; i++) {
      users.push([
        address,
        1,
        customFaker.number.int({ min: 70, max: 100 }),
        1
      ]);
    }

    const userValues = users.reduce((acc, val) => acc.concat(val), []);

    const result: ResultSet = await pool.query(QUERY.INSERT_USERS, userValues) as ResultSet;
    return result[0];

  } catch (error: unknown) {
    console.error(error);
  }
};
export const getRankUser = async (req: Request, res: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.GET_RANK_USER, [req.params.UserId]);
    if (((result[0]) as Array<any>).length > 0) {
      return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'User retrieved', result[0]));
    } else {
      return res.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
    }
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};
export const getRankAddress = async (req: Request, res: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.GET_RANK_ADDRESS, [req.params.Address]);
    if (((result[0]) as Array<any>).length > 0) {
      return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'User retrieved', result[0]));
    } else {
      return res.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'not found'));
    }
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};
export const getRankAll = async (req: Request, res: Response): Promise<Response<User[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.GET_RANK_ALL);
    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Connect success', result[0]));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};
