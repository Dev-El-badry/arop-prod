import { GroupTicketComponent } from './group-ticket/group-ticket.component';
import { PersonalAccidentComponent } from './personal-accident/personal-accident.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TravelerInfoComponent } from './traveler-info/traveler-info.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PersonalResultComponent } from './personal-result/personal-result.component';
import { GroupResComponent } from './group-res/group-res.component';
import { ThanksComponent } from './thanks/thanks.component';
import { CarInsuranceComponent } from './car-insurance/car-insurance.component';
import { InsuranceInfoComponent } from './car-insurance/insurance-info/insurance-info.component';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { MedicalInfoComponent } from './medical-insurance/medical-info/medical-info.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';


const routes: Routes = [
  // {path: '', component: WelcomeComponent},
  {path: 'traveler-insurance', component: WelcomeComponent},
  {path: 'traveler-insurance/traveler-info', component: TravelerInfoComponent},
  {path: 'page/terms-of-service', component: TermsOfServicesComponent},
  {path: 'personal-accident', component: PersonalAccidentComponent},
  {path: 'personal-accident/personal-result', component: PersonalResultComponent},
  {path: 'traveler-insurance/group-travel', component: GroupResComponent},
  {path: 'group-res', component: GroupTicketComponent},
  {path: 'get_ticket', component: TicketFormComponent},
  {path: 'personal-accident/thanks', component: ThanksComponent},
  {path: 'car-insurance', component: CarInsuranceComponent},
  {path: 'car-insurance/insurance-info/:brandCar/:brand/:product/:price', component: InsuranceInfoComponent},
  {path: 'medical-insurance', component: MedicalInsuranceComponent},
  {path: 'medical-insurance/medical-info', component: MedicalInfoComponent}
  ,
  {
    path: '',
    redirectTo: '/traveler-insurance',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
