"use client"

import { useState } from "react"
import { type Course, type Semester, calculateGPA, calculateCGPA } from "../utils/gpaCalculations"
import CourseInput from "./components/CourseInput"
import SemesterGPA from "./components/SemesterGPA"
import CumulativeGPA from "./components/CumulativeGPA"
import Visualization from "./components/Visualization"
import WhatIfCalculator from "./components/WhatIfCalculator"
import { Github, Linkedin } from "lucide-react"

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [currentSemester, setCurrentSemester] = useState<Course[]>([])

  const addCourse = (course: Course) => {
    setCurrentSemester([...currentSemester, course])
  }

  const deleteCourse = (courseId: string) => {
    setCurrentSemester(currentSemester.filter((course) => course.id !== courseId))
  }

  const addSemester = () => {
    if (currentSemester.length > 0) {
      const newSemester: Semester = {
        courses: currentSemester,
        gpa: calculateGPA(currentSemester),
      }
      setSemesters([...semesters, newSemester])
      setCurrentSemester([])
    }
  }

  const cgpa = calculateCGPA(semesters)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-indigo-600 py-6 px-8">
            <h1 className="text-3xl font-bold text-white text-center">SRM CGPA Calculator</h1>
          </div>
          <div className="p-8 space-y-8">
            <CourseInput addCourse={addCourse} />
            <SemesterGPA courses={currentSemester} gpa={calculateGPA(currentSemester)} deleteCourse={deleteCourse} />
            <button
              onClick={addSemester}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
            >
              Add Semester
            </button>
            <CumulativeGPA semesters={semesters} cgpa={cgpa} />
            <Visualization semesters={semesters} />
            <WhatIfCalculator
              currentCGPA={cgpa}
              totalCredits={semesters.reduce(
                (sum, sem) => sum + sem.courses.reduce((credits, course) => credits + course.creditHours, 0),
                0,
              )}
            />
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm">© {new Date().getFullYear()} Copyright reserved by Aayush Kumar</div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/SQUADRON-LEADER"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aayush-kumar-146252314/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

