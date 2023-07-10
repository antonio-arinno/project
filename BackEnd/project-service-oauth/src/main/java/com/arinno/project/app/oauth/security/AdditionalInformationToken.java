package com.arinno.project.app.oauth.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.arinno.project.app.model.entity.User;
import com.arinno.project.app.oauth.service.IUserService;

@Component
public class AdditionalInformationToken implements TokenEnhancer{
	
	@Autowired
	private IUserService userService;	

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		Map<String, Object> info = new HashMap<String, Object>();

		
		User user = userService.findByUsername(authentication.getName());
		info.put("name", user.getName());
		info.put("lastname", user.getLastName());
		info.put("email", user.getEmail());		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		
		return accessToken;
	}

}
