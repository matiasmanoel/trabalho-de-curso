import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {

  }

  public getDB(){
    return this.sqlite.create({
      //https://youtu.be/yWs2xceNCh0?t=371;
      name: 'projetotcc',
      location: 'default'
    });
  }

  public createDatabase(){
    return this.getDB()
      .then((db: SQLiteObject)=>{
        this.createTables(db);
      })
      .catch(e => console.error(e))
  }

  private createTables(db: SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS conteudo (id integer primary key AUTOINCREMENT NOT NULL, assunto TEXT, email EMAIL, descricao TEXT, datapost DATE)'],
      ['CREATE TABLE IF NOT EXISTS usuario (id integer primary key AUTOINCREMENT NOT NULL, usuario TEXT, email EMAIL, senha PASSWORD)']
    ])
    .then(() => console.log('Tabelas Criadas'))
    .catch(e => console.log('Erro ao criar a(s) tabela(s)', e));
  }

  // private insertContent(db: SQLiteObject){
  //   db.executeSql('select COUNT(id) as qtd from categories')
  //   .then((data: any) => {
  //     //Se não existe nenhum registro
  //     if (data.rows.item(0).qtd == 0) {
 
  //       // Criando as tabelas
  //       db.sqlBatch([
  //         ['insert into conteudo (name) values (?), (?)', ['Hambúrgueres'], ['eu@eu.com']],
  //         ['insert into conteudo (name) values (?)', ['Bebidas']]
  //       ])
  //         .then(() => console.log('Dados padrões incluídos'))
  //         .catch(e => console.error('Erro ao incluir dados padrões', e));
 
  //     }
  //   })
  //   .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  // }
}
