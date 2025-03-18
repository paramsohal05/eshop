

const Label = ({title, htmlFor}:{title:string; htmlFor?:string}) => {
  return (
    <label htmlFor={htmlFor}
      className='text-white text-sm font-medium block'>
      {title}
    </label>
  )
}

export default Label