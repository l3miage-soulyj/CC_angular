import { Component } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { PromotionService, Student } from './promotion.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  readonly obsPromotions: Observable<string[]>;
  readonly obsStudents: Observable<readonly Student[]>;
  readonly obsCurrentPromo: Observable<string>;
  readonly obsState: Observable<{students: readonly Student[], currentPromo: string, promotions: string[]}>;

  currentStudent: Student | undefined = undefined;

  constructor(private ps: PromotionService) {
    this.obsPromotions = ps.obsPromotions;
    this.obsStudents   = ps.obsStudents;
    this.obsCurrentPromo = ps.obsCurrentPromo;
    this.obsState = combineLatest([this.obsStudents, this.obsPromotions, this.obsCurrentPromo]).pipe(
      map( ([students, promotions, currentPromo]) => ({students, promotions, currentPromo}) )
    );
  }

  selectPromotion(name: string): void {
    this.ps.selectPromotion(name);
  }

  update(promo: string, s: Student, u: Partial<Student>): void {
    this.ps.updateStudent(promo, s, u);
    console.log("coucou", u);
  }

  trackById(i: number, s: Student) {
    return s.id;
  }
}
