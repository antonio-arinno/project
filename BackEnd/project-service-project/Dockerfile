FROM openjdk:17
VOLUME /tmp
ADD ./target/project-service-project-0.0.1-SNAPSHOT.jar service-project.jar
ENTRYPOINT ["java","-jar","/service-project.jar"]