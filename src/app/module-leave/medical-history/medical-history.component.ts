import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { getObject } from 'src/app/model/liff.model';
import { LeaveService } from 'src/app/service/leave.service';
import { LiffService } from 'src/app/service/liff.service';
import { MedicalService } from 'src/app/service/medical.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent implements OnInit {
  constructor(
    private titleService: Title,
    private liffService: LiffService,
    private medicalService: MedicalService
  ) {
    this.titleService.setTitle(environment.app_name + ' : เช็คประวัติการรักษาพยาบาล');
  }
  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  dataMedical: any = [];
  async ngOnInit(): Promise<void> {
    try {
      await this.liffService.initLiff();
      this.profile = this.liffService.getProfile();
      await this.getInitMedicalData();
    } catch (error) {
      console.error(error);
    }
  }

  getInitMedicalData() {
    return new Promise<any>((resolve, reject) => {
      const param = {
        line_id: this.profile?.userId,
      };

      this.medicalService.getMedicalHistory(param).subscribe({
        next: (res: any) => {
          for (let i = 0; i < res.length; i++) {
            res[i].healthdate_ = moment(res[i].healthdate_).format(
              'DD/MM/YYYY'
            );
          }
          this.dataMedical = res;
          resolve(1);
        },
      });
    });
  }
}
