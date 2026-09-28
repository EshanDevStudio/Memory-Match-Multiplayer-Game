import { useState } from 'react';
import { Client } from '@stomp/stompjs';

function App() {

  const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    reconnectDelay: 3000,
    onWebSocketClose: () => {
      console.log('reconnecting');
    },
    onWebSocketError: () => {
      console.log('websocket-error-reconnecting');
    },
    onStompError: (frame) => {
      console.log('stomp-error');
    },
  });

  client.onConnect = function (frame) {
    console.log('===connected===');
  };

  client.activate();

  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default App
