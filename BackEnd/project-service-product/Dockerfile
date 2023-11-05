FROM openjdk:17
VOLUME /tmp
ADD ./target/project-service-product-0.0.1-SNAPSHOT.jar service-product.jar
ENTRYPOINT ["java","-jar","/service-product.jar"]