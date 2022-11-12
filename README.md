# info6150-assignment8
Assignment 8 Submission

to run a application 
run npm start 


Created APIs with 

user/create
it creates the new Users with email, name, password
password is encrypted 
all fields are validated. and api returns error object for each invalid fields.

user/delete
it deletes the user based on the email.
incase of invalid email api returns error object.

user/edit
it edits the user by taking email. we can name and password but we can edit email.
all fields are validated. and error object is displayed for each invalid fields.

user/getAll
it get all the records with users 
