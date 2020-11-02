import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/database/database.service';
import { CidadeService } from '../cidade.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.page.html',
  styleUrls: ['./cidade.page.scss'],
})
export class CidadePage implements OnInit 
{
  descricao_cidade: string = "";
  cidades: any = [];
  cidadesApi: any = [];
  promises: any = [];

  constructor
  (
    private databaseDao: DatabaseService,
    private cidadeDao: CidadeService,
    private alertCtrl: AlertController
  ) 
  { 
    this.trazerInformacoes();
  }

  ngOnInit() 
  {
    
  }

  addPromises()
  {
    return new Promise((resolve,reject)=>
    {
      this.promises = [];
      this.cidadesApi = [];
  
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
            this.cidadesApi = cidades;
          })
        );
        resolve(true);
    });
  }

  trazerInformacoes()
  {
    this.cidadeDao.getAll().then((cidades:any)=>
    {
      this.cidades = cidades;
    });
  }

  salvar()
  {
    if(this.descricao_cidade!="")
    {
      this.cidadeDao.insertCidadeApi(this.descricao_cidade).then((retorno:any)=>
      {
        this.mensagemAlerta("Sucesso", "Cidade salva com Sucesso!")
        .then(()=>
        {
          this.addPromises().then(()=>
          {
            Promise.all(this.promises).then((execucao:any)=>
            {
              this.cidadeDao.insertCidade(this.cidadesApi).then((resultado:any)=>
              {
                this.trazerInformacoes();
              });
            });
          });
        });
      });
    }
    else
    {
      this.mensagemAlerta("Falha", "Digite o nome por favor!")
      .then(()=>
      {
      });
    }
  }

  async mensagemAlerta(cabecalho: string, mensagem:string)
  {
    let alerta = await this.alertCtrl.create(
    {
      header: cabecalho,
      message: mensagem
    });
    alerta.present();
  }

}
