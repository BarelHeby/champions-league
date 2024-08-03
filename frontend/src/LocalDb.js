// src/indexedDB.js
import { openDB } from "idb";

const DB_NAME = "champions";
const STORE_NAME = "responses";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveResponse = async (key, data) => {
  const db = await initDB();
  await db.put(STORE_NAME, data, key);
};

export const getResponse = async (key) => {
  const db = await initDB();
  return db.get(STORE_NAME, key);
};
