import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// save to localDB
// saves when editor is now long main window
// called from editor.js

  export const putDb = async (content) => {
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ id:1,  content: content });
    const result = await request;
      console.log("saved to editor", result);
  };
  
// get all from localDB

  export const getDb = async () => {
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    if(result.length <1)
    {return}
    return result[0].content
   };
  
  initdb();
