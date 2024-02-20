package marcin.krysiak.websocketschat.chat.controller;

import marcin.krysiak.websocketschat.chat.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    public void publishMessage(ChatMessage message) throws InterruptedException {
        this.simpMessagingTemplate.convertAndSend("/topic/messages-" + message.getChatId(),
                message.getSender() + ": " + message.getContent());
    }
}
