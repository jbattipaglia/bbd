import { Component, OnInit } from '@angular/core';
import { ModificationService } from '../modification.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {

    result: string;
    modification: string;
    progress = false;

  constructor(
      public modificationService: ModificationService
  ) { }

    getResult() {
        this.progress = true;
        this.modificationService.getResult(this.modification).subscribe(
            data => {
                let rows = data['rows'];
                this.result = rows + " rows modified"
            },
            (error: HttpResponse<any>) => {
                this.result= error['error']
            },
            () => {
                this.progress = false;
            }
        );
    }


  ngOnInit() {
  }

}
