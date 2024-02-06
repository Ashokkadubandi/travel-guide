const Travel = props => {
  const {each} = props
  const {name, imageUrl, description} = each

  return (
    <li className="tour-guide">
      <img src={imageUrl} alt={name} />
      <div className="text-container">
        <p className="tour-name">{name}</p>
        <p className="tour-desc">{description}</p>
      </div>
    </li>
  )
}

export default Travel
