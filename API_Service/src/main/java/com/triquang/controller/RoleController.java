package com.triquang.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.RoleException;
import com.triquang.model.Role;
import com.triquang.model.User;
import com.triquang.service.IRoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

	@Autowired
	private IRoleService roleService;

	@GetMapping("/all-roles")
	public ResponseEntity<List<Role>> getAllRoles() {
		return new ResponseEntity<>(roleService.getRoles(), HttpStatus.FOUND);
	}

	@PostMapping("/create")
	public ResponseEntity<String> createRole(@RequestBody Role role) {
		try {
			roleService.createRole(role);
			return ResponseEntity.ok("New Role created successfully!");
		} catch (RoleException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	@DeleteMapping("/delete/{roleId}")
	public void deleteRole(@PathVariable Long roleId) {
		roleService.deleteRole(roleId);
	}

	@PostMapping("/remove-all/{roleId}")
	public Role removeAllUsersFromRole(@PathVariable Long roleId) {
		return roleService.removeAllUsersFromRole(roleId);
	}

	@PostMapping("/remove-user")
	public User romeveUserFromRole(@RequestParam("userId") Long userId, @RequestParam("roleId") Long roleId) {
		return roleService.removeUserFromRole(userId, roleId);
	}

	@PostMapping("/assign")
	public User assignUserToRole(@RequestParam("userId") Long userId, @RequestParam("roleId") Long roleId) {
		return roleService.assignRoleToUser(userId, roleId);
	}
}
