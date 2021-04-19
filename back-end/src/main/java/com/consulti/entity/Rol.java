package com.consulti.entity;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Rol {

	@Id
	String id;
	String nombre;
	@DBRef
	ArrayList<Aplicacion> aplicaciones;
	/*
	 * Estados: A (Activo) - I (Inactivo)
	 */
	String estado;
	
	public Rol() {
		super();
		// TODO Auto-generated constructor stub
		this.aplicaciones = new ArrayList<Aplicacion>();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public ArrayList<Aplicacion> getAplicaciones() {
		return aplicaciones;
	}

	public void setAplicaciones(ArrayList<Aplicacion> aplicaciones) {
		this.aplicaciones = aplicaciones;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}



	

	
}
