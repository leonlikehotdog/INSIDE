package com.inside.backendinside.aiPartner.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("chat")
public class Chat {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private String message;
    private String response;
    private LocalDateTime timestamp;
}