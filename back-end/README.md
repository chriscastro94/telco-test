# Springboot ConsulTI Template

### Es importante no cambiar los archivos de configuración y/o puertos ya establecidos

Este es un proyecto para demostrar el uso de la herramienta Springboot

## Para comenzar:

### Clonar el repositorio

```shell
git clone https://github.com/ErickEspinozaT/consulti-template-springboot.git
```

### Instalar paquetes maven

Instalar los paquetes npm descritos en el archivo `pom.xml` e iniciar el proyecto:

```shell
mvn clean install

mvn spring-boot:run
```

El comando `mvn spring-boot:run` arranca la aplicación, observa cambios del código fuente y se accede a traves del puerto `5000`

Para apagar el server manualmente usar `Ctrl+C`



### Base datos Mongo
En el properties del proyecto MAVEN Springboot se debe configurar las credenciales del mongo:

```
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.authentication-database=admin
spring.data.mongodb.username=admin
spring.data.mongodb.password=admin
spring.data.mongodb.database=telco-test
```

Para restaurar la base de datos ejecutar el comando

```shell
mongorestore -h host:port -d telco-test.\bd\telco-test
```
