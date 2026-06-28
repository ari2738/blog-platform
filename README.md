✍️ BlogSpace - Full Stack Blog Platform
A modern, full-stack blogging platform where users can read, write, and share stories. Built with Django REST Framework and React.

🌐 Live Demo
Frontend: Coming soon (Vercel)
Backend API: Coming soon (Render)

**screenshots**

<img width="1903" height="910" alt="image" src="https://github.com/user-attachments/assets/ba3ac266-027f-4c17-b1a1-89966e927505" />


<img width="1897" height="905" alt="Screenshot 2026-06-28 151031" src="https://github.com/user-attachments/assets/adcf9d99-bc3d-47a5-aaa8-53fcc9dd9c31" />


<img width="1902" height="915" alt="Screenshot 2026-06-28 151213" src="https://github.com/user-attachments/assets/d8980add-70b6-4f29-a9d2-774055cf5d65" />


<img width="1897" height="900" alt="Screenshot 2026-06-28 151058" src="https://github.com/user-attachments/assets/9178fd99-c943-4ab3-aaad-9ede3f53da55" />



✨ Features

👤 Authentication

User registration and login
JWT token-based authentication
Auto token refresh
Protected routes

📝 Blog Posts

Create, edit, delete blog posts
Rich markdown editor
Cover image upload with drag & drop
Category tagging
Reading time calculation
View counter

💬 Comments

Add comments on posts
Nested replies
Delete own comments

❤️ Interactions

Like / Unlike posts
Bookmark / Save posts
Share post link
Search posts by title, category or author

🎨 UI/UX

Responsive design (mobile + desktop)
Dark / Light mode toggle
Animated hero section
Smooth hover animations on cards
Category filter pills
Pagination

🛠️ Tech Stack

Backend
Technology	Purpose
Django 6.0	Web framework
Django REST Framework	REST API
SimpleJWT	JWT Authentication
SQLite (dev)	Local database
PostgreSQL (prod)	Production database
Pillow	Image handling
Django CORS Headers	CORS management

Frontend

Technology	Purpose
React 19	UI framework
Vite	Build tool
Tailwind CSS	Styling
React Router v6	Client-side routing
Axios	HTTP requests
React Hot Toast	Notifications
MD Editor	Rich text editor


🚀 Getting Started
Backend Setup
# Clone the repo
git clone https://github.com/ari2738/blog-platform.git
cd blog-platform

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver 8001
Frontend Setup
cd blog-frontend

# Install dependencies
npm install

# Start dev server
npm run dev
📡 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register/	Register user
POST	/api/auth/login/	Login user
POST	/api/auth/token/refresh/	Refresh token
GET	/api/auth/profile/	Get profile
GET	/api/posts/	List all posts
POST	/api/posts/	Create post
GET	/api/posts/:id/	Get post detail
PUT	/api/posts/:id/	Update post
DELETE	/api/posts/:id/	Delete post
GET	/api/posts/:id/comments/	Get comments
POST	/api/posts/:id/comments/	Add comment
POST	/api/posts/:id/like/	Like/Unlike post
GET	/api/users/:id/posts/	Get user posts
👩‍💻 Developer
Abirami S

GitHub: @ari2738
LinkedIn: Abirami Shanmugam
📄 License
This project is built for Thiranex Internship Program.

© 2026 BlogSpace. All rights reserved.
