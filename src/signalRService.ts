import * as signalR from "@microsoft/signalr";

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5078/chatHub") 
  .build();


hubConnection.onclose((error) => {
  console.log("SignalR connection closed:", error);
});

hubConnection.onreconnecting((error) => {
  console.log("SignalR connection reconnecting:", error);
});

hubConnection.onreconnected((connectionId) => {
  console.log("SignalR connection reconnected. ConnectionId:", connectionId);
});

export const startConnection = async () => {
  try {
    await hubConnection.start();
    console.log("SignalR Connected!");
  } catch (err) {
    console.log("Error establishing SignalR connection:", err);
  }
};

export const addMessageListener = (callback: any) => {
  hubConnection.on("ReceiveMessage", callback);
};

export const removeMessageListener = (callback: any) => {
  hubConnection.off("ReceiveMessage", callback);
};

export const sendMessage = (user: string, message: string) => {
  if (hubConnection.state === signalR.HubConnectionState.Connected) {
    hubConnection.invoke("SendMessage", user, message);
  } else {
    console.log("SignalR connection is not in the 'Connected' state.");
  }
};