import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class SharedModule { }
