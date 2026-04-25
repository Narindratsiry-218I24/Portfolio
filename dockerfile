FROM nginx:alpine

# Copie de la configuration personnalisée (si vous en avez une)
COPY nginx.conf /etc/nginx/nginx.conf

# Copie des fichiers statiques
COPY . /usr/share/nginx/html

EXPOSE 80