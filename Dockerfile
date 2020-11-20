# Imagem de Origem
FROM node:13-alpine

# Argumento do docker-compose
ARG PATH_TO_PROJECT_DIR

# Diretório da aplicação
WORKDIR /app

# Copia os arquivos da aplicação para dentro do container
COPY ${PATH_TO_PROJECT_DIR}/* /app/

# Instalando dependencias da aplicação
RUN yarn

# Compilando Typescript
RUN rm -rf build
RUN yarn build