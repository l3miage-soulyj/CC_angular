import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mutable, Student } from '../promotion.service';

@Component({
  selector: 'app-student[data]',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input () data!: Readonly<Student>;
  @Input () editing = true;
  @Output() update = new EventEmitter<Partial<Student>>();
  // editedStudent: Mutable<Student>;

  ngOnInit() {
    //this.editedStudent = {...this.data};
  }

}