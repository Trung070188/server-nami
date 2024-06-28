import { Request, Response } from 'express';
import axios from 'axios';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { Address } from '../interface/address';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/address.query';
type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];
const apiKey = '507aa117e27831'; 
const ipinfoUrl = `https://ipinfo.io?token=${apiKey}`;

const continentMap: { [key: string]: string } = {
    "AF": "Africa",
    "AN": "Antarctica",
    "AS": "Asia",
    "EU": "Europe",
    "NA": "North America",
    "OC": "Oceania",
    "SA": "South America"
};

const countryToContinentMap: { [key: string]: string } = {
    "US": "NA", "CA": "NA", "MX": "NA", // Bắc Mỹ
    "BR": "SA", "AR": "SA", "CO": "SA", // Nam Mỹ
    "CN": "AS", "JP": "AS", "IN": "AS", "VN": "AS", // Châu Á
    "DE": "EU", "FR": "EU", "GB": "EU", // Châu Âu
    "AU": "OC", "NZ": "OC", // Châu Đại Dương
    "ZA": "AF", "EG": "AF", "NG": "AF" // Châu Phi
    // Thêm các mã quốc gia khác vào đây
};

export const getUserContinent = async (req: Request, res: Response): Promise<Response> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const response = await axios.get(ipinfoUrl);
        const country = response.data.country; 
        const continentCode = countryToContinentMap[country];
        const continent = continentMap[continentCode];

        const result = [{country: country}];

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User continent retrieved', result));
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};
export const createAddress = async (req: Request, res: Response): Promise<Response> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let patient: Address = { ...req.body };
    try {
      const pool = await connection();
      const result: ResultSet = await pool.query(QUERY.CREATE_ADDRESS, Object.values(patient));
      patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
      return res.status(Code.CREATED)
        .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Address created success', patient));
    } catch (error: unknown) {
      console.error(error);
      return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};