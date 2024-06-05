import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { LeaveService } from 'src/app/service/leave.service';
import { LiffService } from 'src/app/service/liff.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-sub-history',
  templateUrl: './sub-history.component.html',
  styleUrls: ['./sub-history.component.scss']
})
export class SubHistoryComponent {
  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  employee_id = localStorage.getItem('employee_id');

  employeeName = localStorage.getItem('employee_name');
  leaveId = localStorage.getItem('leavetype');
  myName = localStorage.getItem('myname');
  status = 'green';

  data: any = [];
  constructor(
    private router: Router,
    private titleService: Title,
    private liffService: LiffService,
    private leaveService: LeaveService
  ) {
    this.titleService.setTitle(environment.app_name + ' : ประวัติการลา');
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.liffService.initLiff();
      this.profile = this.liffService.getProfile();
      this.getSelfApprovedLeaveHistorybyLeaveTypeId();
    } catch (error) {
      console.error(error);
    }
  }

  getSelfApprovedLeaveHistorybyLeaveTypeId() {
    const param = {
      line_id: this.profile.userId,
      leave_type_id: this.leaveId
    }

    this.leaveService.getSelfApprovedLeaveHistorybyLeaveTypeId(param).subscribe({
      next: (res: any) => {
        console.log(res);
        for(let i = 0; i < res.history.length; i++) {
          res.history[i].start_time = moment(res.history[i].start_time).format('DD/MM/YYYY');
          res.history[i].end_time = moment(res.history[i].end_time).format('DD/MM/YYYY');
          this.data.push(res.history[i]);
        }
        setTimeout(() => {
          this.checkDate();
        }, 1500);
      }
    })

  }

  // getEmployerLeaveHistory() {
  //   const param = {
  //     approver_line_id: this.profile.userId,
  //     employee_id: this.employee_id
  //   }

  //   this.leaveService.getEmployerLeaveHistory(param).subscribe({
  //     next: (res: any) => {
  //       for(let i = 0; i < res.history.length; i++) {
  //         if(res.history[i].type_id == this.leaveId) {
  //           res.history[i].start_time = moment(res.history[i].start_time).format('DD/MM/YYYY');
  //           res.history[i].end_time = moment(res.history[i].end_time).format('DD/MM/YYYY');
  //           this.data.push(res.history[i]);
  //         }
  //       }
  //       setTimeout(() => {
  //         this.checkDate();
  //       }, 1500);
  //     }
  //   })
  // }

  checkDate() {
    if (!this.data.length) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ยังไม่มีรายการขอลานี้ !',
        text: "กรุณาเลือกรายการอื่น",
        showConfirmButton: true,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#00833F'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'history';
        }
      })
    }
  }

}
