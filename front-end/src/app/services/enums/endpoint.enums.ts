export enum SessionEndpoint {
  Login = `/consultiAPI/login`,
  

  /*
	 * Metodos de Usuario
	 */
	
  users = `/consultiAPI/users`,
  createUser = `/consultiAPI/createUser`,
  updateUser = `/consultiAPI/updateUser`,
  cambiaEstadoUser = `/consultiAPI/cambiaEstadoUser`,

  /*
	 * Metodos de Rol
	 */
  roles = `/consultiAPI/roles`,
  createRol = `/consultiAPI/createRol`,
  updateRol = `/consultiAPI/updateRol`,
  cambiaEstadoRol = `/consultiAPI/cambiaEstadoRol`,


  /*
	 * Metodos de Aplicaciones
	 */
  aplicaciones = `/consultiAPI/aplicaciones`,
  createAplicacion = `/consultiAPI/createAplicacion`,
  updateAplicacion = `/consultiAPI/updateAplicacion`,
  cambiaEstadoAplicacion = `/consultiAPI/cambiaEstadoAplicacion`,




}

export enum MetadataEndpoint {
  Login = `/consultiAPI/login`,
}
