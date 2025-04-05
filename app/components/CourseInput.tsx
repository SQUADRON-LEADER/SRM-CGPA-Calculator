import { useState } from "react"
import type { Course, Grade } from "../../utils/gpaCalculations"

interface Props {
  addCourse: (course: Course) => void
}

export default function CourseInput({ addCourse }: Props) {
  const [creditHours, setCreditHours] = useState(3)
  const [grade, setGrade] = useState<Grade>("O")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (creditHours > 0) {
      addCourse({ id: Date.now().toString(), creditHours, grade })
      setCreditHours(3)
      setGrade("O")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="creditHours" className="block text-sm font-medium text-gray-700 mb-1">
            Credit Hours
          </label>
          <input
            type="number"
            id="creditHours"
            value={creditHours}
            onChange={(e) => setCreditHours(Number(e.target.value))}
            min="1"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value as Grade)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="O">O</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="P">P</option>
            <option value="F">F</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
      >
        Add Course
      </button>
    </form>
  )
}

