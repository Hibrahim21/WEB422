import { Component, OnInit } from '@angular/core';
import { PositionService } from 'src/app/data/position.service';
import { Position } from 'src/app/data/position';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  
  getPositionsSub: Subscription;
  positions: Position[];
  loadingError = false;

  constructor(private readonly positionService: PositionService) {}

  ngOnInit() {
    this.getPositionsSub = this.positionService
      .getPositions()
      .subscribe(
        employees => (this.positions = employees),
        (error) => (this.loadingError = true)
      );
  }
  ngOnDestroy() {
    if (this.getPositionsSub !== undefined) {
      this.getPositionsSub.unsubscribe();
    }
  }
}