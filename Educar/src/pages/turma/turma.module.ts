import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Turma } from './turma';

@NgModule({
  declarations: [
    Turma,
  ],
  imports: [
    IonicPageModule.forChild(Turma),
  ],
  exports: [
    Turma
  ]
})
export class TurmaModule {}
