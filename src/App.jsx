import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFreeCodeCamp,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

// create array of sound objects and properties to be later passed down to buttons and keys

const sounds = [
  {
    code: 81,
    key: "Q",
    name: "Medium Tom Drum Hit 4A",
    src: "https://www.fesliyanstudios.com/play-mp3/6724",
  },
  {
    code: 87,
    key: "W",
    name: "Medium Tom Drum Hit 7B",
    src: "https://www.fesliyanstudios.com/play-mp3/6730",
  },
  {
    code: 69,
    key: "E",
    name: "Floor Tom Drum Hit 7B",
    src: "https://www.fesliyanstudios.com/play-mp3/6697",
  },
  {
    code: 65,
    key: "A",
    name: "Hi Hat Open Hit C3",
    src: "https://www.fesliyanstudios.com/play-mp3/6716",
  },
  {
    code: 83,
    key: "S",
    name: "Ride Cymbal Metal Slide Scrape G",
    src: "https://www.fesliyanstudios.com/play-mp3/6750",
  },
  {
    code: 68,
    key: "D",
    name: "Ride Cymbal Bell Hit B",
    src: "https://www.fesliyanstudios.com/play-mp3/6732",
  },
  {
    code: 90,
    key: "Z",
    name: "Drum Sticks Hit A",
    src: "https://www.fesliyanstudios.com/play-mp3/6677",
  },
  {
    code: 88,
    key: "X",
    name: "Drum Sticks Hit D",
    src: "https://www.fesliyanstudios.com/play-mp3/6680",
  },
  {
    code: 67,
    key: "C",
    name: "Drum Sticks Hit G",
    src: "https://www.fesliyanstudios.com/play-mp3/6683",
  },
];

// style buttons, one for standard, one for pressed

const standardButton = {
  minWidth: "100px",
  minHeight: "75px",
  border: "1px solid black",
  borderRadius: "1rem",
  backgroundColor: "black",
  color: "white",
  fontSize: "2rem",
  margin: "1rem",
  boxShadow: "0 3px 10px red",
};

const pressedButton = {
  width: "100px",
  height: "75px",
  border: "1px solid black",
  borderRadius: "1rem",
  backgroundColor: "black",
  color: "red",
  fontSize: "2rem",
  margin: "1rem",
  boxShadow: "0 3px 50px red",
};

class Drums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStyle: standardButton,
    };

    this.handleBeatSounds = this.handleBeatSounds.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document
      .getElementById(this.props.name)
      .addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("click", this.handleClick);
  }

  handleKeyPress(event) {
    if (event.keyCode === this.props.code) {
      this.handleBeatSounds();
      this.updateDisplay();
    }
  }

  handleBeatSounds() {
    const sound = document.getElementById(this.props.keys);
    sound.currentTime = 0;
    sound.play();
    this.setState({ buttonStyle: pressedButton });
    setTimeout(() => this.setState({ buttonStyle: standardButton }), 200);
  }

  updateDisplay() {
    this.props.func(this.props.name);
  }

  handleClick() {
    const sound = document.getElementById(this.props.keys);
    sound.currentTime = 0;
    sound.play();
    this.setState({ buttonStyle: pressedButton });
    setTimeout(() => this.setState({ buttonStyle: standardButton }), 200);
  }

  render() {
    return (
      <div className={this.props.className}>
        <button
          className="drum-pad"
          id={this.props.name}
          onClick={() => this.props.func(this.props.name)}
          style={this.state.buttonStyle}
        >
          <audio
            src={this.props.src}
            id={this.props.keys}
            className="clip"
          ></audio>
          {this.props.keys}
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "_______",
    };

    this.displayHandler = this.displayHandler.bind(this);
  }

  // create function to update display of beat names in the state and pass down function to Drums class component as property to be used to pass names up to DrumMachine component

  displayHandler(newString) {
    this.setState({
      display: newString,
    });
  }

  render() {
    // use map function to pass down properties from sounds array objects to Drums component, replicating the component as necessary, and then storing the html code in the variable individualDrums

    let individualDrums = sounds.map((i, index) => {
      return (
        <Drums
          key={index}
          keys={i.key}
          src={i.src}
          code={i.code}
          name={i.name}
          func={this.displayHandler}
          className="col-4"
        />
      );
    });

    return (
      <div>
        <div id="drum-machine" className="row">
          <h1 id="machine-name">Drum Time</h1>
          <p id="display">
            <strong>
              <u>Beat:</u>{" "}
            </strong>
            {this.state.display}
          </p>
          {individualDrums}
        </div>
        <div>
        <p style={{ fontFamily: "Verdana", fontSize: "0.8rem", color: "white", textAlign: "center" }}>
          Drum sounds from{" "}
          <a href="https://www.fesliyanstudios.com/" target="_blank">
            Fesliyan Studios
          </a>
          .
        </p>
        <p id="designer">developed by Scott Mitchell</p>
        </div>
        <div id="contact-block">
          <a href="https://github.com/scott-a-m" target="_blank">
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
          <a
            href="https://twitter.com/_scott_a_m"
            target="_blank"
            rel="noreferrrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
          <a href="https://www.freecodecamp.org/scott-a-m" target="_blank">
            <FontAwesomeIcon
              icon={faFreeCodeCamp}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
