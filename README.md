## Overview
A message board where users can sign up, log in, and post messages. Membership status controls access to certain features, and admins can delete messages.
**Note:** This project is still in progress.

## Features
- User authentication with **Passport.js** and hashed passwords using **bcrypt**.  
- Users have first name, last name, username (email), password, membership status, and optional admin flag.  
- Members can see authors and timestamps of messages; non-members see only message content.  
- Admins can delete any message.  
- Sign-up validation, including password confirmation and form sanitization.  

## Technologies
- Node.js
- Express  
- PostgreSQL   
- Passport.js for authentication  
- bcrypt for password hashing  
- express-validator for form validation 
