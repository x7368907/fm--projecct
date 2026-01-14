// src/components/QuickRangePicker.tsx
import React from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw' // 確保引入語系

const { RangePicker } = DatePicker

// 將原本定義在外部的 DATE_PRESETS 搬進來，讓這個元件自給自足
const DATE_PRESETS = [
  {
    label: '昨日',
    getValue: () => [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
  },
  { label: '本日', getValue: () => [dayjs(), dayjs()] },
  {
    label: '上週',
    getValue: () => [
      dayjs().subtract(1, 'week').startOf('week'),
      dayjs().subtract(1, 'week').endOf('week'),
    ],
  },
  {
    label: '本週',
    getValue: () => [dayjs().startOf('week'), dayjs().endOf('week')],
  },
  {
    label: '上月',
    getValue: () => [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
  },
  {
    label: '本月',
    getValue: () => [dayjs().startOf('month'), dayjs().endOf('month')],
  },
]

interface QuickRangePickerProps {
  value?: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  onChange?: (dates: any, dateStrings: [string, string]) => void
  style?: React.CSSProperties // 擴充：讓父層可以傳入 style
}

const QuickRangePicker: React.FC<QuickRangePickerProps> = ({
  value,
  onChange,
  style,
}) => {
  return (
    <div className="w-full" style={style}>
      <RangePicker
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
        allowClear
      />
      <div className="mt-1 grid w-full grid-cols-6 overflow-hidden rounded-sm border border-gray-300 bg-white text-center">
        {DATE_PRESETS.map((preset, index) => (
          <button
            key={preset.label}
            type="button"
            // 呼叫 onChange 時補上第二個參數符合 AntD 格式
            onClick={() =>
              onChange && onChange(preset.getValue() as any, ['', ''])
            }
            className={`py-1 text-xs text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none ${index !== 0 ? 'border-l border-gray-300' : ''} `}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickRangePicker
