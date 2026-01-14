// 渲染彩色數字輔助函式
export const renderRebateVal = (
  val: number | undefined,
  type: 'h' | 'd' | 'w'
) => {
  if (val === undefined || val === null) return '-'
  let color = '#333'
  if (type === 'h') color = '#faad14' // 橘色
  if (type === 'd') color = '#1890ff' // 藍色
  return <span style={{ color, fontWeight: 500 }}>{val}</span>
}

// 產生返水群組表頭的工廠函式
export const createRebateGroup = (title: string, dataPrefix: string) => ({
  title: title,
  children: [
    {
      title: <span style={{ color: '#faad14' }}>時</span>,
      dataIndex: `${dataPrefix}_h`,
      width: 50,
      align: 'center' as const,
      render: (v: number) => renderRebateVal(v, 'h'),
    },
    {
      title: <span style={{ color: '#1890ff' }}>日</span>,
      dataIndex: `${dataPrefix}_d`,
      width: 50,
      align: 'center' as const,
      render: (v: number) => renderRebateVal(v, 'd'),
    },
    {
      title: '週',
      dataIndex: `${dataPrefix}_w`,
      width: 50,
      align: 'center' as const,
      render: (v: number) => renderRebateVal(v, 'w'),
    },
  ],
})
