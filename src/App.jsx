import './App.css'
import Page from './Page'
import AddtoFavProvider from './provider/AddtoFavProvider'
import WeatherProvider from './provider/WeatherProvider'
import LocationProvider from './provider/LocationProvider'

function App() {



  return (
    <LocationProvider>
      <WeatherProvider>
        <AddtoFavProvider>
          <>
            <div>
              <Page />
            </div>
          </>
        </AddtoFavProvider>
      </WeatherProvider>
    </LocationProvider>
  )
}

export default App
