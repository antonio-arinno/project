FROM openjdk:17
VOLUME /tmp
EXPOSE 8090
ADD ./target/project-service-gateway-server-0.0.1-SNAPSHOT.jar service-gateway-server.jar
ENTRYPOINT ["java","-jar","/service-gateway-server.jar"]