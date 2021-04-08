import {useState} from 'react'
import NFLPlayer from './NFLPlayer'

const NFLPlayerTable = ({nflPlayers}) => {
  const [sortState, setSortState] = useState('default')

  function parseValue(val1, val2, replace, key) {
    var value1 = val1[key];
    var value2 = val2[key];
    if ( typeof value1 === 'string' ) value1 = parseInt(value1.replace(replace, ''));
    if ( typeof value2 === 'string' ) value2 = parseInt(value2.replace(replace, ''));
    return value1 - value2;
  }

  const sortTypes = {
    YdsUp: {
      class: 'yds-up',
      fn: function(a, b) {
        return parseValue(a, b, ',', 'Yds')
      } 
    },
    YdsDown: {
      class: 'yds-down',
      fn: function(a, b) {
        return parseValue(b, a, ',', 'Yds')
      } 
    },
    LngUp: {
      class: 'lng-up',
      fn: function (a, b) {
        return parseValue(a, b, 'T', 'Lng')
      }
    },
    LngDown: {
      class: 'lng-down',
      fn: function (a, b) {
        return parseValue(b, a, 'T', 'Lng')
      }
    },
    TDUp: {
      class: 'td-up',
      fn: (a, b) => a.TD - b.TD
    },
    TDDown: {
      class: 'td-down',
      fn: (a, b) => b.TD - a.TD
    },
    default: {
      class: 'sort',
      fn: (a,b) => a
    }
  }

  function isSort(key) {
    return ( key === 'Yds' || key === 'Lng' || key === 'TD' )
  }

  function onSortChange(key) {
    if ( isSort(key) ) {
      let nextSort;
  
      if ( sortState === key + 'Down' ) nextSort = key + 'Up'
      else if ( sortState === key + 'Up' ) nextSort = key + 'Down'
      else if ( sortState === 'default' ) nextSort = key + 'Down'
      else { nextSort = key + 'Up' }
  
      setSortState(nextSort)
    }
  }

  return (
    <>
      <thead>
        <tr>
          {nflPlayers.length > 0 ? (
              Object.keys(nflPlayers[0]).map((key) => {
                return (
                  <th key={key}>
                    <p onClick={()=>onSortChange(key)}>{isSort(key)?'\u2B0D':''}</p>
                    <h3>{key}</h3>
                  </th>
                )
              })
          ):<td className="empty">No Matches</td>}
        </tr>
      </thead>
      <tbody>
        {nflPlayers.sort(sortTypes[sortState].fn).map((nflPlayer, index) => (
          <NFLPlayer key={index} nflPlayer={nflPlayer} />
        ))}
      </tbody>
    </>
  )
}

export default NFLPlayerTable