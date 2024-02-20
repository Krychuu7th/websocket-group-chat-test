package marcin.krysiak.websocketschat.chat.model;

import lombok.*;
import marcin.krysiak.websocketschat.chat.enumeration.MessageType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;
    private String chatId;
}
