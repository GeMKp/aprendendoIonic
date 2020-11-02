import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CidadeService } from './cidade/cidade.service';
import { DatabaseService } from './database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent 
{
  promises : any = [];
  cidades: any = [];

  constructor
  (
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private cidadeDao: CidadeService,
    private databaseDao: DatabaseService
  ) 
  {
    this.addPromises().then(()=>
    {
      this.initializeApp();
    });
  }

  addPromises()
  {
    return new Promise((resolve,reject)=>
    {
      this.promises = [];
    
      this.promises.push
        (
          this.databaseDao.createTableCidade().then((retorno: any)=>
          {
          })
        );
  
        this.promises.push
        (
          this.cidadeDao.clearAll().then((resposta: any)=>
          { 
          })
        );
  
        this.promises.push
        (
          this.cidadeDao.getFromApi().then((cidades: any)=>
          {
            this.cidades = cidades;
          })
        );

        resolve(true);
    });
  }

  initializeApp() 
  {
    this.platform.ready().then(() => 
    {
      Promise.all(this.promises).then((execucao:any)=>
      {
        this.cidadeDao.insertCidade(this.cidades).then((resultado:any)=>
        {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
      });

    });
  }
}
