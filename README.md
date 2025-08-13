# Secret Santa App

This is a Next.js application that implements a Secret Santa game. The application allows users to upload a CSV file containing employee information, generates secret child assignments according to specified rules, and provides an option to download the results as a CSV file.

## Features

- Upload a CSV file with employee details.
- Parse the CSV file to extract employee information.
- Generate secret child assignments while adhering to the rules (no self-assignments and no repeat assignments from the previous year).
- Display the list of employees along with their assigned secret children.
- Download the generated assignments as a CSV file.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation (Local)

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd secret-santa-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

The application will be available at `http://localhost:3000`.




### Running in Docker

1. Build the Docker image

  ```
   docker build -t secret-santa-app .
   ```

2. Run the container

  ```
   docker run -p 3000:3000 secret-santa-app
   ```
   The application will be available at `http://localhost:3000`.



      ### Example Dockerfile
      Here’s a sample Dockerfile you can place in your project root:

      # Use official Node.js image
      FROM node:18-alpine

      # Set working directory
      WORKDIR /app

      # Copy package.json and package-lock.json
      COPY package*.json ./

      # Install dependencies
      RUN npm install

      # Copy the rest of the app
      COPY . .

      # Build the Next.js app
      RUN npm run build

      # Expose port
      EXPOSE 3000

      # Run the Next.js app
      CMD ["npm", "start"]


### Usage

1. Upload a CSV file containing employee information on the main page.
2. After uploading, the application will parse the file and generate secret child assignments.
3. View the results on the results page.
4. Download the assignments as a CSV file using the provided button.


### Sample CSV Files for Testing
Two sample CSV files are provided in the data/ directory:
   Example employee list to upload:
   Example previous year’s assignments to test the “no repeat” rule:
   You can upload these files directly from the main page of the app to quickly test its functionality.
