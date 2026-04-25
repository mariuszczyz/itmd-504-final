# User Stories — College Course Tracker

## User-Story-1: View All Courses
**As a** student,  
**I want to** see my enrolled courses in one place,  
**So that** I can check my current and past schedule at a glance.  
**Acceptance Criteria:**
- The dashboard loads an empty table if no courses exist, or displays all enrolled records.
- Columns must show: Course Number, Title, Credit Hours, Semester, Status, and Grade.
- Data loads on page without requiring a manual refresh or button press.

---
## User-Story-2: Add a New Course
**As a** student,  
**I want to** add courses manually,  
**So that** I can update my tracker when enrollment changes.  
**Acceptance Criteria:**
- The add-form contains input fields for: Course Number, Title, Credit Hours, Semester, Status, and Grade (optional).
- The submit button stays disabled until all required fields pass format validation.
- On successful save, the new record inserts into the dashboard table immediately without a page reload.

---
## User-Story-3: Edit an Existing Course
**As a** student,  
**I want to** modify course details after adding them,  
**So that** I can fix typos or update my progress.  
**Acceptance Criteria:**
- Clicking Edit on any row opens a modal panel pre-filled with that course's data.
- Saving writes the changes to the database and updates the dashboard row in place.
- Clicking Cancel closes the form without saving or sending an API request.

---
## User-Story-4: Delete a Course
**As a** student,  
**I want to** remove courses I’ve dropped or completed,  
**So that** my active list stays manageable.  
**Acceptance Criteria:**
- Each row includes a Delete button.
- Confirming removes the record from both the UI and database.

---
## User-Story-5: View Course Details
**As a** student,  
**I want to** see the full record for any single course,  
**So that** I can review course info and final grades.  
**Acceptance Criteria:**
- Clicking a course row opens a detail view containing all stored fields.
- The Grade field shows "N/A" or remains blank until a value is assigned.

---
## User-Story-6: Persistent Data Storage
**As a** student,  
**I want** my course data saved to a database,  
**So that** records survive browser refreshes or accidental closures.  
**Acceptance Criteria:**
- All create, read, update, and delete operations execute against a MySQL database via API calls.
- Page refreshes or reopening the app fetch and render the latest stored records automatically.

---
## User-Story-7: Cross-Device Access
**As a** student,  
**I want to** access the app through any standard web browser,  
**So that** I can use it from my laptop or phone without native app installation.  
**Acceptance Criteria:**
- The application is deployed to a public cloud endpoint.
- The deployment URL remains live and responsive.
