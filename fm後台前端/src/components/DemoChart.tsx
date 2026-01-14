// src/components/DemoChart.tsx
import { Card } from 'antd'
import { useEffect, useRef } from 'react'
import { Column } from '@antv/g2plot'

export default function DemoChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chart = new Column(chartRef.current!, {
      data: [
        { type: '分類 A', value: 30 },
        { type: '分類 B', value: 70 },
        { type: '分類 C', value: 45 },
      ],
      xField: 'type',
      yField: 'value',
      label: {
        position: 'middle',
        style: { fill: '#FFFFFF', opacity: 0.6 },
      },
      color: ({ type }) => {
        const colorMap: Record<string, string> = {
          '分類 A': '#3B82F6', // 藍色
          '分類 B': '#10B981', // 綠色
          '分類 C': '#F97316', // 橘色
        };
        return colorMap[type] || '#8884d8'; // 預設色
      },
      columnWidthRatio: 0.5,
      meta: {
        type: { alias: '類別' },
        value: { alias: '數值' },
      },
    })

    chart.render()
    return () => chart.destroy()
  }, [])

  return (
    <Card title="AntD + G2Plot 圖表示範">
      <div ref={chartRef} />
    </Card>
  )
}
