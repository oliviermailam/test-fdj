import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, SharedModule, AppComponent],
})
export class AppModule {}
