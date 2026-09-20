import type { Metadata } from 'next'
import JsonTool from '@/components/utilities/json-validator/JsonTool'
import JwtDecoder from '@/components/utilities/jwt-decoder/JwtDecoder'
import MarkdownNotes from '@/components/utilities/markdown-notes/MarkdownNotes'
import UrlParser from '@/components/utilities/url-inspector/UrlParser'
import ComingSoonBody from '@/components/dashboard/ComingSoonBody'
import ToolPage from '@/components/dashboard/ToolPage'

export const metadata: Metadata = {
  title: 'Utilities and web dev'
}

export default function UtilitiesPage() {
  return (
    <ToolPage
      title="Utilities and web dev"
      description="Rapikan JSON, baca JWT, dan uji pola regex"
      tools={[
        {
          id: 'json-formatter',
          name: 'JSON formatter',
          description: 'Rapikan dan validasi struktur JSON dengan cepat.',
          component: <JsonTool />
        },
        {
          id: 'jwt-decoder',
          name: 'JWT decoder',
          description: 'Baca payload JWT tanpa melakukan verifikasi signature.',
          component: <JwtDecoder />
        },
        {
          id: 'markdown-notes',
          name: 'Markdown notes',
          description: 'Tempat sederhana untuk menulis dan mengolah catatan Markdown.',
          component: <MarkdownNotes />
        },
        {
          id: 'url-parser',
          name: 'URL parser',
          description: 'Inspect bagian-bagian sebuah URL secara lebih detail.',
          component: <UrlParser />
        },
        {
          id: 'regex-tester',
          name: 'Regex tester',
          description: 'Uji regular expression terhadap teks secara langsung.',
          component: <ComingSoonBody />
        }
      ]}
    />
  )
}
