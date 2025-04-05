import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Semester } from "../../utils/gpaCalculations"

interface Props {
  semesters: Semester[]
}

export default function Visualization({ semesters }: Props) {
  const data = semesters.map((semester, index) => ({
    name: `Sem ${index + 1}`,
    gpa: semester.gpa,
  }))

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">GPA Visualization</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="gpa" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

