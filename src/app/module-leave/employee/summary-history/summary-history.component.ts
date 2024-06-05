import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LeaveService } from 'src/app/service/leave.service';
import { LiffService } from 'src/app/service/liff.service';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { deburr } from 'lodash';
@Component({
  selector: 'app-summary-history',
  templateUrl: './summary-history.component.html',
  styleUrls: ['./summary-history.component.scss'],
})
export class SummaryHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'employee_code',
    'employee_name',
    'employee_position',
    'employee_department',
    'approver_name',
    'leave_time',
    'leave_created',
    'leave_approved_at',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private titleService: Title,
    private liffService: LiffService,
    private leaveService: LeaveService
  ) {
    this.titleService.setTitle(
      `${environment.app_name} : ค้นหาประวัติการลาของลูกน้อง`
    );
  }
  profile: any;
  startDate: any = moment().add(-30, 'days').format('YYYY-MM-DD');
  endDate: any = moment().format('YYYY-MM-DD');

  async ngOnInit(): Promise<void> {
    try {
      await this.liffService.initLiff();
      this.profile = this.liffService.getProfile();
    } catch (error) {
      console.error(error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = deburr(filterValue.trim());
  }
  searchLeaveHistory() {
    if (!this.startDate || !this.endDate) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'เกิดข้อผิดพลาด !',
        text: 'กรุณาตรวจสอบวันที่การลา ให้ถูกต้อง',
        showConfirmButton: true,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#00833F',
      });
      return;
    }
    const param = {
      approver_line_id: this.profile.userId,
      date_start: this.startDate,
      date_end: this.endDate,
    };

    this.leaveService.getEmployeesLeaveHistory(param).subscribe({
      next: (res: any) => {
        const leave = res.leaves;
        this.dataSource.data = leave.rows;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(leave);
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'เกิดข้อผิดพลาด !',
          text: 'ไม่สามารถค้นหาประวัติการลาได้',
          showConfirmButton: true,
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#00833F',
        });
      },
    });
  }
}
