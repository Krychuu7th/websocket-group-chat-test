import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';

interface Message {
  name: string; message: string; type: string;
}

interface MessageCount {
  messagecount: number; type: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public userControl = new FormControl(null);
  public chatIdControl = new FormControl(null);
  public messageControl = new FormControl(null);

  messages: Message[] = [];
  numberOfMessages = 0;

  ws!: WebSocketSubject<any>;
  message$!: Observable<Message>;
  messageNumber$!: Observable<MessageCount>;

  isConnected: boolean = false;

  socketClient: any;

  constructor(
    public webSocketService: WebSocketService
  ) { }

  onConnect() {
    this.webSocketService.connect(this.chatId);
    this.setConnected(true);
  }

  onDisconnect() {
    this.webSocketService.disconnect();
  }

  onSendMessage() {
    if (this.message) {
      this.webSocketService.sendMessage(this.message, this.user);
      this.messageControl.reset();
    }
  }

  setConnected(connected: boolean) {
    this.isConnected = connected;
  }

  get user(): string {
    return this.userControl.value ?? 'test';
  }

  get chatId(): string {
    return this.chatIdControl.value ?? 'public';
  }

  get message(): string | null {
    return this.messageControl.value;
  }
}

