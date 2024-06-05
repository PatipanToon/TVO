import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';
import { LeaveService } from 'src/app/service/leave.service';
import { LiffService } from 'src/app/service/liff.service';
import { environment } from 'src/environments/environment';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.scss']
})
export class EmployeeInformationComponent {

  constructor(
    private router: Router,
    private titleService: Title,
    private liffService: LiffService,
    private leaveService: LeaveService
  ) {
    this.titleService.setTitle(environment.app_name + ' : ประวัติการลาพนักงาน');
  }

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  searchText = '';


  data: any

  async ngOnInit(): Promise<void> {
    try {
      await this.liffService.initLiff();
      this.profile = this.liffService.getProfile();
      this.getEmployerList();
    } catch (error) {
      console.error(error);
    }
  }

  getEmployerList() {
    const param = {
      line_id: this.profile.userId
    }

    this.leaveService.getEmployerList(param).subscribe({
      next: (res: any) => {
        this.data = res.employers;
      }
    })
  }

  selectEmployee(item: any) {
    localStorage.setItem('employee_id', item.employee_id)
    localStorage.setItem('employee_name', item.employeeAssoc.name_th)
    this.router.navigate(['employee-history']);
  }

}
