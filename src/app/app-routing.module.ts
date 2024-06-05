import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookMeetRoomComponent } from './module-room/book-meet-room/book-meet-room.component';
import { HistoryRoomComponent } from './module-room/history-room/history-room.component';
import { ApproveStatusComponent } from './module-leave/approve-status/approve-status.component';
import { EmployeeHistoryComponent } from './module-leave/employee/employee-history/employee-history.component';
import { EmployeeInformationComponent } from './module-leave/employee/employee-information/employee-information.component';
import { HistoryLeaveComponent } from './module-leave/employee/history-leave/history-leave.component';
import { HistoryComponent } from './module-leave/history/history/history.component';
import { SubHistoryComponent } from './module-leave/history/sub-history/sub-history.component';
import { LeaveStatusComponent } from './module-leave/leave-status/leave-status.component';
import { WriteLeaveComponent } from './module-leave/write-leave/write-leave.component';
import { LeaveHistoryComponent } from './module-leave/leave-history/leave-history.component';
import { MedicalHistoryComponent } from './module-leave/medical-history/medical-history.component';
import { WhiteTestComponent } from './module-test/white-test/white-test.component';
import { CreateOtComponent } from './module-ot/create-ot/create-ot.component';
import { LeaveHomeComponent } from './module-leave/leave-home/leave-home.component';
import { SummaryHistoryComponent } from './module-leave/employee/summary-history/summary-history.component';

const routes: Routes = [
  { path: '' , component: LeaveHomeComponent },
  { path: 'write-leave' , component: WriteLeaveComponent },
  { path: 'leave-status' , component: LeaveStatusComponent },
  { path: 'approve-status' , component: ApproveStatusComponent },
  { path: 'employee-information' , component: EmployeeInformationComponent },
  { path: 'employee-history' , component: EmployeeHistoryComponent },
  { path: 'employee-history-summary' , component: SummaryHistoryComponent },
  { path: 'history-leave' , component: HistoryLeaveComponent },
  { path: 'history' , component: HistoryComponent },
  { path: 'sub-history' , component: SubHistoryComponent },
  { path: 'book-meet' , component: BookMeetRoomComponent },
  { path: 'book-history' , component: HistoryRoomComponent },
  { path: 'leave-history' , component: LeaveHistoryComponent },
  { path: 'medical-history', component: MedicalHistoryComponent},
  { path: 'test-whitepage', component: WhiteTestComponent},
  { path: 'ot-create', component: CreateOtComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
