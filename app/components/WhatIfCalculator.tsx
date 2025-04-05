import { useState } from "react"
import { getGradeFromPoints, type Grade } from "../../utils/gpaCalculations"

interface Props {
  currentCGPA: number
  totalCredits: number
}

export default function WhatIfCalculator({ currentCGPA, totalCredits }: Props) {
  const [newCredits, setNewCredits] = useState(0)
  const [newGrade, setNewGrade] = useState<Grade>("O")
  const [predictedCGPA, setPredictedCGPA] = useState(0)

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

  const calculatePredictedCGPA = () => {
    const totalPoints = currentCGPA * totalCredits + gradePoints[newGrade] * newCredits
    const newTotalCredits = totalCredits + newCredits
    const newCGPA = totalPoints / newTotalCredits
    setPredictedCGPA(newCGPA)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">What-If Calculator</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="newCredits" className="block text-sm font-medium text-gray-700 mb-1">
            New Credits
          </label>
          <input
            type="number"
            id="newCredits"
            value={newCredits}
            onChange={(e) => setNewCredits(Number(e.target.value))}
            min="0"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="newGrade" className="block text-sm font-medium text-gray-700 mb-1">
            Expected Grade
          </label>
          <select
            id="newGrade"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value as Grade)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <button
          onClick={calculatePredictedCGPA}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
        >
          Calculate Predicted CGPA
        </button>
        {predictedCGPA > 0 && (
          <p className="mt-4 text-lg font-semibold text-indigo-600">
            Predicted CGPA: {predictedCGPA.toFixed(2)} ({getGradeFromPoints(predictedCGPA)})
          </p>
        )}
      </div>
    </div>
  )
}

