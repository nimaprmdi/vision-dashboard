import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("apu/callBegan");
export const apiCallSuccess = createAction("apu/callSuccss");
export const apiCallFailed = createAction("apu/callFailed");
