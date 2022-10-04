import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  present: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[];

  constructor() {
    this.students = [
      {id: 1, firstName: "Jean", lastName: "Bon", email: "jean.bon@gmail.com", present: true},
      {id: 2, firstName: "Pierre", lastName: "Afeu", email: "pierre.afeu@wanadoo.com", present: false},
      {id: 3, firstName: "Harry", lastName: "Covert", email: "harry.covert@icloud.com", present: true},
      {id: 4, firstName: "Corinne", lastName: "Titgoutte", email: "corinne.titgoute@outlook.com", present: true},
      {id: 5, firstName: "Mélusine", lastName: "Enfaillite", email: "melusine.enfaillite@yahoo.com", present: false},
    ];
  }

  findAll(): Student[] {
    return structuredClone(this.students);
  }

  find(id: number): Student {
    return structuredClone(this.students).find(student => student.id === id);
  }

  findBy(filters: object): Student[] {
    let students = structuredClone(this.students);

    for (const [column, value] of Object.entries(filters)) {
      students = students.filter(student => student[column] === value);
    }

    return students;
  }

  findOneBy(filters: object): Student {
    const student = this.findBy(filters);

    return student.length ? student[0] : undefined;
  }

  delete(id: number|Student) {
    this.students = typeof id === "number" ?
      this.students.filter(student => student.id !== id) :
      this.students.filter(student => student.id !== id.id);
  }
}