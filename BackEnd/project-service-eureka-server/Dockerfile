FROM openjdk:17
VOLUME /tmp
EXPOSE 8761
ADD ./target/project-service-eureka-server-0.0.1-SNAPSHOT.jar service-eureka-server.jar
ENTRYPOINT ["java","-jar","/service-eureka-server.jar"]