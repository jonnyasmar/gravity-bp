import * as React from 'react';
import { connected } from 'reducers';
import * as selectors from 'selectors';
import { g } from 'styles';
import { IMessage } from 'models/Chat';

class Main extends React.Component<selectors.Chat.Props> {
  button: HTMLButtonElement | null = null;
  input: HTMLInputElement | null = null;

  async componentDidMount() {
    if (this.input !== null) this.input.focus();
    await this.props.Actions.Chat.readMessages();
  }

  submit = async (e: Event): Promise<void> => {
    e.preventDefault();
    let user = window.sessionStorage.getItem('ip');
    if (user !== null && this.button !== null && this.input !== null && this.input.value !== '') {
      let text = this.input.value;
      this.input.value = '';
      await this.props.Actions.Chat.createMessage({ text, user }, true);
      this.input.focus();
    }
  };

  Message: React.SFC<{ message: IMessage }> = props => {
    const { message } = props;

    return (
      <span>
        <strong>{message.user}:</strong> {message.text}{' '}
        <i
          className="fa fa-trash-alt clickable"
          onClick={() => {
            message.id && this.props.Actions.Chat.deleteMessage(message.id, true);
          }}
        />{' '}
        <i
          className="fa fa-pencil-alt clickable"
          onClick={() => {
            message.id &&
              this.props.Actions.Chat.updateMessage(
                {
                  id: message.id,
                  text: 'THIS IS A TEST!',
                  user: message.user,
                },
                true
              );
          }}
        />
      </span>
    );
  };

  render() {
    const { Message } = this;
    const { getMessages } = this.props.Selectors;
    const { Section, Chat, Form, Div } = g;

    return (
      <>
        <Section>
          <Chat layout="stretch:1-1-100%">
            {getMessages.map((message: IMessage, i: number) => <Message message={message} key={i} />)}
          </Chat>
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
