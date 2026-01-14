import { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import dayjs from 'dayjs'
import type { TabType, BannerImages } from '../types'

// Helper: 轉 Base64
const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const useAnnounceForm = (
  initialValues: any,
  defaultTab: TabType,
  onSave: () => void
) => {
  const [form] = Form.useForm()

  // 監聽表單欄位以控制顯示邏輯
  const activityType = Form.useWatch('activityType', form)
  const category = Form.useWatch('category', form)

  // UI 狀態
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab)
  const [bannerType, setBannerType] = useState<'web' | 'mobile'>('web')

  // 多語系狀態
  const [currentNameLang, setCurrentNameLang] = useState('繁')
  const [currentContentLang, setCurrentContentLang] = useState('繁')
  const [titles, setTitles] = useState<Record<string, string>>({
    繁: '',
    簡: '',
    英: '',
    泰: '',
    越: '',
  })
  const [contents, setContents] = useState<Record<string, string>>({
    繁: '',
    簡: '',
    英: '',
    泰: '',
    越: '',
  })

  // 圖片狀態
  const [bannerImages, setBannerImages] = useState<BannerImages>({
    web: { home: {}, inner: {} },
    mobile: { home: {}, inner: {} },
  })

  // 特殊設定狀態 (Rank, Loss)
  const [rankRows, setRankRows] = useState<number[]>([1, 2, 3, 4])
  const [lossReportRows, setLossReportRows] = useState<number[]>([1, 2, 3])
  const [settlementType, setSettlementType] = useState<'daily' | 'weekly'>(
    'daily'
  )
  const [lossResetType, setLossResetType] = useState<'daily' | 'weekly'>(
    'daily'
  )

  // 初始化邏輯
  useEffect(() => {
    if (initialValues) {
      // 回填表單
      form.setFieldsValue({
        activityType: initialValues.activityType,
        category: initialValues.category,
        type: initialValues.type,
        announceTime: initialValues.announceTime
          ? dayjs(initialValues.announceTime)
          : null,
        activityRange:
          initialValues.startTime && initialValues.endTime
            ? [dayjs(initialValues.startTime), dayjs(initialValues.endTime)]
            : [],
        sort: initialValues.sort || 0,
        status: initialValues.status === '進行中' ? '启用' : '停用',
        // 回填特殊設定
        rankDisplayLimit: initialValues.rankDisplayLimit || '3',
        betThreshold: initialValues.betThreshold,
        bonusFund: initialValues.bonusFund,
      })

      // 回填多語系標題
      if (initialValues.names) {
        setTitles((prev) => ({ ...prev, ...initialValues.names }))
      } else if (initialValues.name) {
        setTitles((prev) => ({ ...prev, 繁: initialValues.name }))
      }

      // 決定 Tab
      if (initialValues.activityType === '遊戲公告') setActiveTab('game')
      else if (
        initialValues.activityType === '系統公告' ||
        initialValues.activityType === '系統機制'
      )
        setActiveTab('system')
      else setActiveTab('activity')

      // 回填其他狀態
      if (initialValues.settlementType)
        setSettlementType(initialValues.settlementType)
      if (initialValues.lossResetType)
        setLossResetType(initialValues.lossResetType)

      // 注意：這裡省略了 contents 和 bannerImages 的回填邏輯，
      // 若真實 API 有回傳這些結構，需在此處 setContents 和 setBannerImages
    } else {
      // 新增模式：重置與預設值
      form.resetFields()
      setActiveTab(defaultTab)

      if (defaultTab === 'system') {
        form.setFieldsValue({ activityType: '系統機制', status: '启用' })
      } else if (defaultTab === 'game') {
        form.setFieldsValue({ activityType: '遊戲公告', status: '启用' })
      } else {
        form.setFieldsValue({
          activityType: '人工審核',
          category: '儲值禮',
          type: '儲值禮',
          status: '启用',
        })
      }

      setTitles({ 繁: '', 簡: '', 英: '', 泰: '', 越: '' })
      setContents({ 繁: '', 簡: '', 英: '', 泰: '', 越: '' })
      setBannerImages({
        web: { home: {}, inner: {} },
        mobile: { home: {}, inner: {} },
      })
      setSettlementType('daily')
      setLossReportRows([1, 2, 3])
      setLossResetType('daily')
    }
  }, [initialValues, form, defaultTab])

  // 圖片上傳處理
  const handleImageUpload = async (
    file: File,
    section: 'home' | 'inner',
    lang: string
  ) => {
    try {
      const base64Url = await getBase64(file)
      setBannerImages((prev) => ({
        ...prev,
        [bannerType]: {
          ...prev[bannerType],
          [section]: { ...prev[bannerType][section], [lang]: base64Url },
        },
      }))
      message.success('圖片已選取')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      message.error('圖片讀取失敗')
    }
  }

  const handleRemoveImage = (section: 'home' | 'inner', lang: string) => {
    setBannerImages((prev) => {
      const newState = { ...prev }
      if (newState[bannerType][section][lang]) {
        delete newState[bannerType][section][lang]
      }
      return { ...newState }
    })
  }

  // Row 操作
  const addRankRow = () => setRankRows((prev) => [...prev, prev.length + 1])
  const removeRankRow = () => {
    if (rankRows.length > 1) setRankRows((prev) => prev.slice(0, -1))
  }

  const addLossRow = () =>
    setLossReportRows((prev) => [...prev, prev.length + 1])
  const removeLossRow = (indexToRemove: number) => {
    if (indexToRemove >= 3) {
      setLossReportRows((prev) =>
        prev.filter((_, idx) => idx !== indexToRemove)
      )
    }
  }

  // 送出表單
  const submit = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        ...values,
        titles,
        contents,
        bannerImages,
        settlementType,
        lossResetType,
        announceTime: values.announceTime?.format('YYYY-MM-DD HH:mm:ss'),
        startTime: values.activityRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
        endTime: values.activityRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log('Payload:', payload)
      onSave()
    } catch (error) {
      console.log('Validate Failed:', error)
    }
  }

  return {
    form,
    activityType,
    category,
    activeTab,
    setActiveTab,
    bannerType,
    setBannerType,
    currentNameLang,
    setCurrentNameLang,
    currentContentLang,
    setCurrentContentLang,
    titles,
    setTitles,
    contents,
    setContents,
    bannerImages,
    handleImageUpload,
    handleRemoveImage,
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
    submit,
  }
}
