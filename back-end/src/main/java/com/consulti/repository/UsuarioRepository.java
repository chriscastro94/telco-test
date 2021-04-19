package com.consulti.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.consulti.entity.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, Long> {
	
	List<Usuario> findById(String paramString);
	List<Usuario> findByUsuario(String user);
	List<Usuario> findByUsuarioAndPassword(String user, String pass);
}
