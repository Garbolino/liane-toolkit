import React, { Component } from "react";
import styled from "styled-components";
import { get } from "lodash";

import Reaction from "./Reaction.jsx";

const reactions = ["like", "love", "wow", "haha", "sad", "angry"];

const Container = styled.ul`
  display: flex;
  width: 100%;
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
  li {
    margin: 0;
    padding: 0;
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.1em;
    img {
      margin-right: 0.75rem;
    }
  }
`;

export default class PersonReactions extends Component {
  reactionVal(reaction) {
    const { person } = this.props;
    return get(person, `counts.reactions.${reaction}`) || 0;
  }
  render() {
    return (
      <Container>
        {reactions.map(reaction => (
          <li key={reaction}>
            <Reaction reaction={reaction} /> {this.reactionVal(reaction)}
          </li>
        ))}
      </Container>
    );
  }
}