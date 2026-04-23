# ITMD 504 Programming and Application Foundations - Summative Course Assessement Project

## High Level Deployment Overview

Deploying the `course-tracker` application is done with the following high level steps:

1. Create the VM with Terraform.
2. Configure the VM with Ansible
3. Deploy the application source code to remote server
4. Initial application configuration (frontend and backend)
5. Application updates and mainteance

---

## Deploy Details

### Virtual Machine Deploy with Terraform

Refer to Terraform build instructions in [README](https://github.com/mariuszczyz/itmd-504-final/blob/master/terraform/README.md)

### Virtual Machine Configuration with Ansible

Before the `course-tracker` application can be deployed the AWS instance created in the previous step must be configured for the application to run.
VM configuration is done with a very simple single file Ansible playbook.
Follow instructions in this [README](https://github.com/mariuszczyz/itmd-504-final/blob/master/ansible/README.md)

### Manual Application Deploy

Connect to the AWS instance

```bash
ssh -i ~/.ssh/id_ed25519 ec2-user@<INSTANCE PUBLIC IP>
```

Clone the application code:

```bash
cd ~
git clone git@github.com:mariuszczyz/course-tracker.git
cd course-tracker
```

Load the `course-tracker` database schema and pre-seed the DB with data

```bash
mariadb -u tracker -p <DB PASSWORD> < ~/course-tracker/backend/setup.sql
```

### Backend (Flask)

```bash
cd ~/course-tracker/backend
pip install -r requirements.txt
cp .env.example .env   # fill in your MySQL password
python app.py          # http://localhost:5000
```

### Frontend (React production build)

```bash
cd ~/course-tracker/frontend
```

Point the app at the live API before building:

```
echo "REACT_APP_API_URL=http://<EC2_PUBLIC_IP>/api" > .env.production
```

Build the fronend:

```
npm install
npm run build          # creates frontend/build/
```

---

## Application Components

Backend (backend/)
  - app.py - Flask app with all 4 CRUD routes (GET, POST, PUT, DELETE)
  - requirements.txt - application dependency modules
  - .env.example - template for DB credentials
  - setup.sql - creates the `course_tracker` database and `courses` table with dummy data

Frontend (frontend/)
  - public/index.html - Bootstrap 5 loaded via CDN
  - src/index.js - React entry point
  - src/App.js - root component, manages courses list, handles fetch calls for all CRUD operations
  - src/components/CourseTable.jsx - table displaying course details
  - src/components/CourseForm.jsx -add/edit form

---

## How to run locally

### Seed the Database with dummy data (one time)

```bash
mysql -u root -p < backend/setup.sql
```

### Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # fill in your MySQL password
python app.py          # http://localhost:5000
```

### Frontend (React build)

```bash
cd ~/final/frontend
```

Build:

```bash
npm install
npm run build          # creates frontend/build/
```

### Verify

```bash
curl http://localhost/api/courses      # should return JSON array
```

Open http://127.0.0.1:5000 in a browser — the Course Tracker UI should load.

## Updating after a code change

```bash
cd ~/final
git pull
```

Rebuild frontend if any frontend file changed:

```bash
cd frontend && npm run build && cd ..
```
