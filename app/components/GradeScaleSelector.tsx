import type { GradeScale } from "../../utils/gpaCalculations"

interface Props {
  gradeScale: GradeScale
  setGradeScale: (scale: GradeScale) => void
}

export default function GradeScaleSelector({ gradeScale, setGradeScale }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Grade Scale</label>
      <div className="flex space-x-4">
        {["4.0", "10.0", "percentage"].map((scale) => (
          <button
            key={scale}
            onClick={() => setGradeScale(scale as GradeScale)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              gradeScale === scale ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            {scale === "percentage" ? "Percentage" : `${scale} Scale`}
          </button>
        ))}
      </div>
    </div>
  )
}

