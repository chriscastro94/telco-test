package com.consulti.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.consulti.entity.Rol;

public interface RolRepository extends MongoRepository<Rol, Long> {
	
	List<Rol> findById(String paramString);
	List<Rol> findByNombre(String paramString);
}
