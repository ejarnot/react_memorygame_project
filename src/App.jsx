import React, { Component } from "react";
import "./App.css";
import Congratulations from "./components/Congratulations.jsx";
import GameItem from "./components/GameItem.jsx";
import Freya from "./Freya2021.jpg";
import cat1 from "./cat1.jpg";
import cat2 from "./cat2.jpg";
import cat3 from "./cat3.jpg";
import cat4 from "./cat4.webp";

class App extends Component {
  constructor(props){
    super(props);

    //const best = localStorage.getItem(best);

    this.state = {
      score: 0,
     // bestScore: best ? best : 0,
      cats: [
        {
          content: "Freya",
          wasViewed: false,
          element: <img src={Freya} alt="Black and White Cat"/>
        },
        {
          content: "Arthur Dent",
          wasViewed: false,
          element: <img src={cat1} alt="Orange Tabby Cat"/>
        },
        {
          content: "Gandalf",
          wasViewed: false,
          element: <img src={cat2} alt="Grey Cat"/>
        },
        {
          content: "Goose",
          wasViewed: false,
          element: <img src={cat3} alt="Tabby Cat"/>
        },
        {
          content: "Maverick",
          wasViewed: false,
          element: <img src={cat4} alt="Tabby Kitten"/>
        }
      ]
    }
    this.checkScore = this.checkScore.bind(this)
    this.randomCat = this.randomCat.bind(this)
  }

  randomCat() {
    let array = this.state.cats;
    let index = this.state.cats.length,
      temporaryIndex,
      randomIndex;

    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      temporaryIndex = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = temporaryIndex;
    }

    return array;
  }



  checkScore(item, answer) {
    let tempArray = this.randomCat();

    if(item.wasViewed === answer){
      
      let incrementScore = this.state.score +1;
      if(incrementScore === 10){
        this.showCongratulations()
        localStorage.setItem("best", incrementScore);
        this.setState({
          score: 0,
          bestScore: incrementScore,
          cats: tempArray
        });
      }else{
        tempArray.forEach((cat) => {
          if(cat.content === item.content){
            cat.wasViewed = true;
          }
        });
        const newBest =
          this.state.bestScore > incrementScore
          ? this.state.bestScore
          : incrementScore;
        
        localStorage.setItem("best", newBest);

        this.setState({
          score: incrementScore,
          bestScore: newBest,
          cats: tempArray
        });
      }
    } else {
      tempArray.forEach((item) => {
        item.wasViewed = false;
      });
      this.setState({
        score: 0,
        bestScore: 
          this.state.bestScore > this.state.score
          ? this.state.bestScore 
          : this.state.score, 
        cats: tempArray
      });
    }
  }


  showCongratulations(){
    const congrats = document.getElementById("congratulations");
    congrats.classList.toggle("show-congrats");
    setTimeout(() => congrats.classList.toggle("show-congrats"), 5000);
  }

  render() {
    const randomImage = Math.floor(Math.random() * this.state.cats.length);
    const selectedCat = this.state.cats[randomImage]
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }} className="App"
      >
        <header className="App-header">
          <h1>HAVE YOU SEEN THIS CAT?</h1>
          <p>Objective: Test your memory, remember the lost cats! <br></br>
            Try to reach the high score!
          </p>
          <div className="App-scoreboard" id="scoreboard">
            <span>Score: {this.state.score}</span><br></br>
            <span>High Score: {this.state.bestScore}</span>
          </div>
        </header>
        <section className="App-container">
          <Congratulations />
          <div className="App-item-container">
            <GameItem value={selectedCat}/>
            <div>
              <h3>Have you already seen this cat?</h3>
              <button
                id="no"
                className="btn"
                onClick={() => this.checkScore(selectedCat, false)}
              >
                No
              </button>
              <button
                id="yes"
                className="btn"
                onClick={() => this.checkScore(selectedCat, true)}
                >
                Yes
              </button>
            </div>
          </div>

        </section>
      
      </main>
    );
  }
}

export default App;
//MY GAME: Have you seen this cat?
//Game play
  //Show a picture of a cat
    //Have at least 5 pictures of cats
  //Have buttons asking if you've seen that cat X
  //score board
    //Score board changes when you guess correctly/incorrectly
      //inside checkScore method...
      //If correct=true
      //if correct=false
    //highest score listed to see
      //highest score is equal to 10
  //Congratulations when hit high schore X
