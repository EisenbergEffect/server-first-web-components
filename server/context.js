import { AsyncLocalStorage } from "async_hooks";

const als = new AsyncLocalStorage();

export const getCurrentContext = () => als.getStore();
export const runInNewContext = (callback) => als.run(new Map(), callback);