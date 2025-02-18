// app/chart2/layout.js
import './chart2.css'

export const metadata = {
  title: 'Big C Thailand - Network Status',
  description: 'Real-time network status dashboard for Big C Thailand',
}

export default function Chart2Layout({ children }) {
  return (
    <div className="chart2-container">
      {children}
    </div>
  )
}