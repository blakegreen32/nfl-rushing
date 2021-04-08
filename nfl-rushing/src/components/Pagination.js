const Pagination = ({ playersPerPage, totalPlayers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPlayers / playersPerPage); i++) {
    pageNumbers.push(i);
  }

  return(
    <div>
      <span>Pages:</span>
      <ul className="marginTop">
        {pageNumbers.map(number => (
          <li key={number}>
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination