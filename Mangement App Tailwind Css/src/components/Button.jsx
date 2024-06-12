function Button({label, onClick}) {
  return (
    <button onClick={onClick} className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'>{label}</button>
  )
}

export default Button