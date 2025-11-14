## Next Steps

1. **Protected Routes** - You may want to create a ProtectedRoute component to guard routes that require authentication
2. **User Dashboard** - Update the UserDashboard to display user information from the auth context
3. **Logout Functionality** - Add logout buttons in your Navbar or user menu
4. **Password Reset** - Implement forgot password functionality
5. **Admin Panel** - Create admin-only routes and components

To begin, I want you to update the factory and seeders to reflect the changes in the migration and model of this project as well as other related files. Additionally, I want you to update the auth controller to reflect the changes in the model and migration of this project as well as other related files. I also want you to do the next steps you have written at the end of the setup instructions.
I want you to add a login link to the navbar for new visitors and a logout link for authenticated users. I want you to create a link that displays the user's name if they are authenticated and a login link if they are not. After the user registers or logs in, it should redirect to the dashboard. One more thing, when the user goes to the dashboard and they aren't registered or haven't logged in, it should redirect them to the login page. When the user logs out, it should redirect them to the login page. In the dashboard, there are buttons to go to the filing of complaint and the complaints history. I want you to implement the functionality for the filing of complaint and the complaints history. When the user clicks on the filing of complaint, it should redirect them to the complaint form. When the user clicks on the complaints history, it should redirect them to the complaints history page. The user should be able to file a complaint and see their complaints history. 


When I try to file a complaint, it throws this error "SQLSTATE[23502]: Not null violation: 7 ERROR: null value in column "user_id" of relation "complaints" violates not-null constraint DETAIL: Failing row contains (52, null, Test, asdasdadd, dsds, submitted, null, null, 2025-11-10 21:21:11, 2025-11-10 21:21:11). (Connection: pgsql, SQL: insert into "complaints" ("subject", "description", "type", "updated_at", "created_at") values (Test, asdasdadd, dsds, 2025-11-10 21:21:11, 2025-11-10 21:21:11) returning "id")". Also, when I check the complaints list, it only shows "No complaints found". I want you to fix these problems. Additionally, I want to you to improve the validation of registration and log in forms. I also want you to improve the error handling of the complaint form and the complaints history page. I want you to add another field for "Confirm Password" in the registration form. With that, I want you to update all the related files to reflect the changes in the registration form. I want you to add a loading state to the complaint form and the complaints history page. Also, if there is no functionality for the "Remember Me" in the login form, I want you to add it. I also want you to remove the "Forgot Password" link since we won't be using that yet.

Ensure that the font size and font used for the Logout button is the same as the format used for the other navbar links.

I want you to improve the recent complaints section in the dashboard. It should also display the type and a short brief description of the complaint while the rest of the description should be hidden by using, for example, dots.I also want you to add a functionality to the recent complaints section to view the complaint details.

When logging out, it should not redirect them to the login page, it should redirect them to the home page.

I want you to use and include the ComplaintsAdmin component and AdminBulletin component in the website. But they should not be accessible to the residents and normal users, it should only be accessible by admins through api links like /admin/complaints and /admin/bulletin. Additionally, before they can access the admin pages, the admin must first verify their identity by logging in. For the admin's login page, you can use the LoginPage component but change it to be more admin-like.

When I logout as a user, it still redirects me to the login page. I want you to fix this problem. It should redirect to the landing page.

I want you add a validation for the admin login form to only allow admins to log in. 

I want you to create an admin dashboard and admin bulletin page. The admin dashboard displays the summary of total complaints, complaints in progress, resolved complaints, and dismissed complaints. It will also complain buttons for view complaints list, Add announcements (in the admin bulletin page). Additionally, after the admin logs in, it should redirect them to the admin dashboard.

With all these changes, I want you to update the seeder and factory files to reflect the changes in the model and migration of this project as well as other related files. I also want you to update the seeder for users to only create 1 admin.

In the users dashboard, I want you to improve the design of the recent complaints section. There are a lot of unused spaces in the tab or box of the 3 recent complaints records. I want you to improve the design of the recent complaints section to make it more compact and organized.

I want you to add the necessary functionality to the admin complaint list page. It should display all of the complaints and allow the admin to view the details of each complaint. 

No complaint is being displayed in the admin complaint list page. I want you to fix this problem. For context, it should display all the complaints of all the users. If you're having trouble with implementing this, you can look at the logic you made in the ComplaintsHistory component for users.

I want you to add the necessary functionality to the admin bulletin page. The admin bulletin page should have section for adding new announcements and a section for viewing all announcements. The added announcements should be stored in the table for announcements in the database and displayed in the admin bulletin page.

Upon loading the admin bulletin page, it shows "Failed to fetch announcements." Also, when I try to post an announcement, it shows "An error occurred while posting the announcement." I want you to fix this problem.

I want you to add the necessary functionality to the user bulletin page. The user bulletin page should display all of the announcements from the admins and allow the user to view the details of each announcement. The details of a announcement should be displayed in a popup modal. I want you to follow the similar design of the admin bulletin page.