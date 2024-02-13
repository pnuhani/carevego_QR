# cat Dockerfile
FROM mysql:latest

#MAINTAINER baeldung.com

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_ROOT_PASSWORD
#ARG MYSQL_PORT

ENV MYSQL_DATABASE=cooling
ENV MYSQL_USER=richa
ENV MYSQL_PASSWORD=carevego123
ENV MYSQL_ROOT_PASSWORD=carevego123
ENV MYSQL_PORT=3306


#ADD data.sql /etc/mysql/data.sql

#RUN sed -i 's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' /etc/mysql/data.sql
#RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306