import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { CurrentServerService } from '../current-server/current-server.service';
import { DatabaseService } from '../database/database.service';


@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor
  (
    private http: HTTP,
    private currentServer: CurrentServerService,
    private databaseDao: DatabaseService
  ) 
  {}

  getFromApi()
  {
    return new Promise((resolve, reject)=>
    {
      this.http.get(this.currentServer.getServer()+"/getCidades",{},{})
      .then((retorno)=>
      {
        resolve(JSON.parse(retorno.data));
      })
      .catch((err)=>
      {
        console.log(err);
        reject(); 
      });
    });
  }

  insertCidade(modelos: any)
  {
    return new Promise((resolve,reject)=>
    {
      
      this.databaseDao.getDB().then((db: SQLiteObject)=>
      {
        let sql = "";
        modelos.forEach((modelo)=>
        {
          sql = `
          INSERT INTO cidades(CidadeId, Descricao)
          VALUES(${modelo.cidadeId}, '${modelo.descricao}');
          `;
          db.executeSql(sql, [])
          .then((insercao:any)=>
          {});
        });

        resolve(true);
      });
    });
  }

  insertCidadeApi(descricao: string)
  {
    return new Promise((resolve,reject)=>
    {
      this.http.get(this.currentServer.getServer()+"/setCidade",
      {
        descricao: descricao
      },{})
      .then((retorno:any)=>
      {
        resolve(retorno);
      })
      .catch((err)=>
      {
        console.log(err);
        reject(); 
      });
    });
  }


  getAll()
  {
    return new Promise((resolve,reject)=>
    {
      this.databaseDao.getDB().then((db: SQLiteObject)=>
      {
        let sql = `SELECT * FROM cidades`;
        db.executeSql(sql, [])
        .then((resultado:any)=>
        {
          let retorno = [];
          for(var i = 0; i<=(resultado.rows.length-1); i++)
          {
            retorno.push(resultado.rows.item(i));
          }
          resolve(retorno);
        })
        .catch((err)=>
        {
          reject(err);
        });
      });
    });
  }

  clearAll()
  {
    return new Promise((resolve,reject)=>
    {
      this.databaseDao.getDB().then((db: SQLiteObject)=>
      {
        let sql = `
        DELETE FROM cidades WHERE CidadeId > 0
        `;
        db.executeSql(sql, [])
        .then((resultado:any)=>
        {
          resolve(true);
        })
        .catch((err)=>
        {
          reject(err);
        });
      });
    });
  }

}
