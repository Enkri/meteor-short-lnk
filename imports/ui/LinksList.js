import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links.js';
import { Session } from 'meteor/session';
import LinksListItem from './LinksListItem.js';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      let links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message"> No Links Found.</p>
        </div>

      );
    }
    return this.state.links.map((link) => {
      // return <p key={link._id}>{link.url}</p>
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
    });
  }
  render() {
    return (
      <div>
        <div>
          <FlipMove maintainContainerHeight={true}>
            {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
    );
  }
};
