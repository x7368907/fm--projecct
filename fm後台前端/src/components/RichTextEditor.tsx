import { CKEditor } from 'ckeditor4-react'

interface RichTextEditorProps {
  value: string
  onChange: (data: string) => void
  placeholder?: string
  height?: number | string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  height = 300, // 預設高度
}: RichTextEditorProps) {
  return (
    <div className="bg-white">
      <CKEditor
        // 指定載入最後一個免費版，避開授權檢查
        editorUrl="https://cdn.ckeditor.com/4.22.1/full/ckeditor.js"
        initData={value}
        data={value}
        // 封裝 onChange 事件，只回傳純資料字串，讓父層更乾淨
        onChange={(evt: { editor: { getData: () => any } }) => {
          const data = evt.editor.getData()
          onChange(data)
        }}
        config={{
          height: height,
          language: 'zh', // 繁體中文
          versionCheck: false, // 關閉安全性警告 (紅字)
          editorplaceholder: placeholder, // 設定 placeholder (需外掛支援，若無則忽略)

          // 完整工具列設定 (依照你的設計稿)
          toolbar: [
            {
              name: 'document',
              items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates'],
            },
            {
              name: 'clipboard',
              items: [
                'Cut',
                'Copy',
                'Paste',
                'PasteText',
                'PasteFromWord',
                '-',
                'Undo',
                'Redo',
              ],
            },
            {
              name: 'editing',
              items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
            },
            {
              name: 'insert',
              items: [
                'Image',
                'Table',
                'HorizontalRule',
                'Smiley',
                'SpecialChar',
                'PageBreak',
              ],
            },
            '/',
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
            {
              name: 'basicstyles',
              items: [
                'Bold',
                'Italic',
                'Underline',
                'Strike',
                'Subscript',
                'Superscript',
                '-',
                'RemoveFormat',
              ],
            },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            {
              name: 'paragraph',
              items: [
                'NumberedList',
                'BulletedList',
                '-',
                'Outdent',
                'Indent',
                '-',
                'Blockquote',
                'CreateDiv',
                '-',
                'JustifyLeft',
                'JustifyCenter',
                'JustifyRight',
                'JustifyBlock',
              ],
            },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
          ],
          // 確保載入常用外掛
          extraPlugins: 'justify,font,colorbutton,smiley,editorplaceholder',
        }}
      />
    </div>
  )
}
