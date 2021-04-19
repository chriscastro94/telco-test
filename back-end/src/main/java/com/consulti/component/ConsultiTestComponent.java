package com.consulti.component;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.consulti.dto.RequestPostAplicacion;
import com.consulti.dto.RequestPostRol;
import com.consulti.dto.RequestPostUser;
import com.consulti.dto.RequestUser;
import com.consulti.dto.ResponseUser;
import com.consulti.entity.Aplicacion;
import com.consulti.entity.ResponseMsg;
import com.consulti.entity.Rol;
import com.consulti.entity.Usuario;
import com.consulti.repository.AplicacionRepository;
import com.consulti.repository.RolRepository;
import com.consulti.repository.UsuarioRepository;

@Component
public class ConsultiTestComponent {

	private static final Logger logger = LoggerFactory.getLogger(ConsultiTestComponent.class);
	
	@Autowired
	public ConsultiTestComponent() {
	}
	
	@Autowired
	private RolRepository rolRepository;
	
	@Autowired
	private AplicacionRepository aplicacionRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	/*
	 * Metodos de Usuario
	 */
	
	public ResponseUser loginUser(RequestUser query) {
		ResponseUser resp = new ResponseUser("ERROR");
		
		try {
			List<Usuario> usuarios = this.usuarioRepository.findByUsuarioAndPassword(query.getUsuario(), query.getPassword());
			if (usuarios.size() != 1)
				throw new Exception("User o Pass no valido");
			Usuario userLogin = usuarios.get(0);
					
		
			resp = new ResponseUser("OK");
			resp.setUsuario(userLogin);
		} catch (Exception e) {
			resp.setMessage("Login no valida");
			
		}
		return resp;
	}
	
	public List<Usuario> users() {
		List<Usuario> resp = new ArrayList<Usuario>();
		
		try {
			List<Usuario> usuarios = this.usuarioRepository.findAll();
			resp= usuarios;
		} catch (Exception e) {}
		return resp;
	}
	
	public ResponseMsg createUser(RequestPostUser query) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Usuario> usuarios = this.usuarioRepository.findByUsuario(query.getUsuario());
			if (usuarios.size() > 0)
				throw new Exception("Usuario ya existe");
			
			Usuario userLogin = new Usuario();
			userLogin.setNombre(query.getNombre());
			userLogin.setUsuario(query.getUsuario());
			userLogin.setPassword(query.getPassword());
			userLogin.setEstado("A");
			//Busca Referencia de los roles en base
			for(String idRol: query.getRoles()) {
				List<Rol> roles = this.rolRepository.findById(idRol);
				if(roles.size()>0) {
					Rol rolNuevo = roles.get(0);
					userLogin.getRoles().add(rolNuevo);
				}
				
			}
			this.usuarioRepository.save(userLogin);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	public ResponseMsg updateUser(String id, RequestPostUser query) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Usuario> usuarios = this.usuarioRepository.findById(id);
			if (usuarios.size() <= 0)
				throw new Exception("Usuario no existe");
			
			Usuario userLogin = usuarios.get(0);
			userLogin.setNombre(query.getNombre());
			userLogin.setUsuario(query.getUsuario());
			userLogin.setPassword(query.getPassword());
			
			//Busca Referencia de los roles en base
			for(String idRol: query.getRoles()) {
				List<Rol> roles = this.rolRepository.findById(idRol);
				if(roles.size()>0) {
					Rol rolNuevo = roles.get(0);
					if(!userLogin.getRoles().contains(rolNuevo)) {
						userLogin.getRoles().add(rolNuevo);
					}
				}
				
			}
			this.usuarioRepository.save(userLogin);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	public ResponseMsg cambiaEstadoUser(String id) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Usuario> usuarios = this.usuarioRepository.findById(id);
			if (usuarios.size() <= 0)
				throw new Exception("Usuario no existe");
			
			Usuario userLogin = usuarios.get(0);
			if(userLogin.getEstado().equals("A")) {
				userLogin.setEstado("I");
			}else {
				userLogin.setEstado("A");
			}
			
			this.usuarioRepository.save(userLogin);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	/*
	 * Metodos de Rol
	 */
	
	public List<Rol> roles() {
		List<Rol> resp = new ArrayList<Rol>();
		
		try {
			List<Rol> roles = this.rolRepository.findAll();
			resp= roles;
		} catch (Exception e) {}
		return resp;
	}
	
