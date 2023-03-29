import axios from 'axios';
import { ILastUpdate } from '../models/anchorage/lastUpdate';
import { IAnchorageResponse } from '../models/anchorage/AnchorageResponse';

const backend = 'http://192.168.1.90:4097/api/Anchorage';

export const getErrors = async (pagetErorr: number, onPageErrors: number):Promise<IAnchorageResponse> => {
    const resp = await axios.get<IAnchorageResponse>(`${backend}/Errors?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`);
    return resp.data as IAnchorageResponse;
}
export const getSuccess = async  (pagetErorr: number, onPageErrors: number):Promise<IAnchorageResponse> => {
    const resp = await axios.get<IAnchorageResponse>(`${backend}/success?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`);
    return resp.data as IAnchorageResponse;
}
export const getLastUpdate = async  ():Promise<ILastUpdate> => {
    const resp = await axios.get<ILastUpdate>(`${backend}/Last`);
    return resp.data as ILastUpdate;
}
export const getCommonError = async  (pagetErorr: number, onPageErrors: number):Promise<IAnchorageResponse> => {
    const resp = await axios.get<IAnchorageResponse>(`${backend}/CommonError?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`);
    return resp.data as IAnchorageResponse;
}