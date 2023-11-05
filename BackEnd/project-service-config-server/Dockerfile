FROM openjdk:17
VOLUME /tmp
EXPOSE 8888
ADD ./target/project-service-config-server-0.0.1-SNAPSHOT.jar service-config-server.jar
ENTRYPOINT ["java","-jar","/service-config-server.jar"]