import { AsyncLocalStorage } from "async_hooks";

const als = new AsyncLocalStorage();

export function getCurrentContext() {
  return als.getStore();
}

export function runWithNewContext(callback) {
  return als.run(new Map(), callback);
}