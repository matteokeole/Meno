import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Student, StudentService } from '../student.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})
export class RosterPage implements OnInit {
  private students: Student[];
  private results: Student[];

  constructor(
    private studentService: StudentService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.students = this.results = this.studentService.findAll();
  }

  searchStudents(e) {
    const query = e.target.value.toLowerCase();

    this.results = this.students.filter(student =>
      student.firstName.includes(query) ||
      student.lastName.includes(query) ||
      student.email.includes(query),
    );
  }

  updateStudentStatus(student: Student, status: boolean) {
    student.present = status;
  }

  async deleteStudent(student: Student) {
    const alert = await this.alertController.create({
      header: "Confirmation de suppression",
      subHeader: "di",
      message: `Etes-vous sûr(e) de vouloir supprimer ${student.firstName} ${student.lastName} ?`,
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
        }, {
          text: "Supprimer",
          role: "destructive",
        },
      ],
    });

    alert.present();

    const response = await alert.onDidDismiss();

    if (response.role === "destructive") {
      this.studentService.delete(student);

      (await this.toastController.create({
        icon: "trash",
        message: `${student.firstName} ${student.lastName} a été supprimé(e).`,
        duration: 2000,
        position: "top",
      })).present();

      this.students = this.results = this.studentService.findAll();
    }
  }
}