import type { Metadata } from 'next'
import JsonTool from '@/components/utilities/json-validator/JsonTool'
import JwtDecoder from '@/components/utilities/jwt-decoder/JwtDecoder'
import MarkdownNotes from '@/components/utilities/markdown-notes/MarkdownNotes'
import UrlParser from '@/components/utilities/url-inspector/UrlParser'
import RegexTester from '@/components/utilities/regex-tester/RegexTester'
import CaseConverter from '@/components/utilities/case-converter/CaseConverter'
import TextDiffChecker from '@/components/utilities/text-diff/TextDiffChecker'
import CronParser from '@/components/utilities/cron-parser/CronParser'
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
          component: <RegexTester />
        },
        {
          id: 'case-converter',
          name: 'Case converter',
          description: 'Ubah teks antar format penamaan: camelCase, snake_case, dll.',
          component: <CaseConverter />
        },
        {
          id: 'text-diff-checker',
          name: 'Text diff checker',
          description: 'Bandingkan dua teks dan lihat bagian yang berbeda.',
          component: <TextDiffChecker />
        },
        {
          id: 'cron-parser',
          name: 'Cron expression parser',
          description: 'Baca ekspresi cron dalam bahasa yang mudah dipahami.',
          component: <CronParser />
        }
      ]}
    />
  )
}
