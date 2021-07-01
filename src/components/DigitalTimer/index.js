import {Component} from 'react'
import './index.css'

const playUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseUrl = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInMin: 25,
    timeElapsedInSec: 0,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  onResetTimer = () => {
    this.setState({
      isTimerRunning: false,
      timeElapsedInMin: 25,
      timeElapsedInSec: 0,
    })
    clearInterval(this.timerId)
  }

  increaseTimer = () => {
    this.setState(prevState => ({
      timeElapsedInMin: prevState.timeElapsedInMin + 1,
    }))
  }

  decreaseTimer = () => {
    const {timeElapsedInMin} = this.state
    if (timeElapsedInMin > 1) {
      this.setState(prevState => ({
        timeElapsedInMin: prevState.timeElapsedInMin - 1,
      }))
    }
  }

  incrementTimeElapsedInSec = () => {
    const {timeElapsedInMin, timeElapsedInSec} = this.state
    const isTimerCompleted = timeElapsedInSec === timeElapsedInMin * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSec: prevState.timeElapsedInSec + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {isTimerRunning, timeElapsedInSec, timeElapsedInMin} = this.state
    const isTimerCompleted = timeElapsedInSec === timeElapsedInMin * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSec: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeElapsedInSec, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderControllerContainer = () => {
    const {timeElapsedInMin, timeElapsedInSec, isTimerRunning} = this.state
    const isButtonsDisabled = timeElapsedInSec > 0
    const imgUrl = isTimerRunning ? pauseUrl : playUrl
    const altText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <>
        <div className="start-stop-reset-container">
          <div>
            <button
              onClick={this.onClickStartOrPause}
              className="pause-play-reset-btn settings-container"
              type="button"
            >
              <img className="pause-play-rest-img" alt={altText} src={imgUrl} />
              <p className="timer-controller-label">
                {isTimerRunning ? 'Pause' : 'Start'}
              </p>
            </button>
          </div>
          <div>
            <button
              onClick={this.onResetTimer}
              className="pause-play-reset-btn settings-container"
              type="button"
            >
              <img
                className="pause-play-rest-img"
                alt="reset icon"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              />
              <p className="timer-controller-label">reset</p>
            </button>
          </div>
        </div>

        <div className="timer-limit-container">
          <p className="timer-limit-heading">Set Timer limit</p>
          <div className="limit-counter-container">
            <button
              className="counter-btn"
              disabled={isButtonsDisabled}
              onClick={this.decreaseTimer}
              type="button"
            >
              -
            </button>
            <p className="limit-count">{timeElapsedInMin}</p>
            <button
              className="counter-btn"
              disabled={isButtonsDisabled}
              onClick={this.increaseTimer}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </>
    )
  }

  renderSeconds = () => {
    const {timeElapsedInSec, timeElapsedInMin} = this.state
    const totalRemainingSec = timeElapsedInMin * 60 - timeElapsedInSec
    const seconds = Math.floor(totalRemainingSec % 60)
    const sec = seconds < 10 ? `0${seconds}` : seconds
    return sec
  }

  renderMinutes = () => {
    const {timeElapsedInMin, timeElapsedInSec} = this.state
    const totalRemainingSec = timeElapsedInMin * 60 - timeElapsedInSec
    const minutes = Math.floor(totalRemainingSec / 60)

    const min = minutes < 10 ? `0${minutes}` : minutes
    return min
  }

  renderTimer = () => {
    const {isTimerRunning} = this.state

    const time = `${this.renderMinutes()}:${this.renderSeconds()}`
    return (
      <div className="time-container">
        <h1 className="timer" testid="timer">
          {time}
        </h1>
        <p className="timer-label">{isTimerRunning ? 'Running' : 'Paused'}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="clock-bg-img-container">{this.renderTimer()}</div>
          <div className="controller-container">
            {this.renderControllerContainer()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
