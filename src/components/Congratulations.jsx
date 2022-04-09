import "./Congratulations.css";
import * as React from "react";

class Congratulations extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="congratulations" className="Congratulations-div">
                <h3>Congrats! You remembered all the cats!</h3>
            </div>

        );
    }
}

export default Congratulations