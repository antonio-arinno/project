FROM openjdk:17
VOLUME /tmp
ADD ./target/project-service-user-0.0.1-SNAPSHOT.jar service-user.jar
ENTRYPOINT ["java","-jar","/service-user.jar"]