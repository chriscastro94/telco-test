FROM node:14.15.1 as node

WORKDIR /app
# Copio package.json
COPY package.json /app/package.json
# Instalo dependencias
RUN npm install
# Copio los archivos restantes
COPY ./ /app/
# Build del ambiente con build prod para la optimización del código y envió argumento para el path
ARG ambiente=${ambiente}
RUN npm run build -- --prod --configuration=$ambiente

#Descarga de imagen de nginx
FROM nginx:alpine

#En este argumento se debe definir la ruta donde se encuentra la configuración de 
#nginx.conf dentro del proyecto 
ARG nginx_conf=${nginx_conf}

#se eliminan archivos anteriormente utilizados para invalidar caché
RUN rm -rf /usr/share/nginx/html/*

#se copian los archivos de certificados, configuración de nginx y el render html de la aplicacion
COPY $nginx_conf /etc/nginx/nginx.conf
COPY --from=node /app/dist /usr/share/nginx/html
