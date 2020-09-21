import React, { Component } from "react";
import styled from "styled-components";
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage,
} from "react-intl";

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 7px;
  display: flex;
  margin: 0 0 1rem;
  label {
    padding: 1rem 1.5rem;
    margin: 0;
    input[type="checkbox"] {
      margin: 0;
    }
  }
  span {
    display: block;
    padding: 1rem 0;
  }
`;

import Form from "./Form.jsx";

class PrivacyAgreementField extends Component {
  static defaultProps = {
    privacy: true,
    terms: true,
  };
  render() {
    const { privacy, terms } = this.props;
    if (!privacy && !terms) {
      return null;
    }

    return (
      <Container>
        <label>
          <input type="checkbox" />
        </label>
        <span>I have read and agree with the privacy policy and the terms of use.</span>
      </Container>
    );
  }
}

export default PrivacyAgreementField;
