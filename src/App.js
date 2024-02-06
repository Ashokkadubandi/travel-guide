import {Component} from 'react'
import Loader from 'react-loader'
import Travel from './components/Travel'
import './App.css'

const apiConstants = {
  success: 'SUCCESS',
  pending: 'PENDING',
  initial: 'INITIAL',
}

// Replace your code here
class App extends Component {
  state = {travelGuideList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getApiUrl()
  }

  getApiUrl = async () => {
    this.setState({apiStatus: apiConstants.pending})
    const options = {
      method: 'GET',
    }
    const API = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(API, options)
    if (response.ok) {
      const data = await response.json()
      const originalData = data.packages.map(each => ({
        description: each.description,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({
        travelGuideList: originalData,
        apiStatus: apiConstants.success,
      })
    }

    // console.log(originalData)
  }

  showLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={5} />
    </div>
  )

  travelGuideView = () => {
    const {travelGuideList} = this.state
    return (
      <ul className="guide-ul">
        {travelGuideList.map(each => (
          <Travel each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  runApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.travelGuideView()
      case apiConstants.pending:
        return this.showLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-guide-container">
        <h1 className="travel-guide-heading">Travel Guide</h1>
        {this.runApiStatus()}
      </div>
    )
  }
}

export default App
