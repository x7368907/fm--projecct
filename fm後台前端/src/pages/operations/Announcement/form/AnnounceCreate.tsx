import {
  Form,
  Button,
  Select,
  DatePicker,
  Input,
  Space,
  Typography,
} from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import RichTextEditor from '../../../../components/RichTextEditor' // 請確認路徑

// 引入拆分的模組
import { useAnnounceForm } from '../hook/useAnnounceForm'
import type { TabType } from '../types'
import BannerSettings from './components/BannerSettings'
import RankSettings from './components/RankSettings'
import LossReportSettings from './components/LossReportSettings'
import SignInSettings from './components/SignInSettings'

const { Title } = Typography
const { RangePicker } = DatePicker

const colors = {
  purple: '#8B5CF6',
  grayText: '#666',
  grayBorder: '#d9d9d9',
  red: '#FF4d4F',
  green: '#52C41A',
}
const langs = ['繁', '簡', '英', '泰', '越']

interface AnnounceCreateProps {
  onCancel: () => void
  onSave: () => void
  initialValues?: any
  defaultTab?: TabType
}

export default function AnnounceCreate({
  onCancel,
  onSave,
  initialValues,
  defaultTab = 'activity',
}: AnnounceCreateProps) {
  // 使用 Hook 取得所有邏輯
  const {
    form,
    activityType,
    category,
    activeTab,
    setActiveTab,
    // Banner
    bannerType,
    setBannerType,
    bannerImages,
    handleImageUpload,
    handleRemoveImage,
    // Languages
    currentNameLang,
    setCurrentNameLang,
    currentContentLang,
    setCurrentContentLang,
    titles,
    setTitles,
    contents,
    setContents,
    // Settings
    rankRows,
    addRankRow,
    removeRankRow,
    settlementType,
    setSettlementType,
    lossReportRows,
    addLossRow,
    removeLossRow,
    lossResetType,
    setLossResetType,
    // Submit
    submit,
  } = useAnnounceForm(initialValues, defaultTab, onSave)

  const isSimplifiedMode = activeTab === 'system' || activeTab === 'game'
  const showRankSettings =
    !isSimplifiedMode && activityType === '系統機制' && category === '排行活動'
  const showSignInSettings =
    !isSimplifiedMode && activityType === '系統機制' && category === '簽到活動'
  const showLossReportSettings =
    !isSimplifiedMode &&
    activityType === '系統機制' &&
    category === '贏分金額加贈金活動'

  const LABEL_WIDTH = '110px'
  const labelStyle = {
    width: LABEL_WIDTH,
    textAlign: 'left' as const,
    fontWeight: 500,
    color: '#333',
  }

  const getLangButtonStyle = (lang: string, currentLang: string) => ({
    border: `1px solid ${lang === currentLang ? colors.purple : colors.grayBorder}`,
    backgroundColor: lang === currentLang ? '#F3E8FF' : 'white',
    color: lang === currentLang ? colors.purple : colors.grayText,
    fontWeight: lang === currentLang ? 'bold' : ('normal' as const),
  })

  const getCategoryOptions = () => {
    if (activityType === '系統機制') {
      return [
        { label: '簽到活動', value: '簽到活動' },
        { label: '排行活動', value: '排行活動' },
        { label: '贏分金額加贈金活動', value: '贏分金額加贈金活動' },
        { label: '儲值活動', value: '儲值活動' },
      ]
    }
    return [
      { label: '儲值禮', value: '儲值禮' },
      { label: '註冊禮', value: '註冊禮' },
      { label: 'VIP禮包', value: 'VIP禮包' },
      { label: '救援金', value: '救援金' },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4 text-sm text-gray-500">
        營運管理 &gt; 公告管理 &gt;{' '}
        <span className="font-bold text-gray-800">
          {initialValues ? '編輯公告' : '新增公告'}
        </span>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <Title level={4} style={{ marginBottom: 16 }}>
          {initialValues ? '編輯公告' : '新增公告'}
        </Title>
        <div
          style={{ borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}
        ></div>

        {/* Tab 切換 */}
        <div className="mb-6">
          <div className="mb-4 font-bold text-gray-700">活動公告設定</div>
          <Space size={16}>
            {['活動', '系統', '遊戲'].map((type) => {
              const mapKey =
                type === '活動'
                  ? 'activity'
                  : type === '系統'
                    ? 'system'
                    : 'game'
              const isActive = activeTab === mapKey
              return (
                <Button
                  key={type}
                  onClick={() => setActiveTab(mapKey as TabType)}
                  style={{
                    width: 100,
                    background: isActive ? colors.purple : '#fff',
                    color: isActive ? '#fff' : colors.grayText,
                    borderColor: isActive ? colors.purple : colors.grayBorder,
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                >
                  {type}
                </Button>
              )
            })}
          </Space>
        </div>
        <div
          style={{ borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}
        ></div>

        <Form
          form={form}
          layout="horizontal"
          labelCol={{ flex: LABEL_WIDTH }}
          wrapperCol={{ flex: 1 }}
          labelAlign="left"
        >
          {!isSimplifiedMode && (
            <>
              <Form.Item label="活動類型" name="activityType">
                <Select
                  style={{ maxWidth: 400 }}
                  onChange={() => form.setFieldsValue({ category: null })}
                >
                  <Select.Option value="人工審核">人工審核</Select.Option>
                  <Select.Option value="系統機制">系統機制</Select.Option>
                  <Select.Option value="自動派發">自動派發</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="活動類別" name="category">
                <Select
                  style={{ maxWidth: 400 }}
                  options={getCategoryOptions()}
                  placeholder="請選擇"
                />
              </Form.Item>
              <Form.Item label="活動種類" name="type">
                <Select style={{ maxWidth: 400 }}>
                  <Select.Option value="儲值禮">儲值禮</Select.Option>
                  <Select.Option value="紅利贈送">紅利贈送</Select.Option>
                  <Select.Option value="實體獎品">實體獎品</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}

          {/* 活動名稱 */}
          <div className="mb-6 flex">
            <div
              style={{
                ...labelStyle,
                paddingTop: 4,
                width: LABEL_WIDTH,
                minWidth: LABEL_WIDTH,
                marginRight: 16,
              }}
            >
              活動公告名稱
            </div>
            <div className="max-w-[600px] flex-1">
              <div className="mb-2 flex gap-2">
                {langs.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => setCurrentNameLang(lang)}
                    className="cursor-pointer rounded px-3 py-1 text-sm transition-all"
                    style={getLangButtonStyle(lang, currentNameLang)}
                  >
                    {lang}
                  </div>
                ))}
              </div>
              <Input
                placeholder={`請輸入${currentNameLang}體公告名稱`}
                value={titles[currentNameLang]}
                onChange={(e) =>
                  setTitles((p) => ({
                    ...p,
                    [currentNameLang]: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <Form.Item
            label="公告時間"
            style={{ maxWidth: 510 }}
            name="announceTime"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="活動期限"
            style={{ maxWidth: 510 }}
            name="activityRange"
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          {!isSimplifiedMode && (
            <Form.Item label="活動排序" style={{ maxWidth: 510 }} name="sort">
              <Input type="number" />
            </Form.Item>
          )}

          {/* 活動內文 */}
          <div className="mb-6 flex">
            <div
              style={{
                ...labelStyle,
                paddingTop: 4,
                width: LABEL_WIDTH,
                minWidth: LABEL_WIDTH,
                marginRight: 16,
              }}
            >
              活動內文
            </div>
            <div className="max-w-[900px] flex-1">
              <div className="mb-2 flex gap-2">
                {langs.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => setCurrentContentLang(lang)}
                    className="cursor-pointer rounded px-3 py-1 text-sm transition-all"
                    style={getLangButtonStyle(lang, currentContentLang)}
                  >
                    {lang}
                  </div>
                ))}
              </div>
              <RichTextEditor
                value={contents[currentContentLang]}
                onChange={(newHtml) =>
                  setContents((p) => ({ ...p, [currentContentLang]: newHtml }))
                }
                placeholder={`請輸入${currentContentLang}體活動內文...`}
                height={350}
              />
            </div>
          </div>

          {/* 特殊設定區塊 */}
          {showRankSettings && (
            <RankSettings
              rankRows={rankRows}
              addRankRow={addRankRow}
              removeRankRow={removeRankRow}
              settlementType={settlementType}
              setSettlementType={setSettlementType}
            />
          )}
          {showLossReportSettings && (
            <LossReportSettings
              lossReportRows={lossReportRows}
              addLossRow={addLossRow}
              removeLossRow={removeLossRow}
              lossResetType={lossResetType}
              setLossResetType={setLossResetType}
            />
          )}
          {showSignInSettings && <SignInSettings />}

          <div
            style={{ borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}
          ></div>

          {/* Banner 設定 */}
          {!isSimplifiedMode && (
            <BannerSettings
              bannerType={bannerType}
              setBannerType={setBannerType}
              bannerImages={bannerImages}
              onUpload={handleImageUpload}
              onRemove={handleRemoveImage}
            />
          )}
        </Form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-300 bg-gray-100 py-4">
        <Button
          size="large"
          style={{
            width: 120,
            borderColor: colors.red,
            color: colors.red,
            background: '#fff',
          }}
          icon={<CloseOutlined />}
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          size="large"
          type="primary"
          style={{
            width: 120,
            background: colors.green,
            borderColor: colors.green,
          }}
          icon={<SaveOutlined />}
          onClick={submit}
        >
          儲存
        </Button>
      </div>
      <div style={{ height: 80 }}></div>
    </div>
  )
}
