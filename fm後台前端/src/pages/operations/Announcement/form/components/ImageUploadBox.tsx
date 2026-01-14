import { Upload, Button, message } from 'antd'
import {
  UploadOutlined,
  DeleteOutlined,
  PictureOutlined,
} from '@ant-design/icons'

interface ImageUploadBoxProps {
  lang: string
  imageUrl?: string
  onUpload: (file: File) => void
  onRemove: () => void
}

export default function ImageUploadBox({
  lang,
  imageUrl,
  onUpload,
  onRemove,
}: ImageUploadBoxProps) {
  const handleBeforeUpload = async (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上傳 JPG/PNG 檔案!')
      return Upload.LIST_IGNORE
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('圖片必須小於 2MB!')
      return Upload.LIST_IGNORE
    }
    onUpload(file)
    return false
  }

  return (
    <div
      className="group relative flex flex-col items-center overflow-hidden rounded border border-gray-300 bg-white"
      style={{ width: '100%' }}
    >
      <div className="w-full border-b border-gray-300 bg-gray-100 py-1 text-center text-sm font-medium text-gray-600">
        {lang}
      </div>
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden bg-slate-50">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="banner"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 hidden items-center justify-center bg-black/50 transition-all group-hover:flex">
              <Button
                type="text"
                danger
                icon={
                  <DeleteOutlined style={{ fontSize: 18, color: '#fff' }} />
                }
                onClick={onRemove}
              />
            </div>
          </>
        ) : (
          <PictureOutlined style={{ fontSize: '32px', color: '#cbd5e1' }} />
        )}
      </div>
      <div className="w-full p-2">
        <Upload
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
          accept=".jpg,.png"
        >
          <Button type="primary" size="small" block icon={<UploadOutlined />}>
            {imageUrl ? '更換' : '上傳'}
          </Button>
        </Upload>
      </div>
    </div>
  )
}
