### 1. Clone the repository

```bash
git clone https://github.com/avruzanna/taskmanager.git

cd taskmanager

npm install


### 2. Create database


cd taskmanager

### 3. Create .env file and add this info

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postpas
DB_NAME=taskmanager
NODE_ENV=development
JWT_SECRET=EnvSecretKey
JWT_EXPIRES_IN=3600

### 4. Run the application

npm run start:dev

### 5. Server will be run 

http://localhost:3000

### 6. API Endpoints
POST /auth/register 
POST /auth/login 


```sql
-- Create Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
