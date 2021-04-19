package com.consulti.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.consulti.entity.Aplicacion;

public interface AplicacionRepository extends MongoRepository<Aplicacion, Long> {
	
	List<Aplicacion> findById(String paramString);
	List<Aplicacion> findByNombre(String paramString);
}
