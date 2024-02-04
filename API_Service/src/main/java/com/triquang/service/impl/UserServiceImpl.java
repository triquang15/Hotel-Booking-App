package com.triquang.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.triquang.exception.UserException;
import com.triquang.model.Role;
import com.triquang.model.User;
import com.triquang.repository.RoleRepository;
import com.triquang.repository.UserRepository;
import com.triquang.service.IUserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User registerUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new UserException(user.getEmail() + " already exists");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role userRole = roleRepository.findByName("ROLE_USER").get();
		user.setRoles(Collections.singletonList(userRole));

		return userRepository.save(user);
	}

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Transactional
	@Override
	public void deleteUser(String email) {
		User user = getUserByEmail(email);
		if (user != null) {
			userRepository.deleteByEmail(email);
		}
	}

	@Override
	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
	}

}
