import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { getObject } from 'src/app/model/liff.model';
import { LeaveService } from 'src/app/service/leave.service';
import { LiffService } from 'src/app/service/liff.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss'],
})
export class LeaveHistoryComponent implements OnInit {
  datePreview: any;
  myName: any;
  date: any;
  appUrl: string = '';
  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  dataLeave: any = [];
  dataDays: any = [];
  leaveTypeName: any;
  statusPreview: any;
  note!: string;

  sort: any = [];
  constructor(
    private titleService: Title,
    private liffService: LiffService,
    private leaveService: LeaveService
  ) {
    this.titleService.setTitle(environment.app_name + ' : สร้างคำขอลา');
  }
  async ngOnInit(): Promise<void> {
    try {
      await this.liffService.initLiff();
      this.profile = this.liffService.getProfile();
      this.appUrl = environment.path;
      await this.getInitLeaveData();
      await this.requestLeaveStatus();
    } catch (error) {
      console.error(error);
    }
  }

  getInitLeaveData() {
    return new Promise<any>((resolve, reject) => {
      const param = {
        line_id: this.profile?.userId,
      };

      this.leaveService.getInitLeaveData(param).subscribe({
        next: (res: any) => {
          // console.log(res.leaveType);
          console.log(res);
          this.leaveTypeName = res.leaveType;
          resolve(1);
        },
      });
    });
  }

  requestLeaveStatus() {
    return new Promise<any>((resolve, reject) => {
      const param = {
        line_id: this.profile?.userId,
      };

      this.leaveService.requestLeaveStatus(param).subscribe({
        next: (res: any) => {
          // console.log(this.leaveTypeName);
          for (let i = 0; i < res.leave.length; i++) {
            res.leave[i].start_time = moment(res.leave[i].start_time).format(
              'DD/MM/YYYY'
            );
            res.leave[i].end_time = moment(res.leave[i].end_time).format(
              'DD/MM/YYYY'
            );
            res.leave[i].leave_type_name = getObject(
              this.leaveTypeName,
              res.leave[i].type_id,
              'id'
            );
            res.leave[i].leave_type_name = res.leave[i].leave_type_name
              ? res.leave[i].leave_type_name.name
              : null;
            if (res.leave[i].leave_format === 'FULL') {
              res.leave[i].leave_format = 'เต็มวัน';
            } else if (res.leave[i].leave_format === 'HALF_MORNING') {
              res.leave[i].leave_format = 'ครึ่งวันเช้า';
            } else if (res.leave[i].leave_format === 'HALF_NOON') {
              res.leave[i].leave_format = 'ครึ่งวันบ่าย';
            }
            const data = moment(res.leave[i].start_time).diff(
              res.leave[i].end_time,
              'days'
            );
            this.dataDays.push(data);
          }

          this.dataLeave = res.leave.filter(
            (leaveItem: any) => leaveItem.status !== 'PENDING'
          );
          this.myName = res.user;
          console.log(res);
          resolve(1);
        },
      });
    });
  }

  getDataUser(item: any) {
    this.statusPreview = item;
  }

  send() {
    const param = {
      line_id: this.profile?.userId,
      leave_id: this.statusPreview?.id,
    };
    this.leaveService.cancelLeave(param).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'สำเร็จ !',
          text: 'ยกเลิกการลาสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'พบข้อผิดพลาด!',
          text: 'ไม่สามารถยกเลิกการลาได้ กรุณาติดต่อ แอดมิน',
          showConfirmButton: true,
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#00833F',
        });
      },
    });
  }
}
