import React, { Component } from "react";

import { alertStore } from "../../containers/Alerts.jsx";

import Page from "../../components/Page.jsx";
import Form from "../../components/Form.jsx";
import SelectAccount from "../../components/facebook/SelectAccount.jsx";

export default class NewCampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formData: {
        name: "",
        facebookAccountId: ""
      }
    };
  }
  _handleChange = ({ target }) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [target.name]: target.value
      }
    });
  };
  _filledForm = () => {
    const { formData } = this.state;
    return formData.name && formData.facebookAccountId;
  };
  _handleSubmit = ev => {
    ev.preventDefault();
    if (this._filledForm()) {
      const { formData } = this.state;
      this.setState({
        loading: true
      });
      Meteor.call("campaigns.create", formData, (err, data) => {
        if (err) {
          alertStore.add(err);
          this.setState({
            loading: false
          });
        } else {
          Session.set("campaignId", data.result);
          FlowRouter.go("App.dashboard");
          window.location.reload();
        }
      });
    } else {
      alertStore.add(
        "Você deve preencher todos os campos obrigatórios",
        "error"
      );
      console.log("nope");
    }
  };
  render() {
    const { loading, formData } = this.state;
    return (
      <Form onSubmit={this._handleSubmit}>
        <Form.Content>
          <Page.Title>Criando Nova Campanha</Page.Title>
          <input
            type="text"
            name="name"
            placeholder="Nome da campanha"
            onChange={this._handleChange}
            value={formData.name}
          />
          <p>Selecione uma conta de Facebook para sua campanha:</p>
          <SelectAccount
            name="facebookAccountId"
            onChange={this._handleChange}
            value={formData.facebookAccountId}
          />
        </Form.Content>
        <Form.Actions>
          <input
            type="submit"
            disabled={!this._filledForm() || loading}
            value="Cadastrar campanha"
          />
        </Form.Actions>
      </Form>
    );
  }
}
