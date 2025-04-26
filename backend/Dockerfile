# Step 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Run the Spring Boot application using a lightweight JDK
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot app uses (usually 8080)
EXPOSE 8080

# Start the app
ENTRYPOINT ["java", "-jar", "app.jar"]
