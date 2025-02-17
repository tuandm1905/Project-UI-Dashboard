import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoxWrapperComponent } from './components/wrapper/box-wrapper/box-wrapper.component';
import { CommonModule } from '@angular/common';
import { FileNotFoundComponent } from './components/error/file-not-found/file-not-found.component';
import { ForbiddenComponent } from './components/error/forbidden/forbidden.component';
import { ServerErrorComponent } from './components/error/server-error/server-error.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';
import { BreadcrumComponent } from './components/breadcrum/breadcrum.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from '../app/user/components/chat/chat.component';

@NgModule({
   declarations: [
      HeaderComponent,
      FooterComponent,
      BoxWrapperComponent,
      FileNotFoundComponent,
      ForbiddenComponent,
      ServerErrorComponent,
      UnauthorizedComponent,
      BreadcrumComponent, ChatComponent
   ],
   imports: [
      CommonModule, RouterModule, FormsModule
   ],
   exports: [
      BoxWrapperComponent,
      HeaderComponent,
      FooterComponent,
      FileNotFoundComponent,
      ForbiddenComponent,
      ServerErrorComponent,
      UnauthorizedComponent,
      BreadcrumComponent
   ],
})
export class SharedModule { }