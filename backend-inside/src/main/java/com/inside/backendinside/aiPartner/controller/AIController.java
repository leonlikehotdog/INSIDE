package com.inside.backendinside.aiPartner.controller;

import com.inside.backendinside.aiPartner.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.inside.backendinside.common.AJAXResult;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/ai")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/chat")
    public AJAXResult<String> chatWithAI(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        if (message == null || message.isEmpty()) {
            return AJAXResult.error("Message cannot be empty.");
        }
        String response = aiService.getAIResponse(message);
        return AJAXResult.success(response);
    }
}