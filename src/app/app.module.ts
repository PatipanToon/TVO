import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from './pipe/filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WriteLeaveComponent } from './module-leave/write-leave/write-leave.component';
import { LeaveStatusComponent } from './module-leave/leave-status/leave-status.component';
import { ApproveStatusComponent } from './module-leave/approve-status/approve-status.component';
import { EmployeeInformationComponent } from './module-leave/employee/employee-information/employee-information.component';
import { EmployeeHistoryComponent } from './module-leave/employee/employee-history/employee-history.component';
import { HistoryLeaveComponent } from './module-leave/employee/history-leave/history-leave.component';
import { HistoryComponent } from './module-leave/history/history/history.component';
import { SubHistoryComponent } from './module-leave/history/sub-history/sub-history.component';
import { BookMeetRoomComponent } from './module-room/book-meet-room/book-meet-room.component';
import { HistoryRoomComponent } from './module-room/history-room/history-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveHistoryComponent } from './module-leave/leave-history/leave-history.component';
import { MedicalHistoryComponent } from './module-leave/medical-history/medical-history.component';
import { WhiteTestComponent } from './module-test/white-test/white-test.component';
import { CreateOtComponent } from './module-ot/create-ot/create-ot.component';
import { OtSelectTypeComponent } from './module-ot/components/ot-select-type/ot-select-type.component';
import { DynamicOtFormComponent } from './module-ot/components/dynamic-ot-form/dynamic-ot-form.component';
import { LeaveHomeComponent } from './module-leave/leave-home/leave-home.component';
import { SummaryHistoryComponent } from './module-leave/employee/summary-history/summary-history.component';
import { MaterialExampleModule } from './material.module';
import { MomentPipe } from './pipe/moment.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WriteLeaveComponent,
    LeaveStatusComponent,
    ApproveStatusComponent,
    EmployeeInformationComponent,
    EmployeeHistoryComponent,
    HistoryLeaveComponent,
    FilterPipe,
    MomentPipe,
    HistoryComponent,
    SubHistoryComponent,
    BookMeetRoomComponent,
    HistoryRoomComponent,
    LeaveHistoryComponent,
    MedicalHistoryComponent,
    WhiteTestComponent,
    CreateOtComponent,
    OtSelectTypeComponent,
    DynamicOtFormComponent,
    LeaveHomeComponent,
    SummaryHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialExampleModule,
    MatFormFieldModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'th-TH'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
