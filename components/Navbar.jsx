import Link from 'next/link'

const Navbar = (props) => {
  const handleSave = async () => {
    const req = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({
        content: props.value,
        language: props.language,
      }),
    })
    const { id } = await req.json()
    window.location.href = id
  }
  return (
    <div className='bg-mantle flex flex-row p-2'>
      <div className='flex flex-row flex-grow items-center space-x-4'>
        <div className='p-2'>
          <Link href='/'>Paste</Link>
        </div>
        <div className='text-subtext1'>{props.language}</div>
      </div>
      <div className='flex flex-row'>
        {!props.hideButton && <button
        className='text-text bg-surface0 hover:bg-surface1 transition-colors p-2 rounded-md'
        onClick={handleSave}
      >
        Save
      </button> }
        
      </div>
    </div>
  )
}

export default Navbar
