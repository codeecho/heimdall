import React from 'react';

const Conversation = ({conversation}) => {
    return (
        <table class="table">
            <tbody>
                {conversation.messages.map(message => <Message message={message} />)}
            </tbody>
        </table>
    )
}

const Message = ({message}) => {
    const time = message.time.toLocaleString();
    return (
        <tr>
            <td>{time}</td>
            <td>{message.author}</td>
            <td>{message.text}</td>
        </tr>
    )
}

export default Conversation;