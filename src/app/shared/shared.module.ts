import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule,
    FooterComponent
  ],
})
export class SharedModule { }
