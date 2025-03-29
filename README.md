React User Management WEB App:--

This is a simple React-based User Management System that allows you to view, edit, delete, and search/filter users.
User data is fetched from the public API Reqres.in.
The project is built using React + Vite, Axios, Tailwind CSS, and React Toastify for notifications.

Live link-                               
https://user-management-assignment-k4o3.onrender.com/                

Project Structure------->

├──src/                         
│   ├── pages/                                
│   │   └── Login.jsx                            
 │   │   └── User.jsx                                  
│   ├── App.jsx                            
│   ├── main.jsx                               
│   └── index.css                                      
├── package.json                  
└── README.md

Installation & Running the Project:--

1. Clone the Repository                        
git clone https://github.com/anshulroy1511/user-management-Assignment.git
cd reqres-user-management

2. Install Dependencies                      
npm install

3. Start the Development Server                     
npm run dev                 
The app will run at http://localhost:5173 .

Technologies Used-------->

React + Vite                   
Tailwind CSS                
Axios           
React Toastify                       
Reqres API (for dummy data)

Features---->

User Authentication (Login)                        
List Users with Pagination               
Edit User Details in Modal Popup            
Delete User           
Real-time Search & Filtering              
Responsive UI with Tailwind CSS           
Error & Success Notifications


How It Works------>

1. Login                
The app starts with a Login Page.           
On login, it sends a POST request to https://reqres.in/api/login.              
If successful, it navigates to the Users List Page.

2. User List with Pagination              
Fetches users from the API: https://reqres.in/api/users?page={page}.                       
Displays user details in a grid with Prev & Next buttons.                       
Pagination controlled by the page state.

3. Edit User                              
Each user card has an Edit button.                                             
Clicking it opens a modal form with pre-filled data.                                 
On submit, sends a PUT request to update user data.                                
Updates are reflected instantly in the UI.                               

4. Delete User                            
Each user card has a Delete button.                                   
On click, sends a DELETE request and removes the user from the UI.

5. Search & Filter                             
A search bar allows filtering users by Name or Email.                              
It filters the displayed users in real-time using client-side filtering.

Assumptions & Considerations----->

API used is a Mock API (https://reqres.in/), changes are not permanent.                        
Token from login is not stored; navigation is conditional.                  
No backend or database is used; only client-side operations.                      
Pagination & search work only on available data in API response
