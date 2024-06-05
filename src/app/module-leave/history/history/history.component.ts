import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';
import { LeaveService } from 'src/app/service/leave.service';
import { LiffService } from 'src/app/service/liff.service';
import { environment } from 'src/environments/environment';
type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  constructor(
    private router: Router,
    private titleService: Title,
    private liffService: LiffService,
    private leaveService: LeaveService
  ) {
    this.titleService.setTitle(environment.app_name + ' : ประวัติการลา');
  }

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  name = localStorage.getItem('employee_name');
  employee_id = localStorage.getItem('employee_id');

  data: any;
  async ngOnInit(): Promise<void> {
    try {
      await this.liffService.initLiff();
      this.profile = this.liffService.getProfile();
      this.getLeaveQuota();
    } catch (error) {
      console.error(error);
    }
  }
  getLeaveQuota() {
    const param = {
      line_id: this.profile?.userId,
    };

    this.leaveService.getLeaveQuota(param).subscribe({
      next: (res: any) => {
        this.data = res.quotas;
        // console.log(res);
      },
    });
  }

  // getEmployerLeaveQuota() {
  //   const param = {
  //     approver_line_id: this.profile.userId,
  //     employee_id: this.employee_id
  //   }

  //   this.leaveService.getEmployerLeaveQuota(param).subscribe({
  //     next: (res: any) => {
  //       this.data = res.quotas;
  //     }
  //   })
  // }

  viewDetail(item: any) {
    localStorage.setItem('leavetype', item.id);
    this.router.navigate(['sub-history']);
  }

  getDate(item: any) {
    let date;
    date = item.matchQuota - item.matchUse;
    return date % 1 == 0 ? date + ' วัน' : Math.floor(date) + ' วันครึ่ง';
  }
}
