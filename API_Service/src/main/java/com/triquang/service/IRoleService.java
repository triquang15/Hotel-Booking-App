package com.triquang.service;

import java.util.List;

import com.triquang.model.Role;
import com.triquang.model.User;

public interface IRoleService {
	List<Role> getRoles();

	Role createRole(Role role);

	void deleteRole(Long id);

	Role findByName(String name);

	User removeUserFromRole(Long userId, Long roleId);

	User assignRoleToUser(Long userId, Long roleId);

	Role removeAllUsersFromRole(Long roleId);
}
