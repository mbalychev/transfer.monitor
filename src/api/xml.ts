import axios from 'axios';
import { IErorResultsResponse } from '../models/xml/errorsResults';

const protocol = 'https://'
const resource = ':7066/api/Xml'
const host = 'localhost';

export const getXmlErrors = async  (): Promise<IErorResultsResponse> => {
    const result = await axios.get<IErorResultsResponse>(`${protocol}${host}${resource}/Errors`);
    return result.data as IErorResultsResponse;
}