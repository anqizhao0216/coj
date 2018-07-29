import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';

import { DataService } from './services/data.service';
import { CollaborationService } from './services/collaboration.service';
import { AuthService } from './services/auth.service';

import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: "data",
    useClass: DataService
  },
  {
    provide: "collaboration",
    useClass: CollaborationService
  },
  AuthService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
