🤖 AI Assistant Project Context

This file provides context for an AI assistant to understand the project structure, goals, and conventions.

1. 🚀 Project Overview

I am building a web application with a separated frontend and backend. The application allows public users to register, submit complaints, and view public announcements. A key feature is an admin panel where administrators can review complaints, update their status (e.g., 'submitted', 'in_progress', 'resolved'), add remarks, and post new announcements.

Core Features: User Registration, Complaint Submission, Complaint Management (by Admins), Announcements.

2. 💻 Technology Stack

Backend: Laravel 12.35.1

Frontend: React 19.2.0 (in a separate repository/folder)

Database: PostgreSQL

3. 📦 Key Database Models & Schema

We have three main tables: users, complaints, and announcements.

users table

Used for both regular users and admins, differentiated by a role column.

id (Primary Key)

first_name (string)

last_name (string)

email (string, unique)

password (string, hashed)

role (string, default: 'user'. Can also be 'admin')

timestamps

complaints table

This is the core table for user-submitted issues.

id (Primary Key)

user_id (Foreign Key -> users.id. The user who submitted it)

subject (string)

description (text)

type (string, e.g., 'Bug Report', 'Feedback')

status (string, default: 'submitted'. e.g., 'in_progress', 'resolved')

remarks (text, nullable. For admin comments)

admin_id (Foreign Key -> users.id, nullable. The admin who handled it)

timestamps

announcements table

Used by admins to post updates.

id (Primary Key)

title (string)

description (text)

author_id (Foreign Key -> users.id. The admin who posted it)

timestamps

4. 🧩 Eloquent Model Relationships

User Model:

hasMany(Complaint::class, 'user_id') -> complaints

hasMany(Complaint::class, 'admin_id') -> handledComplaints

hasMany(Announcement::class, 'author_id') -> announcements

Complaint Model:

belongsTo(User::class, 'user_id') -> user

belongsTo(User::class, 'admin_id') -> admin

Announcement Model:

belongsTo(User::class, 'author_id') -> author

5. 🎨 CSS & Frontend Preferences

When generating any website CSS, I want you to consider the following base styles:

@import url('[https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap](https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap)');

* {
  box-sizing: border-box;
  text-decoration: none;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 10px;
}

body {
  width: 100%;
  min-height: 100vh;
  overflow-x: auto;
  overflow-y: auto;
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
}



6. 🎯 Current Task

(You can update this section with your current goal)

My current focus is: "Implementing the functionality for the registration and login page as well as setting up the required API endpoints and logic." 