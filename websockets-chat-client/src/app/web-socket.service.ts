import { Injectable } from '@angular/core';
import { ChatMessage } from './app.models';
import { Client, Message, Frame, Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socketEp = "ws://localhost:8080/our-ws";
  private isConnectionEstablished: boolean = false;
  private socketClient: Client | any = undefined;
  private chatId: string | undefined = undefined;
  private chatMessages: ChatMessage[] = [];

  connect(chatId: string) {
    this.chatId = chatId;
    this.socketClient = Stomp.client(this.socketEp);
    this.socketClient.reconnect_delay = 5000;

    this.socketClient.connect({}, (frame: Frame) => {
      this.isConnectionEstablished = true;

      this.socketClient.subscribe(`/topic/messages-${this.chatId}`, (message: Message) => {
        this.chatMessages.push(JSON.parse(message.body) as ChatMessage);
      });
    }
    );

    this.setConnected(true);
  }

  disconnect() {
    this.socketClient.disconnect(() => {
      this.setConnected(false);
      this.chatId = undefined;
      this.chatMessages = [];
    });
  }

  sendMessage(message: string, username: string) {
    this.socketClient.send("/ws/message", {}, JSON.stringify({ sender: username, content: message, type: 'MESSAGE', chatId: this.chatId }));
  }

  setConnected(connected: boolean) {
    this.isConnectionEstablished = connected;
  }

  get isConnected() {
    return this.isConnectionEstablished;
  }

  get messages(): ChatMessage[] {
    return this.chatMessages;
  }
}


