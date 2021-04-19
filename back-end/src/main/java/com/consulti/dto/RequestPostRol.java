package com.consulti.dto;

import java.util.ArrayList;

public class RequestPostRol {

	
	String nombre;
	ArrayList<String> aplicaciones;
	
	public RequestPostRol() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public ArrayList<String> getAplicaciones() {
		return aplicaciones;
	}
	
	public void setAplicaciones(ArrayList<String> aplicaciones) {
		this.aplicaciones = aplicaciones;
	}

	

}
