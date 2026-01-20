import React from 'react'
import SimpleCalculator from './components/SimpleCalculator'
import CharacterCounterApp from './components/CharacterCounterApp'
import BackgroundGradientGenarator from './components/BackgroundGradientGenarator'
import DigitalClock from './components/DigitalClock'
import SearchAndFilterInput from './components/SearchAndFilterInput'
import NoteApp from './components/NoteApp'
import Posts from './apiFetching/components/Posts'
import Weather from './weatherApp/Weather'

const App = () => {
  return (
    <div>
      {/* <CharacterCounterApp/>
      <SimpleCalculator /> */}
      {/* <BackgroundGradientGenarator/> */}
      {/* <DigitalClock/> */}
      {/* <SearchAndFilterInput/> */}
      {/* <NoteApp/> */}
      {/* <Posts/> */}
      <Weather/>
    </div>
  )
}

export default App
