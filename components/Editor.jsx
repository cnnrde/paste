import dynamic from 'next/dynamic'
const Monaco = dynamic(() => import('@monaco-editor/react'), { ssr: false })
import theme from '../public/theme.json'
import highlight from '../public/highlight.min'
import { useState } from 'react'

const defineTheme = (monaco) => {
  monaco.editor.defineTheme('theme', theme)
}

const handleEditorDidMount = (editor) => {
  window.addEventListener('resize', () => {
    editor.layout({
      width: 'auto',
      height: 'auto',
    })
  })
}

const Editor = (props) => {
  return (
    <div className='flex flex-grow'>
      <Monaco
        language={props.languageState[0]}
        value={props.value[0]}
        theme='theme'
        beforeMount={defineTheme}
        onMount={handleEditorDidMount}
        onChange={(e) => {
          const language = highlight.highlightAuto(e).language
          // i can't differentiate between the two with detection so i'm
          // going to be lazy and just assume that xml users are actually using html
          if (language == 'xml') language = 'html'
          props.languageState[1](language)
          props.value[1](e)
        }}
        options={{
          fontSize: '16px',
          readOnly: props.readOnly || false,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: true,
          'bracketPairColorization.enabled': true,
        }}
      />
    </div>
  )
}

export default Editor
