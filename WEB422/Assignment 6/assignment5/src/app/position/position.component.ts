import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PositionService } from "../data/position.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: any;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private positionService: PositionService) { }
  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe((par: { _id: string }) => {
      this.positionSubscription = this.positionService.getPosition(par._id)
        .subscribe(pos => { this.position = pos[0];
         })
    });
  }

  onSubmit(f: NgForm): void {
    this.savePositionSubscription = this.positionService.savePosition(this.position)
      .subscribe(() => {
      this.successMessage = true;
        setTimeout(() => { this.successMessage = false; }, 2500)
      }, error => {
        this.failMessage = true;
        setTimeout(() => { this.failMessage = false; }, 2500)
      },
        () => { console.log("Position: saved!") });
  }

  ngonDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.positionService) {
      this.positionSubscription.unsubscribe();
    }
    if (this.savePositionSubscription) {
      this.savePositionSubscription.unsubscribe();
    }
  }
}



