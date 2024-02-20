import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socketEp = "ws://localhost:8080/our-ws";
  private isConnectionEstablished: boolean = false;
  private socketClient: any;
  private chatId: string | undefined = undefined;
  private wsMessages: string[] = [];

  connect(chatId: string) {
    this.chatId = chatId;
    this.socketClient = Stomp.over(new WebSocket(this.socketEp));

    this.socketClient.connect({}, (frame: any) => {
      this.isConnectionEstablished = true;
      console.log(frame);

      this.socketClient.subscribe(`/topic/messages-${this.chatId}`, (message: Stomp.Message) => {
        this.wsMessages.push(message.body);
      });
    }
    );

    this.setConnected(true);
  }

  disconnect() {
    this.socketClient.disconnect(() => {
      console.log('Disconnected');
      this.setConnected(false);
      this.chatId = undefined;
    });
  }

  sendMessage(message: string, username: string) {
    this.socketClient.send("/ws/message", {}, JSON.stringify({ sender: username ?? 'testUser', content: message ?? 'test message', type: 'MESSAGE', chatId: this.chatId }));
  }

  setConnected(connected: boolean) {
    this.isConnectionEstablished = connected;
  }

  get isConnected() {
    return this.isConnectionEstablished;
  }

  get messages(): string[] {
    return this.wsMessages;
  }
}


