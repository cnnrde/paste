import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Editor from '../components/Editor'
import { useRouter } from 'next/router'

const getPaste = async (id) => {
  const req = await fetch(`/api/get`, {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  })
  if (req.status == 404) {
    window.location.href = '/'
  }
  const { content, language } = await req.json()
  return { content, language }
}

export default function Home() {
  const router = useRouter()
  const [editorValue, setEditorValue] = useState('')
  const { id } = router.query
  useEffect(() => {
    if (id) {
      getPaste(id).then(({ content, language }) => {
        setEditorValue(content)
        setLanguage(language)
      })
    }
  })
  const [language, setLanguage] = useState('markdown')
  return (
    <div className='bg-base text-text'>
      <Head>
        <title>paste</title>
        <meta name='description' content='Yet another pastebin clone' />
        <meta name='theme-color' content='#1e1e2d' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-screen flex flex-col'>
        <Navbar value={editorValue} language={language} />
        <Editor
          value={[editorValue, setEditorValue]}
          languageState={[language, setLanguage]}
          readOnly={true}
        />
      </main>
    </div>
  )
}
