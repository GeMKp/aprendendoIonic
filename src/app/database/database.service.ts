import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService 
{

  constructor
  (
    private sqlite: SQLite
  ) 
  { 

  }

  getDB()
  {
      return this.sqlite.create(
      {
        name: "webcoreapi.db",
        location: "default"
      });
  }

  createTableCidade()
  {
    return new Promise((resolve,reject)=>
    {
      this.getDB().then((db: SQLiteObject)=>
      {
        let sql = `
        CREATE TABLE IF NOT EXISTS cidades
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          CidadeId INTEGER NOT NULL UNIQUE,
          Descricao VARCHAR(50)
        )
        `;
        db.executeSql(sql,[])
        .then((resultado)=>
        {
          resolve(true);
        })
        .catch((err)=>
        {
          console.log(err);
          reject(err);
        });
      });
    });
  }
}
