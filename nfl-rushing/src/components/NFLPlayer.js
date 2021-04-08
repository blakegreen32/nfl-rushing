const NFLPlayer = ({nflPlayer}) => {
  return (
    <tr>
      {Object.keys(nflPlayer).map((key) => {
        return (
          <td key={key}>
            <h5>{nflPlayer[key]}</h5>
          </td>
        )
      })}
    </tr>
  )
}

export default NFLPlayer