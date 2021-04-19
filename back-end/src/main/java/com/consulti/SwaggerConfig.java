package com.consulti;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import springfox.documentation.service.Contact;

@Configuration
@EnableSwagger2
public class SwaggerConfig {                                    
    @Bean
    public Docket api() { 
        return new Docket(DocumentationType.SWAGGER_2)  
          .select()                                  
          .apis(RequestHandlerSelectors.basePackage("com.consulti"))              
          .paths(PathSelectors.any())                          
          .build()
          .apiInfo(metaInfo());                                           
    }
    
    private ApiInfo metaInfo() {
    	ApiInfo info = new ApiInfo(
          "consulti", 
          "consulti API REST", 
          "API TEST", 
          "Terms of service", 
          new Contact("Christian Castro", "http://consulti.com.ec/", "desa@consulti.com.ec"), 
          "License of API", "API license URL");
    	return info;
   }
}
