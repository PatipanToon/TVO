import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LiffService } from 'src/app/service/liff.service';
import { environment } from 'src/environments/environment';
import { LeaveService } from 'src/app/service/leave.service';
@Component({
  selector: 'app-leave-home',
  templateUrl: './leave-home.component.html',
  styleUrls: ['./leave-home.component.scss'],
})
export class LeaveHomeComponent {
  constructor(
    private titleService: Title,
    private liffService: LiffService,

    private leaveService: LeaveService
  ) {
    this.titleService.setTitle(this.title + 'หน้าหลักการลางาน');
  }
  title: string = environment.app_name + ' : ';
  profile: any;

  pictureUser: string = 'assets/user.png';

  employeeData: any;
  ngOnInit(): void {
    this.liffService
      .initLiff()
      .then(() => {
        this.profile = this.liffService.getProfile();
        console.log(this.profile);
        if (this.profile === null || this.profile === undefined) {
          return;
        }
        this.pictureUser = this.profile.pictureUrl;
        this.getInitLeaveData();
      })
      .catch(console.error);
  }

  clearCache() {
    try {
      this.liffService.logOutLiff();
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async getInitLeaveData() {
    const param = {
      line_id: this.profile?.userId,
    };

    this.leaveService.getInitLeaveData(param).subscribe({
      next: (res: any) => {
        this.employeeData = res.user;
      },
    });
  }
}
