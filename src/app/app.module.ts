import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AgeTravelerComponent } from './welcome/get-quote/ageTraveler.component';
import { GroupAgeComponent } from './welcome/get-quote/groupAge.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TravelerInfoComponent } from './traveler-info/traveler-info.component';
import { QuoteComponent } from './traveler-info/quote/quote.component';
import { InfoComponent } from './traveler-info/info/info.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { GetQuoteComponent } from './welcome/get-quote/get-quote.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateConfigModule } from './translate-config.module';

// services
import { WelcomeService } from './welcome/welcome.service';
import { TravelerService } from './traveler-info/traveler.service';
import { SiteSettingsService } from './shared/site_settings.service';
import { UIService } from './shared/ui.services';
import { OdooService } from './shared/odoo.service';
import { ValidationService } from './shared/validation.service';
import { CarInsuranceService } from './car-insurance/car-insurance.service';
import { MedicalService } from './medical-insurance/medical.service';
import { TranslateConfigService } from './shared/translate-config.service';
// components
import { TripDetailsComponent } from './traveler-info/trip-details/trip-details.component';
import { PriceCardComponent } from './traveler-info/price-card/price-card.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PaymentComponent } from './traveler-info/payment/payment.component';
import { ThankyouComponent } from './traveler-info/thankyou/thankyou.component';
import { ExcessComponent } from './traveler-info/excess/excess.component';
import { ListNavComponent } from './navigation/list-nav/list-nav.component';
import { PriceCardPaymentComponent } from './traveler-info/price-card-payment/price-card-payment.component';
import { PersonalAccidentComponent } from './personal-accident/personal-accident.component';
import { PersonalResultComponent } from './personal-result/personal-result.component';
import { PersonalQuoteComponent } from './personal-quote/personal-quote.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { GroupResComponent } from './group-res/group-res.component';
import { GroupTicketComponent } from './group-ticket/group-ticket.component';
import { ThanksComponent } from './thanks/thanks.component';
import { CarInsuranceComponent } from './car-insurance/car-insurance.component';
import { CarQuoteComponent } from './car-insurance/car-quote/car-quote.component';
import { InsuranceInfoComponent } from './car-insurance/insurance-info/insurance-info.component';
import { MedicalQuoteComponent } from './medical-insurance/medical-quote/medical-quote.component';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { MedicalInfoComponent } from './medical-insurance/medical-info/medical-info.component';
import { IndividualMedicalComponent } from './medical-insurance/medical-quote/individual-medical/individual-medical.component';
import { FamilyMedicalComponent } from './medical-insurance/medical-quote/family-medical/family-medical.component';
import { SmesMedicalComponent } from './medical-insurance/medical-quote/smes-medical/smes-medical.component';
import { SmesTableComponent } from './medical-insurance/medical-info/smes-table/smes-table.component';
import { GetTicketComponent } from './get-ticket/get-ticket.component';
import { PaymentDialogComponent } from './shared/payment-dialog.comopnent';

@NgModule({
  declarations: [
    AppComponent,
    AgeTravelerComponent,
    GroupAgeComponent,
    WelcomeComponent,
    TravelerInfoComponent,
    QuoteComponent,
    InfoComponent,
    HeaderComponent,
    NavbarComponent,
    GetQuoteComponent,
    TripDetailsComponent,
    PriceCardComponent,
    TermsOfServicesComponent,
    PaymentComponent,
    ThankyouComponent,
    ExcessComponent,
    ListNavComponent,
    PriceCardPaymentComponent,
    PersonalAccidentComponent,
    PersonalResultComponent,
    PersonalQuoteComponent,
    PersonalInfoComponent,
    TicketFormComponent,
    GroupResComponent,
    GroupTicketComponent,
    ThanksComponent,
    CarInsuranceComponent,
    CarQuoteComponent,
    InsuranceInfoComponent,
    MedicalQuoteComponent,
    MedicalInsuranceComponent,
    MedicalInfoComponent,
    IndividualMedicalComponent,
    FamilyMedicalComponent,
    SmesMedicalComponent,
    SmesTableComponent,
    GetTicketComponent,
    PaymentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateConfigModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    CarInsuranceService,
    WelcomeService,
    TravelerService,
    UIService,
    OdooService,
    SiteSettingsService,
    ValidationService,
    MedicalService,
    TranslateConfigService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AgeTravelerComponent, GroupAgeComponent, PaymentDialogComponent]
})
export class AppModule {}
