package marcin.krysiak.websocketschat.chat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
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
    @SneakyThrows
    public void publishMessage(ChatMessage message) throws InterruptedException {
        ObjectMapper objectMapper = new ObjectMapper();

        this.simpMessagingTemplate.convertAndSend("/topic/messages-" + message.getChatId(),
                objectMapper.writeValueAsString(message));
    }
}
