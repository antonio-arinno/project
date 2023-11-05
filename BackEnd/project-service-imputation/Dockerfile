FROM openjdk:17
VOLUME /tmp
ADD ./target/project-service-imputation-0.0.1-SNAPSHOT.jar service-imputation.jar
ENTRYPOINT ["java","-jar","/service-imputation.jar"]