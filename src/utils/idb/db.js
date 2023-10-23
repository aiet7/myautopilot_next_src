import {  openDB } from "idb";

const dbName = "DocumentConvoDB";
const storeName = "documents";

const openDatabase = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
};

export const handleSaveDocument = async (id, file) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).put(file, id);
  return tx.done;
};

export const handleGetDocument = async (id) => {
  const db = await openDatabase();
  return db.transaction(storeName).objectStore(storeName).get(id);
};

export const handleDeleteDocument = async (id) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).delete(id);
  return tx.done;
};

export const handleClearDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).clear();
  return tx.done;
};
