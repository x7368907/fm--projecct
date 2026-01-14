interface StepCategoryProps {
  selectedCategory: string
  onSelect: (category: string) => void
}

export default function StepCategory({
  selectedCategory,
  onSelect,
}: StepCategoryProps) {
  const categories = ['紅包', '優惠', '特權']

  return (
    <div className="h-full border-r border-gray-300 bg-gray-50">
      <div className="border-b border-gray-300 bg-gray-200 p-2 text-center text-xs font-bold text-gray-600">
        [Step1]
        <br />
        選擇優惠類別
      </div>
      <div>
        {categories.map((item) => {
          const isActive = selectedCategory === item
          return (
            <div
              key={item}
              onClick={() => onSelect(item)}
              className={`cursor-pointer border-b border-gray-200 px-2 py-4 text-center transition-all ${
                isActive
                  ? 'border-l-[3px] border-l-blue-500 bg-white font-bold text-blue-500'
                  : 'border-l-[3px] border-l-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}
