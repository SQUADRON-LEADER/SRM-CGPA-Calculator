import { type Course, getGradeFromPoints } from "../../utils/gpaCalculations"
import { TrashIcon } from "@heroicons/react/24/outline"

interface Props {
  courses: Course[]
  gpa: number
  deleteCourse: (courseId: string) => void
}

export default function SemesterGPA({ courses, gpa, deleteCourse }: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Current Semester</h2>
      {courses.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course, index) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Course {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.creditHours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-lg font-semibold text-indigo-600">
            Semester GPA: {gpa.toFixed(2)} ({getGradeFromPoints(gpa)})
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No courses added yet.</p>
      )}
    </div>
  )
}

