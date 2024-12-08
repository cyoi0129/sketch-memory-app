import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const FIREBASE_CONFIG = {
  apiKey: process.env.API_BASE,
  storageBucket: process.env.STORAGE_BUCKET
};
const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
const storage = firebase.storage(firebaseApp);
const storageRef = storage.ref();

/**
 * Firebase Get Media List
 * @returns 
 */

export const fetchMediaList = async () => {
  const fileList = await storageRef.child('images/').listAll();
  const items = fileList.items;
  const results = await Promise.all(items.map(async (item) => {
    const url = await item.getDownloadURL();
    const result: ImageType = {
      name: item.name,
      url: url
    }
    return result;
  }));
  return results;
}

/**
 * Firebase Get Single Media
 * @param fileName 
 * @returns 
 */

export const downloadMedia = async (fileName: string) => {
  const fileRef = storageRef.child('images/' + fileName);
  const fileURL = await fileRef.getDownloadURL();
  return fileURL;
}