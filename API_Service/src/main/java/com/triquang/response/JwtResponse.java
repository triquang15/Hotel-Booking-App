package com.triquang.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
	private Long id;
	private String email;
	private String token;
	private String type = "Bearer";
	private List<String> roles;

	public JwtResponse(Long id, String email, String token, List<String> roles) {
		super();
		this.id = id;
		this.email = email;
		this.token = token;
		this.roles = roles;
	}

}
