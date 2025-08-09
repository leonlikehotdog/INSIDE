package com.inside.backendinside.aiPartner.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.inside.backendinside.aiPartner.domain.User;
import com.inside.backendinside.aiPartner.mapper.UserMapper;
import com.inside.backendinside.aiPartner.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}