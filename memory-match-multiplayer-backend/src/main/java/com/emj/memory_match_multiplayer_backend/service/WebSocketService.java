package com.emj.memory_match_multiplayer_backend.service;

import com.emj.memory_match_multiplayer_backend.dto.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendMessage(ChatMessage payload) {
        messagingTemplate.convertAndSendToUser(payload.getReceiver(), "/queue/message", payload.getMessage());
    }
}
