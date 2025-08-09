package com.inside.backendinside.aiPartner.controller;

import com.inside.backendinside.aiPartner.domain.User;
import com.inside.backendinside.aiPartner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.inside.backendinside.common.AJAXResult;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public AJAXResult<List<User>> getAllUsers() {
        List<User> users = userService.list();
        return AJAXResult.success(users);
    }

    @GetMapping("/{id}")
    public AJAXResult<User> getUserById(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user != null) {
            return AJAXResult.success(user);
        } else {
            return AJAXResult.error("User not found.");
        }
    }

    @PostMapping
    public AJAXResult<Boolean> addUser(@RequestBody User user) {
        boolean success = userService.save(user);
        if (success) {
            return AJAXResult.success(true);
        } else {
            return AJAXResult.error("Failed to add user.");
        }
    }

    @PutMapping
    public AJAXResult<Boolean> updateUser(@RequestBody User user) {
        boolean success = userService.updateById(user);
        if (success) {
            return AJAXResult.success(true);
        } else {
            return AJAXResult.error("Failed to update user.");
        }
    }

    @DeleteMapping("/{id}")
    public AJAXResult<Boolean> deleteUser(@PathVariable Long id) {
        boolean success = userService.removeById(id);
        if (success) {
            return AJAXResult.success(true);
        } else {
            return AJAXResult.error("Failed to delete user.");
        }
    }
}