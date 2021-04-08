import NFLPlayerTable from './NFLPlayerTable'

const NFLPlayers = ({nflPlayers, loading}) => {

  if ( loading ) {
    return <h2>Loading...</h2>
  }
  
  return (
    <table>
      <NFLPlayerTable nflPlayers={nflPlayers}/>
    </table>
  )
}

export default NFLPlayers
