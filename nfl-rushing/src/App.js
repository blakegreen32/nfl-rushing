import { useState, useEffect } from 'react'
import NFLPlayers from './components/NFLPlayers'
import Pagination from './components/Pagination'
import SearchBox from './components/SearchBox'

const App = () => {
  const [nflPlayers, setNflPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [playersPerPage] = useState(500)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const getNflPlayers = async () => {
      const nflPlayersFromServer = await fetchNflPlayers()
      setNflPlayers(nflPlayersFromServer)
      setLoading(false)
    }

    getNflPlayers() 
  }, [])

  // Fetch Tasks
  const fetchNflPlayers = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:5000/nflPlayers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const data = await res.json()
    return data 
  }

  function filterNflPlayers(nflPlayers) {
    return nflPlayers.filter((val) => val.Player.toLowerCase().includes(searchTerm.toString().toLowerCase()))
  }

  function convertArrayToCSV( args ) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if ( data == null || ! data.length ) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function exportCsv(nflPlayers) {
    var data, filename, link;
    var csv = convertArrayToCSV({
      data: nflPlayers
    });

    if (csv == null) return;
    filename = nflPlayers.filename || 'nfl_players.csv';

    if ( !csv.match(/^data:text\/csv/i )) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = nflPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <h1>NFL Player Statistics</h1>
      <SearchBox placeholder="Search Players..." handleChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick= {() => exportCsv(filterNflPlayers(currentPlayers))}>Export CSV</button>
      <Pagination playersPerPage={playersPerPage} totalPlayers={nflPlayers.length} paginate={paginate} />
      {nflPlayers.length > 0 ? (
        <NFLPlayers nflPlayers={filterNflPlayers(currentPlayers)} loading={loading}/>
      ):<div className="marginTop">No NFL Players</div>}
    </div>
  )
}

export default App