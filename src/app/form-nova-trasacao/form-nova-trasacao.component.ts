import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoTransacao, Transacao } from '../modelos/transacao';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-form-nova-trasacao',
  standalone: true,
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './form-nova-trasacao.component.html',
  styleUrl: './form-nova-trasacao.component.css'
})
export class FormNovaTrasacaoComponent {
  valorTransacao = "";
  tipoTransacao = "";
  a = {b: this.valorTransacao, c: this.tipoTransacao}
  trasacaoCriada = output<Transacao>();
  tipoTransacaoEnum = TipoTransacao;

  aoSubmeter() {
    const trasacao = new Transacao(
      this.tipoTransacao as TipoTransacao,
      Number(this.valorTransacao)
    );

    this.trasacaoCriada.emit(trasacao);

    this.valorTransacao = ""
    this.tipoTransacao = ""
  }
}
