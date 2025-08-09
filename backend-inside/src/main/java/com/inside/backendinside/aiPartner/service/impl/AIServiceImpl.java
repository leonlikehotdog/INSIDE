package com.inside.backendinside.aiPartner.service.impl;

import ai.z.openapi.service.model.*;
import com.inside.backendinside.aiPartner.service.AIService;
import ai.z.openapi.ZhipuAiClient;

import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * AI Service Implementation that interacts with Zhipu AI.
 */
@Service
public class AIServiceImpl implements AIService {

    // Injecting the API key from application.yml
    @Value("${zhipuai.api-key}")
    private String apiKey;
    private final List<ChatMessage> conversation = new ArrayList<>();

    private ZhipuAiClient client;

    /**
     * Initializes the ClientV4 with the configured API key after the bean has been constructed.
     */
    @PostConstruct
    public void init() {
        client = ZhipuAiClient.builder().apiKey(apiKey).build();
        // 添加系统消息
        this.conversation.add(ChatMessage.builder()
                .role(ChatMessageRole.SYSTEM.value())
                .content("你是浪浪山的一只小妖怪，已经体会了世间所有悲喜，现在助力与解决青年人各种心理问题")
                .build());
    }

    /**
     * Gets a response from the AI based on the user's message.
     *
     * @param message The user's message.
     * @return The AI's response as a string.
     */
    @Override
    public String getAIResponse(String message) {
                try {
                    // 添加用户消息
                    conversation.add(ChatMessage.builder()
                            .role(ChatMessageRole.USER.value())
                            .content(message)
                            .build());
                    ChatThinking thinking = ChatThinking.builder()
                            .type("disabled") // 👈 关闭思维链
                            .build();

                    // 创建聊天完成请求
                    ChatCompletionCreateParams request = ChatCompletionCreateParams.builder()
                            .model("glm-4.5-flash")
                            .messages(conversation)
                            .thinking(thinking) // 👈 关闭思维链
                            .temperature(0.6f)
                            .maxTokens(1000)
                            .build();

            // 发送请求
            ChatCompletionResponse response = client.chat().createChatCompletion(request);

            // 获取回复
            if (response.isSuccess()) {
                return (String) response.getData().getChoices().get(0).getMessage().getContent();
            } else {
                System.err.println("错误: " + response.getMsg());
                return "AI返回错误: " + response.getMsg();
            }
        } catch (Exception e) {
            // 捕获异常并打印堆栈信息
            e.printStackTrace();
            // 返回一个错误提示信息
            return "宕机了，联系一下管理员看看。。。";
        }
    }
}