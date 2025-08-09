package com.inside.backendinside.aiPartner.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.inside.backendinside.aiPartner.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}