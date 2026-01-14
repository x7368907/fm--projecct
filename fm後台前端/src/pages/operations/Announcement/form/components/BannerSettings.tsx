import { Button, Row, Col } from 'antd'
import ImageUploadBox from './ImageUploadBox'
import type { BannerImages } from '../../types'

interface BannerSettingsProps {
  bannerType: 'web' | 'mobile'
  setBannerType: (type: 'web' | 'mobile') => void
  bannerImages: BannerImages
  onUpload: (file: File, section: 'home' | 'inner', lang: string) => void
  onRemove: (section: 'home' | 'inner', lang: string) => void
}

const langs = ['繁', '簡', '英', '泰', '越']
const colors = { purple: '#8B5CF6', grayBorder: '#d9d9d9', grayText: '#666' }

export default function BannerSettings({
  bannerType,
  setBannerType,
  bannerImages,
  onUpload,
  onRemove,
}: BannerSettingsProps) {
  const renderUploadRow = (section: 'home' | 'inner', title: string) => (
    <div className="mb-6 flex">
      <div
        style={{
          width: '110px',
          minWidth: '110px',
          marginRight: 16,
          fontWeight: 500,
          color: '#333',
        }}
      >
        <div>{title}</div>
        <div className="text-xs text-gray-400">(1640*856)</div>
      </div>
      <div className="flex-1">
        <Row gutter={[12, 12]}>
          {langs.map((lang) => (
            <Col span={4} key={lang} style={{ minWidth: 100 }}>
              <ImageUploadBox
                lang={lang}
                imageUrl={bannerImages[bannerType]?.[section]?.[lang]}
                onUpload={(file) => onUpload(file, section, lang)}
                onRemove={() => onRemove(section, lang)}
              />
            </Col>
          ))}
        </Row>
        <div className="mt-2 text-xs text-gray-400">
          * 請上傳JPG、PNG格式檔案(檔案最大不超過2MB)
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="mb-4">
        <div
          className="inline-flex overflow-hidden rounded-lg border"
          style={{ borderColor: colors.purple }}
        >
          <Button
            type="text"
            style={{
              background: bannerType === 'web' ? colors.purple : 'white',
              color: bannerType === 'web' ? 'white' : colors.grayText,
              borderRadius: 0,
              height: 'auto',
              padding: '6px 16px',
              borderRight: `1px solid ${bannerType === 'web' ? colors.purple : colors.grayBorder}`,
              fontWeight: bannerType === 'web' ? 'bold' : 'normal',
            }}
            onClick={() => setBannerType('web')}
          >
            網站 Banner 設定
          </Button>
          <Button
            type="text"
            style={{
              background: bannerType === 'mobile' ? colors.purple : 'white',
              color: bannerType === 'mobile' ? 'white' : colors.grayText,
              borderRadius: 0,
              height: 'auto',
              padding: '6px 16px',
              fontWeight: bannerType === 'mobile' ? 'bold' : 'normal',
            }}
            onClick={() => setBannerType('mobile')}
          >
            手機 Banner 設定
          </Button>
        </div>
      </div>

      {renderUploadRow('home', '首頁輪播圖')}
      {renderUploadRow('inner', '活動內頁圖')}
    </>
  )
}
