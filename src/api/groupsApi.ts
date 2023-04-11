import axios from "axios"
import { ICommonGroupResponse } from "../models/groups/common"
import { IErrorGroupResponse } from "../models/groups/error"
import { ISuccessGroupResponse } from "../models/groups/success"

const backendPartOne = 'http://'
const backendPartTwo = ':4097/api/GroupControllers'

export const getGroupsCommonRequest =async (serverIp: string, pagetErorr: number, onPageErrors: number):Promise<ICommonGroupResponse> => {
    const resp = await axios.get<ICommonGroupResponse>(`${backendPartOne}${serverIp}${backendPartTwo}/common/?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`)
    return resp.data as ICommonGroupResponse;
}

export const getGroupSuccesResponse =async (serverIp: string, pagetErorr: number, onPageErrors: number):Promise<ISuccessGroupResponse> => {
    const resp = await axios.get<ISuccessGroupResponse>(`${backendPartOne}${serverIp}${backendPartTwo}/success/?pageNumber=${pagetErorr}&itemsOnPage=${onPageErrors}`)
    return resp.data as ISuccessGroupResponse;
}