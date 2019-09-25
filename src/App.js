import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getInitialLevelColors,
  getNextColor,
  goToNextLevel,
  incrementGameScore
} from "../src/actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";


// React Class Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_colors: [],
      unshuffled_colors: [],
      expectedAnswer: [],
      answer_array: [],
      count: 0,
      start: false,
      message: ""
    };
  }

  // Component Did Mount Lifecycle Method
  // Gets Initial Colors and loads it onto the UI
  async componentDidMount() {
    await this.props.getInitialLevelColors();
    this.setState({ current_colors: [...this.props.colors] });
    this.setState({ unshuffled_colors: [...this.state.current_colors] });
  }

  // Component Will Unmount Lifecycle method
  // Clears the set Interval
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Creates Buttons dynamically from the redux state
  createButtons = colors => {
    return colors.map((item, index) => (
      <Col className="button-col-style" lg={6} md={6} sm={6} xs={6}>
        <Button
          key={index}
          value={item}
          onClick={this.handleColorButtonClick}
          className="button-styling"
          style={{ backgroundColor: item }}
        ></Button>
      </Col>
    ));
  };

  // Gets triggered when user clicks Start button
  startGame = () => {
    this.setState({ expectedAnswer: [], answer_array: [], message: "" });
    let arrayToShuffle = [...this.props.colors];
    let sa = this.shuffleColorArr(arrayToShuffle);
    this.setState({ expectedAnswer: [...sa] });
    var colorBox = document.getElementsByClassName("color-box");
    this.interval = setInterval(() => {
      if (this.state.count >= arrayToShuffle.length) {
        this.setState({ count: 0 });
        colorBox[0].style.backgroundColor = "white";
        clearInterval(this.interval);
      } else {
        colorBox[0].style.backgroundColor = sa[this.state.count];
        this.setState({ count: this.state.count + 1 });
      }
    }, 1000);
  };

  // Gets triggered when user clicks next game
  nextGame = async () => {
    await this.props.goToNextLevel();
    await this.props.getNextColor();
  };

  // Shuffles the colors ever time "Start" button is clicked
  shuffleColorArr = colors => {
    var currentIndex = colors.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = colors[currentIndex];
      colors[currentIndex] = colors[randomIndex];
      colors[randomIndex] = temporaryValue;
    }
    return colors;
  };

  // Collects the answer input from the user and compares with expected response
  handleColorButtonClick = async event => {
    let joined = this.state.answer_array.concat(
      event.target.value.toLowerCase()
    );
    this.setState({ answer_array: joined });
    if (joined.length === this.state.expectedAnswer.length) {
      this.setState({ answer_array: [] });
      if (
        JSON.stringify(joined) === JSON.stringify(this.state.expectedAnswer)
      ) {
        await this.props.incrementGameScore(this.props.level.level);
        this.setState({
          message:
            "Congratulation!!! You've earned " +
            this.props.score.score +
            " points"
        });
      } else {
        this.setState({ message: "Oho!! You missed it this time" });
      }
    }
  };

  // Render Life cycle method
  render() {
    let buttons = this.createButtons(this.props.colors);
    return (
      <div className="App">
        {/* Header Component */}
        <div className="main-header">
          <header>
            <h1 className="app-header">Color Picker</h1>
          </header>
          <div className="score">Score: {this.props.score.score}</div>
          <div className="level">Level: {this.props.level.level}</div>
        </div>
        <br />
        <br />

        {/* Body */}
        <div>
          <Container className="ctr">
            <Row>
              <Col lg={6} md={12} sm={12} xs={12}>
                <div className="color-box-container">
                  <div className="color-box"></div>
                  <div>{this.state.message}</div>
                </div>
              </Col>
              <Col lg={6} md={12} sm={12} xs={12}>
                <div id="myDiv" className="button-box-container">
                  <div className="button-box">
                    <Row className="rowStyles">{buttons}</Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          {/* Color Box */}

          {/* Start and Score Section */}
          <div className="start-score">
            <Button className="start-button" onClick={this.startGame}>
              Start
            </Button>
            <Button className="start-button" onClick={this.nextGame}>
              Next
            </Button>
          </div>
        </div>

        {/* Footer */}
      </div>
    );
  }
}

// Maps the Redux state to props
function mapStateToProps(state) {
  return {
    colors: state.colors,
    score: state.score,
    level: state.level
  };
}

// Maps the Action dispatchers to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getInitialLevelColors, getNextColor, goToNextLevel, incrementGameScore },
    dispatch
  );
}

// Connect to global state
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
