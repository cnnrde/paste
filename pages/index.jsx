import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Editor from '../components/Editor'

export default function Home() {
  const [editorValue, setEditorValue] = useState(`# Welcome to Paste!
Start editing by clearing this text.
Save your changes, and copy the URL.`)
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
        <Editor value={editorValue} languageState={[language, setLanguage]} />
      </main>
    </div>
  )
}
