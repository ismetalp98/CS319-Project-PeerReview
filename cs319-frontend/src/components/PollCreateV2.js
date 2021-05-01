import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../csss/PollCreateV2.css";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { Link, Redirect } from "react-router-dom";
import PollItem from "../items/PollItem";

class PollCreateV2 extends Component {
  state = {};
  handlePollCreation = e => {
    e.preventDefault();
    let name = document.getElementById("question").value;
    var data= {
      "name": name
    };
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      var parsed = JSON.parse(xhr.response);

      if (xhr.status == 200) {
        console.log(xhr.status);
        console.log("Successfully Registered");
        this.setState({ registered: true });
      }
    });
        // open the request with the verb and the url
    
        xhr.open("POST", "https://d7c59928777f.ngrok.io/api/poll/createPoll");
        xhr.setRequestHeader("Content-Type", "application/json");
        // send the request
        xhr.send(json);
        var xhrpolls = new XMLHttpRequest();
        xhrpolls.open("GET","https://d7c59928777f.ngrok.io/api/poll/getAllListView");
        xhrpolls.addEventListener("load", () => {
          // update the state of the component with the result here
          var parsed = JSON.parse(xhrpolls.response);
          var pollid = 0;
          const polls = parsed.map(pollitem => <PollItem
            key={pollitem.id}
            name={pollitem.name}
            color={pollid++}
            count={10}
          />)
          console.log(polls.key);
          var i;
          var index;
          for(i = 0; i < polls.length; i++){
            if(polls.name == name) {
              index = i;
            }
          }
          localStorage.setItem("currentPollIndex",index);
        });
      };
  render() {
    return (
      <form className="PollCreateV2">
        <div className="PollCreation">
          <div className="search_form_div">
        <div className="input">
          <input
            id="question"
            placeholder="Type your poll name here"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e =>
              (e.target.placeholder = "Type your question here")
              }
            autoComplete="off"
            type="text"
            />
        </div> 
        </div>
        <Link to={"/PollQuestionCreate"}>
        <Button id="submitBtn" color="#841584" onClick={this.handlePollCreation}>
          Create Poll
        </Button>
        </Link>
        </div>
        
      </form>
    );
  }
}

export default PollCreateV2;
