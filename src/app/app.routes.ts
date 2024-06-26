import { Routes } from '@angular/router';
import { HomeComponent } from './admin/components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ServicesComponent } from './components/services/services.component';
import { ReserveComponent } from './components/reserve/reserve.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EditUserComponent } from './shared/components/user/edit/editUser.component';
import { PhoneComponent } from './components/login/phone/phone.component';
import { SuccessComponent } from './shared/components/success/success.component';

export const routes: Routes = [
  // { path: ':language?', component: HomeComponent },
  { title: 'Home', path: 'home', component: HomeComponent },
  { title: 'About', path: 'about', component: AboutComponent },
  { title: 'Client', path: 'clients', component: ClientsComponent },
  { title: 'Reserve', path: 'reserve', component: ReserveComponent },
  { title: 'Reserve', path: 'reserve/:service', component: ReserveComponent },
  { title: 'Success', path: 'success', component: SuccessComponent },
  {
    title: 'FireAdmin',
    path: 'admin',
    loadChildren: () =>
      import('src/app/admin/admin-routing.module').then((a) => {
        return a.AdminRoutingModule;
      }),
  },
  {
    title: 'Feedback',
    path: 'feedback',
    component: FeedbackComponent,
  },
  { title: 'Gallery', path: 'gallery', component: GalleryComponent },
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
    data: {
      role: 'notLoggined',
    },
  },
  {
    title: 'Register',
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
    data: {
      role: 'notLoggined',
    },
  },
  {
    path: 'phone',
    component: PhoneComponent,
    canActivate: [AuthGuardService],
    data: {
      role: 'notLoggined',
    },
  },

  { title: 'Services', path: 'services', component: ServicesComponent },
  {
    title: 'Profile',
    path: 'user',
    component: EditUserComponent,
    canActivate: [AuthGuardService],
  },

  { title: 'Home', path: '**', component: HomeComponent },
];
