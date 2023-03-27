import axios from 'axios';
import { IAnchorageResponse } from '../models/anchorage/error';
import { SuccessAnchorage } from '../models/anchorage/success';

const backend = 'http://localhost:4097/api/Anchorage';

export const getErrors = async (pagetErorr: number, onPageErrors: number):Promise<IAnchorageResponse> => {
    const resp = await axios.get<IAnchorageResponse>(`${backend}/Errors?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`);
    return resp.data as IAnchorageResponse;
}
export const getSuccess = async  ():Promise<SuccessAnchorage[]> => {
    const resp = await axios.get<SuccessAnchorage[]>(`${backend}/success`);
    return resp.data as SuccessAnchorage[];
}