import { type Semester, getGradeFromPoints } from "../../utils/gpaCalculations"

interface Props {
  semesters: Semester[]
  cgpa: number
}

export default function CumulativeGPA({ semesters, cgpa }: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Cumulative GPA</h2>
      {semesters.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {semesters.map((semester, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Semester {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {semester.gpa.toFixed(2)} ({getGradeFromPoints(semester.gpa)})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-lg font-semibold text-indigo-600">
            Cumulative GPA: {cgpa.toFixed(2)} ({getGradeFromPoints(cgpa)})
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No semesters added yet.</p>
      )}
    </div>
  )
}

