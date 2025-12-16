// // RideSearchingToast.tsx
// import { useEffect, useState } from 'react'

// export default function RideSearchingToast({
//   onComplete
// }: {
//   onComplete: () => void
// }) {
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           onComplete()
//           return 100
//         }
//         return prev + 1
//       })
//     }, 100) // 100ms * 100 = 10 seconds

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="space-y-2">
//       <p className="font-semibold">Searching for a driver...</p>
//       <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//         <div
//           className="bg-blue-500 h-2 transition-all duration-100"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//       <p className="text-sm text-muted-foreground">{progress}%</p>
//     </div>
//   )
// }
const renderProgressBar = (progress: number) => (
  <div className="space-y-1">
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-2 bg-blue-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-600">{progress}%</p>
  </div>
)
