import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {

  constructor(private dbProvider: DatabaseProvider) {
  
  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject)=>{
      let sql = 'SELECT * FROM usuario';
    
      return db.executeSql(sql, [])
        .then((data: any) =>{
          if(data.rows.length > 0){
            let usuario: any [] = [];
            for(var i = 0; i < data.rows.length; i++){
              var user = data.rows.item(i);
              usuario.push(user);              
            }

            return usuario;

          }else{
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}
