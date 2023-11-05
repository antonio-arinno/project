FROM openjdk:17
VOLUME /tmp
EXPOSE 9100
ADD ./target/project-service-oauth-0.0.1-SNAPSHOT.jar service-oauth.jar
ENTRYPOINT ["java","-jar","/service-oauth.jar"]