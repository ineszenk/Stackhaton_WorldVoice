// Your code here!
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { cpus } from "os";
// import translate from "../translateText";

const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
const mySpeechRecognition = new Speech();

mySpeechRecognition.continous = true;
mySpeechRecognition.interimResults = false;
mySpeechRecognition.lang = "en-US" || "fr-FR";

const languages = {
  Albanian: "sq",
  Arabic: "ar",
  Chinese: "zh",
  Danish: "vi",
  English: "en",
  French: "fr",
  German: "de",
  Italian: "it",
  Japanese: "ja",
  Norwegian: "no",
  Korean: "ko",
  Russian: "ru",
  Spanish: "es",
  Turkish: "tr",
  Vietnamese: "vi"
};

class WorldVoice extends React.Component {
  constructor() {
    super();
    this.state = { listening: false, translation: "", button: true };

    this.toggle = this.toggle.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.selectLanguages = this.selectLanguages.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.translation = this.translation.bind(this);
    // this.toggleTranslation = this.toggleTranslation.bind(this);
  }

  selectLanguages(event) {
    event.preventDefault();
    if (languages.hasOwnProperty(event.target.value)) {
      const key =
        "trnsl.1.1.20190307T211902Z.600cf55c185cea9e.07ed979c8d1ed9e1253a888b3d952873ad38c484";
      const lang = languages[event.target.value];
      const text = document.getElementById("finalRecognition").innerHTML;

      Axios.post(
        `https://translate.yandex.net/api/v1.5/tr/translate?key=${key}&text=${text}&lang=${lang}&[format=plain]`
      ).then(res => {
        const firstOutput = res.data.split("text")[1].slice(1);
        const finalOutput = firstOutput.slice(0, -2);
        this.setState({
          translation: finalOutput
        });
      });
    }
  }

  toggle() {
    this.setState(
      {
        listening: !this.state.listening,
        button: !this.state.button
      },
      this.handleListen
    );
  }

  handleListen() {
    let finalRecognition = "";
    if (this.state.listening) {
      mySpeechRecognition.start();
      mySpeechRecognition.onend = () => {
        console.log("...continue listening...");
        mySpeechRecognition.start();
      };

      mySpeechRecognition.onresult = event => {
        let firstRecognition = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalRecognition += transcript + " ";
          else firstRecognition += transcript;
        }
        //   ;
        //   document.getElementById(
        //     "firstRecognition"
        //   ).innerHTML = firstRecognition;

        document.getElementById(
          "finalRecognition"
        ).innerHTML = finalRecognition;
      };
    }

    if (!this.state.listening) {
      mySpeechRecognition.stop();
      mySpeechRecognition.onend = () => {
        console.log("Stopped listening per click");
        console.log(document.getElementById("finalRecognition").innerHTML);
      };

      mySpeechRecognition.onstart = () => {
        console.log("Listening!");
      };
    }
  }

  render() {
    // console.log(finalRecognition);
    return (
      <section className="container">
        <div id="container">
          <div id="bloc">
            <h2 id="finalRecognition2">
              <div id="finalRecognition" />
            </h2>

            <select
              className="Language"
              onChange={() => this.selectLanguages(event)}
            >
              <option>Language Selection</option>
              <option>Albanian</option>
              <option>Arabic</option>
              <option>Chinese</option>
              <option>Danish</option>
              <option>French</option>
              <option>German</option>
              <option>Italian</option>
              <option>Japanese</option>
              <option>Korean</option>
              <option>Norwegian</option>
              <option>Russian</option>
              <option>Spanish</option>
              <option>Turkish</option>
              <option>Vietnamese</option>
            </select>
            <div id="Translation">
              <h2>{this.state.translation}</h2>
            </div>
          </div>

          <div id="img1">
            <img
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4KjZtXAcYBvsqG-GYnRN509fmFLIS9xWIK1kBr6_fbFL0YeCN"
              src="../public/Picture1.png"
              // src="https://cdn3.iconfinder.com/data/icons/sound-and-music-minimalist-icon-set/256/microphone-512.png"

              className={this.state.button ? "buttonTrue" : "buttonFalse"}
              onClick={() => this.toggle()}
            />
          </div>
          <h3>WorldVoice</h3>
        </div>
      </section>
    );
  }
}

export default WorldVoice;

ReactDOM.render(<WorldVoice />, document.getElementById("app"));
