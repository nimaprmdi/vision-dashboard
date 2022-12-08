import { createAction } from "@reduxjs/toolkit";

interface PayLoadType {
    url: string;
    method: string;
    data: {};
    onStart: string;
    OnSuccess: string;
    onError: string;
}

export const apiCallBegan = createAction<PayLoadType>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccss");
export const apiCallFailed = createAction<any>("api/callFailed");
