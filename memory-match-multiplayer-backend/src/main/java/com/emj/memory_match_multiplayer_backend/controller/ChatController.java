package com.emj.memory_match_multiplayer_backend.controller;

import com.emj.memory_match_multiplayer_backend.dto.ChatMessage;
import com.emj.memory_match_multiplayer_backend.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final WebSocketService webSocketService;

    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload ChatMessage message, Principal principal) {
        // accessing the username from the Principal
        String username = principal.getName();
        webSocketService.sendMessage(message);
        System.out.println("Message received from user: " + username);
    }
}
