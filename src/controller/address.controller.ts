import { Address } from './../interface/address';
import { Request, Response } from 'express';
import axios from 'axios';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/address.query';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

const apiKey = '507aa117e27831'; 
const ipinfoUrl = `https://ipinfo.io?token=${apiKey}`;

export const getUserContinent = async (req: Request, res: Response): Promise<Response> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const response = await axios.get(ipinfoUrl);
        const country = response.data.country; 
        const result = [{country: country}];

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User continent retrieved', result));
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};
export const createAddress = async (address: Address): Promise<Address> => {
    try {
      const pool = await connection();
      const result = await pool.query(QUERY.CREATE_ADDRESS, [address.country]) as [ResultSetHeader, FieldPacket[]];
      return { id: result[0].insertId, ...address };
    } catch (error: unknown) {
      console.error(error);
      throw new Error('An error occurred while creating address');
    }
  };
export const getAddress = async (country: string): Promise<any> => {
    try {
      const pool = await connection();
      const rows: ResultSet = await pool.query(QUERY.GET_COUNT_ADDRESS, [country]) as ResultSet;
      return rows[0]; 
    } catch (error: unknown) {
      console.error(error);
      throw new Error('An error occurred while fetching address');
    }
  };