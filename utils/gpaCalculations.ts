export type Grade = "O" | "A+" | "A" | "B+" | "B" | "C" | "P" | "F"

export interface Course {
  id: string
  creditHours: number
  grade: Grade
}

export interface Semester {
  courses: Course[]
  gpa: number
}

const gradePoints: Record<Grade, number> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
}

export const calculateGPA = (courses: Course[]): number => {
  let totalPoints = 0
  let totalCredits = 0

  courses.forEach((course) => {
    totalPoints += gradePoints[course.grade] * course.creditHours
    totalCredits += course.creditHours
  })

  return totalCredits > 0 ? totalPoints / totalCredits : 0
}

export const calculateCGPA = (semesters: Semester[]): number => {
  const totalPoints = semesters.reduce((sum, semester) => sum + semester.gpa * getTotalCredits(semester.courses), 0)
  const totalCredits = semesters.reduce((sum, semester) => sum + getTotalCredits(semester.courses), 0)
  return totalCredits > 0 ? totalPoints / totalCredits : 0
}

const getTotalCredits = (courses: Course[]): number => {
  return courses.reduce((sum, course) => sum + course.creditHours, 0)
}

export const getGradeFromPoints = (points: number): Grade => {
  const gradeEntries = Object.entries(gradePoints)
  for (const [grade, value] of gradeEntries) {
    if (points >= value) {
      return grade as Grade
    }
  }
  return "F"
}

