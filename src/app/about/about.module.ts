import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes  } from '@angular/router';

import { AboutComponent } from './about.component';

const ROUTES: Routes = [
  { path: '', component: AboutComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
