import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

export type Mutable<T extends object> = {
    -readonly [K in keyof T]: T[K]
}

export interface Student {
  readonly id: string;
  readonly name: string;
  readonly score: number;
}

const promotions: {
  [key: string]: Student[];
} = {
  'L3 MIAGE': [
    { id: '3', name: 'Kelso', score: 12 },
    { id: '4', name: 'JD', score: 15 },
    { id: '5', name: 'Erf', score: 10 },
  ],
  'L3 INFO': [
    { id: '1', name: 'bob', score: 2 },
    { id: '2', name: 'jo', score: 20 },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  // private bsStudents = new BehaviorSubject<readonly Student[]>([]);
  private bsCurrentPromo = new BehaviorSubject<string>('L3 MIAGE');

  public obsStudents: Observable<Student[]>;
  public obsPromotions: Observable<string[]> = of(Object.keys(promotions));
  public obsCurrentPromo: Observable<string> = this.bsCurrentPromo.asObservable();

  constructor() {
    this.obsStudents = this.obsCurrentPromo.pipe(
      map( promo => promotions[promo] ),
      map( p => !!p ? p : [] )
    )
  }

  selectPromotion(name: string): void {
    const L = promotions[name];
    if (L !== undefined) {
      this.bsCurrentPromo.next(name);
    }
  }

  updateStudent(
    promotion: string,
    student: Student,
    up: Partial<Student>
  ): void {
    const L = promotions[this.bsCurrentPromo.value];
    if (L) {
      promotions[this.bsCurrentPromo.value] = L.map((s) =>
        s !== student ? s : { ...s, ...up }
      );
      this.selectPromotion(this.bsCurrentPromo.value);
    }
  }
}
