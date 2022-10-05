import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student, StudentService } from '../student.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public student: Student;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id: number = +this.activatedRoute.snapshot.paramMap.get("id");

    this.student = this.studentService.find(id);
  }
}