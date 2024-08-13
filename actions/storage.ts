import {deleteCookie, getCookie, setCookie} from 'cookies-next'

export const SET_TOKEN = (token:string):void => {
   setCookie("token",token)
}
export const REMOVE_TOKEN = ():void => {
   deleteCookie("token");
}
export const GET_TOKEN = () => {
   return getCookie("token")}
