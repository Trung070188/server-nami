import { Request, Response } from 'express';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../config/mysql.config';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { Patient } from '../interface/patient';
import { QUERY } from '../query/patient.query';
import { Faker, en } from '@faker-js/faker';
import { log } from 'console';
import {createAddress, getAddress } from './address.controller';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENTS);
    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Connect success', result[0]));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};

export const getPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
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

export const createPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  let patient: Patient = { ...req.body };
  try {
    const pool = await connection();
    const address = patient.address;
    if(address)
      {
        const addressResult = await getAddress(address);
        if(addressResult[0].count == 0)
        {
          const createAddress1 = await createAddress({ country: address });
          await insertRandomPatients(address);
        }
      }
    const result: ResultSet = await pool.query(QUERY.CREATE_PATIENT, Object.values(patient));
    patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
    return res.status(Code.CREATED)
      .send(new HttpResponse(Code.CREATED, Status.CREATED, 'User created', patient));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};

export const updatePatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  let patient: Patient = { ...req.body };
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
    if (((result[0]) as Array<any>).length > 0) {
      const result: ResultSet = await pool.query(QUERY.UPDATE_PATIENT, [...Object.values(patient), req.params.patientId]);
      return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'User updated', { ...patient, id: req.params.patientId }));
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

export const deletePatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
    if (((result[0]) as Array<any>).length > 0) {
      const result: ResultSet = await pool.query(QUERY.DELETE_PATIENT, [req.params.patientId]);
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
export const insertRandomPatients = async (address: string): Promise<any> => {
  
  try {
    const pool = await connection();
    // Generate random user data
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

    // Flatten the array of user data using reduce
    const userValues = users.reduce((acc, val) => acc.concat(val), []);

    // Execute the query to insert 20 users
    const result: ResultSet = await pool.query(QUERY.INSERT_PATIENTS, userValues) as ResultSet;
    return result[0];

  } catch (error: unknown) {
    console.error(error);
  }
};
