FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Copy the built jar
COPY target/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

CMD ["java", "-jar", "app.jar"]
