import React, { Component } from "react";
import ProfilePage from "./ProfilePage";
import PollItem from "../items/PollItem";
import GroupItem from "../items/GroupItem";
import "../csss/homePage.css";



class HomePage extends Component {
  state = {};
  componentDidMount() {
    var groupid = 0;
    localStorage.setItem("selectedMember",localStorage.getItem('currentUserMail'));
    var xhrgroups = new XMLHttpRequest();
    xhrgroups.open("GET", "http://d7c59928777f.ngrok.io/api/group/getAll");
    xhrgroups.send();
    xhrgroups.addEventListener("load", () => {
      // update the state of the component with the result here
      var parsed = JSON.parse(xhrgroups.response);
      const groups = parsed.map(groupitem => <GroupItem
        key={groupid++}
        color={groupid}
        name={groupitem.name}
        project={'PeerReview'}
      />)
      this.setState({ groups: groups });
    });

    var pollid = 0;
    var xhrpolls = new XMLHttpRequest();
    xhrpolls.open("GET", "https://d7c59928777f.ngrok.io/api/poll/getAll");
    xhrpolls.send();
    xhrpolls.addEventListener("load", () => {
      // update the state of the component with the result here
      var parsed = JSON.parse(xhrpolls.response);

      const polls = parsed.map(pollitem => <PollItem
        key={pollitem.id}
        name={pollitem.name}
        color={pollid++}
        count={10}
      />)
      this.setState({ polls: polls });
    });
  }
  render() {
    return (
      <div className="home_page">
        <div className="three_part_div">
          <div className="user_info_div">
          <ProfilePage />
          </div>
          <div className="group_list_div">
            {this.state.groups}
          </div>
          <div className="poll_list_div">
            {this.state.polls}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
