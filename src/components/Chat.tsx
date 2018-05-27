import * as React from 'react';
import { connected } from 'reducers';
import { request } from 'utils/request';
import * as selectors from 'selectors';
import { g } from 'styles';

class Main extends React.Component<selectors.Chat.Props> {
  button: HTMLButtonElement | null = null;
  input: HTMLInputElement | null = null;

  componentDidMount() {
    if (this.input !== null) this.input.focus();
  }

  submit = async (e: Event) => {
    e.preventDefault();
    if (this.button !== null && this.input !== null && this.input.value !== '') {
      let value = this.input.value;
      this.input.value = '';
      this.input.focus();
      this.button.disabled = true;
      await request('events/messages/send', {
        method: 'POST',
        data: {
          text: this.input !== null && value,
          user: window.sessionStorage.getItem('ip'),
        },
      });
      this.button.disabled = false;
    }
  };

  render() {
    const { getMessages } = this.props.Selectors;
    const { Section, Chat, Form, Div } = g;

    return (
      <>
        <Section>
          <Chat layout="stretch:1-1-100%">{getMessages}</Chat>
        </Section>

        <Form onSubmit={this.submit}>
          <Div layout="flexible stretch:0-0-auto">
            <input ref={ref => (this.input = ref)} placeholder="Send a message..." />
            <button type="submit" ref={ref => (this.button = ref)}>
              Send
            </button>
          </Div>
        </Form>
      </>
    );
  }
}

export const Chat = connected(Main, { selectors: selectors.Chat.selectors });
