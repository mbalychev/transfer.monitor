import axios from 'axios';
import { ILastUpdate } from '../models/anchorage/lastUpdate';
import { IAnchorageResponse } from '../models/anchorage/AnchorageResponse';

const backendPartOne = 'http://'
const backendPartTwo = ':4097/api/Anchorage'

export const getErrors = async (serverIp: string, pagetErorr: number, onPageErrors: number):Promise<IAnchorageResponse> => {
    const resp = await axios.get<IAnchorageResponse>(`${backendPartOne}${serverIp}${backendPartTwo}/Errors?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`);
    return resp.data as IAnchorageResponse;
}
export const getSuccess = async  (serverIp: string, pagetErorr: number, onPageErrors: number):Promise<IAnchorageResponse> => {
    const resp = await axios.get<IAnchorageResponse>(`${backendPartOne}${serverIp}${backendPartTwo}/success?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`);
    return resp.data as IAnchorageResponse;
}
export const getLastUpdate = async  (serverIp: string):Promise<ILastUpdate> => {
    const resp = await axios.get<ILastUpdate>(`${backendPartOne}${serverIp}${backendPartTwo}/Last`);
    return resp.data as ILastUpdate;
}
export const getCommonError = async  (serverIp: string, pagetErorr: number, onPageErrors: number):Promise<IAnchorageResponse> => {
    const resp = await axios.get<IAnchorageResponse>(`${backendPartOne}${serverIp}${backendPartTwo}/CommonError?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`);
    return resp.data as IAnchorageResponse;
}