import { Component, computed, signal } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { FormNovaTrasacaoComponent } from "./form-nova-trasacao/form-nova-trasacao.component";
import { TipoTransacao, Transacao } from './modelos/transacao';
import { ExtratoComponent } from "./extrato/extrato.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BannerComponent, FormNovaTrasacaoComponent, ExtratoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  transacoes = signal<Transacao[]>([]);

  saldo = computed(() => {
    return this.transacoes().reduce((acc, transacaoAtual) => {
      switch(transacaoAtual.tipo){
        case TipoTransacao.DEPOSITO:
          return acc + transacaoAtual.valor;
        case TipoTransacao.SAQUE:
          return acc - transacaoAtual.valor;
        default:
          throw new Error("Tipo de transação, não identificado");
      }
      
    }, 0)
  });

  processarTransacao(t: Transacao) {
    if(t.tipo === TipoTransacao.SAQUE && t.valor > this.saldo()) {
      return alert("Saldo insuficiente!");
    }
    this.transacoes.update((lsitaAtual) => [t, ...lsitaAtual]);
  }
}