	public ResponseMsg createRol(RequestPostRol query) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Rol> roles = this.rolRepository.findByNombre(query.getNombre());
			if (roles.size() > 0)
				throw new Exception("Rol ya existe");
			
			Rol userRol = new Rol();
			userRol.setNombre(query.getNombre());
			userRol.setEstado("A");
			//Busca Referencia de los roles en base
			for(String idApp: query.getAplicaciones()) {
				List<Aplicacion> aplicaciones = this.aplicacionRepository.findById(idApp);
				if(aplicaciones.size()>0) {
					Aplicacion aplicacionNuevo = aplicaciones.get(0);
					if(!userRol.getAplicaciones().contains(aplicacionNuevo)) {
						userRol.getAplicaciones().add(aplicacionNuevo);
					}
					
				}
				
			}
			this.rolRepository.save(userRol);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	public ResponseMsg updateRol(String id, RequestPostRol query) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Rol> roles = this.rolRepository.findById(id);
			if (roles.size() <= 0)
				throw new Exception("Usuario no existe");
			
			Rol userRol = roles.get(0);
			userRol.setNombre(query.getNombre());
			//Busca Referencia de los roles en base
			for(String idApp: query.getAplicaciones()) {
				List<Aplicacion> aplicaciones = this.aplicacionRepository.findById(idApp);
				if(aplicaciones.size()>0) {
					Aplicacion aplicacionNuevo = aplicaciones.get(0);
					if(!userRol.getAplicaciones().contains(aplicacionNuevo)) {
						userRol.getAplicaciones().add(aplicacionNuevo);
					}
					
				}
				
			}
			this.rolRepository.save(userRol);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	public ResponseMsg cambiaEstadoRol(String id) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Rol> roles = this.rolRepository.findById(id);
			if (roles.size() <= 0)
				throw new Exception("Usuario no existe");
			
			Rol userRol = roles.get(0);
			if(userRol.getEstado().equals("A")) {
				userRol.setEstado("I");
			}else {
				userRol.setEstado("A");
			}
			
			this.rolRepository.save(userRol);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	/*
	 * Metodos de Aplicaciones
	 */
	
	public List<Aplicacion> aplicaciones() {
		List<Aplicacion> resp = new ArrayList<Aplicacion>();
		
		try {
			List<Aplicacion> aplicaciones = this.aplicacionRepository.findAll();
			resp= aplicaciones;
		} catch (Exception e) {}
		return resp;
	}
	
	public ResponseMsg createAplicacion(RequestPostAplicacion query) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Aplicacion> aplicaciones = this.aplicacionRepository.findByNombre(query.getNombre());
			if (aplicaciones.size() > 0)
				throw new Exception("Aplicacion ya existe");
			
			Aplicacion userAplicacion = new Aplicacion();
			userAplicacion.setNombre(query.getNombre());
			userAplicacion.setDescripcion(query.getDescripcion());
			userAplicacion.setEstado("A");
			
			this.aplicacionRepository.save(userAplicacion);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	public ResponseMsg updateAplicacion(String id, RequestPostAplicacion query) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Aplicacion> aplicaciones = this.aplicacionRepository.findById(id);
			if (aplicaciones.size() <= 0)
				throw new Exception("Aplicacion no existe");
			
			Aplicacion userAplicacion = aplicaciones.get(0);
			userAplicacion.setNombre(query.getNombre());
			userAplicacion.setDescripcion(query.getDescripcion());
			
			this.aplicacionRepository.save(userAplicacion);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
	
	public ResponseMsg cambiaEstadoAplicacion(String id) {
		ResponseMsg resp = new ResponseMsg("ERROR");
		
		try {
			List<Aplicacion> aplicaciones = this.aplicacionRepository.findById(id);
			if (aplicaciones.size() <= 0)
				throw new Exception("Aplicacion no existe");
			
			Aplicacion userAplicacion = aplicaciones.get(0);
			if(userAplicacion.getEstado().equals("A")) {
				userAplicacion.setEstado("I");
			}else {
				userAplicacion.setEstado("A");
			}
			
			this.aplicacionRepository.save(userAplicacion);
			resp = new ResponseMsg("OK");
			
		} catch (Exception e) {
			resp.setMessage(e.getMessage());
			
		}
		return resp;
	}
}
