package com.consulti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.consulti.component.ConsultiTestComponent;
import com.consulti.dto.RequestPostAplicacion;
import com.consulti.dto.RequestPostRol;
import com.consulti.dto.RequestPostUser;
import com.consulti.dto.RequestUser;
import com.consulti.dto.ResponseUser;
import com.consulti.entity.Aplicacion;
import com.consulti.entity.ResponseMsg;
import com.consulti.entity.Rol;
import com.consulti.entity.Usuario;

@CrossOrigin
@RestController
@RequestMapping({ "/consultiAPI" })

public class UsuarioController {

	@Autowired
	private ConsultiTestComponent consultiTestComponent;
	
	/*
	 * Metodos de Usuario
	 */
	
	
	@RequestMapping(value = { "/login" }, method = { RequestMethod.POST })
	ResponseUser loginUser(@RequestBody RequestUser query) {
		System.out.println("Input : " + query);
		return this.consultiTestComponent.loginUser(query);
	}

	@RequestMapping(value = { "/users" }, method = { RequestMethod.GET })
	List<Usuario> users() {
		return this.consultiTestComponent.users();
	}
	
	@RequestMapping(value = { "/createUser" }, method = { RequestMethod.POST })
	ResponseMsg createUser(@RequestBody RequestPostUser query) {
		System.out.println("Input : " + query);
		return this.consultiTestComponent.createUser(query);
	}
	
	@RequestMapping(value = { "/updateUser" }, method = { RequestMethod.PUT })
	ResponseMsg updateUser(@RequestParam String id, @RequestBody RequestPostUser query) {
		System.out.println("Input : " + query);
		return this.consultiTestComponent.updateUser(id, query);
	}
	
	@RequestMapping(value = { "/cambiaEstadoUser" }, method = { RequestMethod.PUT })
	ResponseMsg cambiaEstadoUser(@RequestParam String id) {
		System.out.println("Input : " + id);
		return this.consultiTestComponent.cambiaEstadoUser(id);
	}
	
	/*
	 * Metodos de Rol
	 */
	
	@RequestMapping(value = { "/roles" }, method = { RequestMethod.GET })
	List<Rol> roles() {
		return this.consultiTestComponent.roles();
	}
	
	@RequestMapping(value = { "/createRol" }, method = { RequestMethod.POST })
	ResponseMsg createRol(@RequestBody RequestPostRol query) {
		System.out.println("Input : " + query);
		return this.consultiTestComponent.createRol(query);
	}
	
	@RequestMapping(value = { "/updateRol" }, method = { RequestMethod.PUT })
	ResponseMsg updateRol(@RequestParam String id, @RequestBody RequestPostRol query) {
		System.out.println("Input : " + query);
		return this.consultiTestComponent.updateRol(id, query);
	}
	
	@RequestMapping(value = { "/cambiaEstadoRol" }, method = { RequestMethod.PUT })
	ResponseMsg cambiaEstadoRol(@RequestParam String id) {
		System.out.println("Input : " + id);
		return this.consultiTestComponent.cambiaEstadoRol(id);
	}
	
	/*
	 * Metodos de Aplicaciones
	 */
	
	@RequestMapping(value = { "/aplicaciones" }, method = { RequestMethod.GET })
	List<Aplicacion> aplicaciones() {
		return this.consultiTestComponent.aplicaciones();
	}
	
	@RequestMapping(value = { "/createAplicacion" }, method = { RequestMethod.POST })
	ResponseMsg createAplicacion(@RequestBody RequestPostAplicacion query) {
		System.out.println("Input : " + query);
		return this.consultiTestComponent.createAplicacion(query);
	}
	
	@RequestMapping(value = { "/updateAplicacion" }, method = { RequestMethod.PUT })
	ResponseMsg updateAplicacion(@RequestParam String id, @RequestBody RequestPostAplicacion query) {
		System.out.println("Input : " + query);
		return this.consultiTestComponent.updateAplicacion(id, query);
	}
	
	@RequestMapping(value = { "/cambiaEstadoAplicacion" }, method = { RequestMethod.PUT })
	ResponseMsg cambiaEstadoAplicacion(@RequestParam String id) {
		System.out.println("Input : " + id);
		return this.consultiTestComponent.cambiaEstadoAplicacion(id);
	}
	

}
