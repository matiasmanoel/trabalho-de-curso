import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Injectable()
export class ConteudoProvider {

  constructor(private dbProvider: DatabaseProvider) {

  }

  public insert(conteudo: Conteudo){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject)=>{
      let sql = 'insert into conteudo (assunto, email, descricao, datapost) values (?, ?, ?, ?)';
      let data = [conteudo.assunto, conteudo.email, conteudo.descricao, conteudo.datapost];
    
      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public update(conteudo: Conteudo){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject)=>{
      let sql = 'update conteudo set assunto = ?, email = ?, descricao = ?, datapost = ? where id = ?';
      let data = [conteudo.assunto, conteudo.email, conteudo.descricao, conteudo.datapost, conteudo.id];
    
      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public remove(id: number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject)=>{
      let sql = 'delete from conteudo where id = ?';
      let data = [id];
    
      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public get(id: number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject)=>{
      let sql = 'select * from conteudo where id = ?';
      let data = [id];
    
      return db.executeSql(sql, data)
        .then((data: any) => {
          if(data.rows.length > 0){
            let item = data.rows.item(0);
            let conteudo = new Conteudo();
              conteudo.id = item.id;
              conteudo.assunto = item.assunto;
              conteudo.email = item.email;
              conteudo.descricao = item.descricao;
              conteudo.datapost = item.datapost;
              
              return conteudo;
          }
            return null;
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public getAll(name: string = null){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject)=>{
      let sql = 'SELECT * FROM conteudo where name = ?';
      let data: any[];

      if(name){
        sql += 'and name like ?';
        data.push('%' + name + '%');
      }
    
      return db.executeSql(sql, data)
        .then((data: any) =>{
          if(data.rows.length > 0){
            let conteudo: any [] = [];
            for(var i = 0; i < data.rows.length; i++){
              var conteudos = data.rows.item(i);
              conteudo.push(conteudos);              
            }

            return conteudo;
          }else{
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}

export class Conteudo{
  id: number;
  assunto: string;
  //Qualquer coisa mudar o email para string depois.
  email: EmailValidator;
  descricao: string;
  datapost: Date;
}
