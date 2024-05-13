<h1><centre><img src="Images/QuickFix-logo.png" height="40px" width="70px"> Project QuickFix</h1></centre>

<h2>About</h2>
An online platform for college students where they can know TAs better and book slots with ease. This platform is helpful not only for students but also for TAs and professors. TA can release slots according to their convenience and save time by giving FAQs for a particular assignment. Professor can track the performance of the TA by the review given by the students after each TA session.
<br><br>
<h2>🌟 Technologies To Be Used</h2>
<ul>
 <li>ReactJS</li>
 <li>ExpressJS and MongoDB with NodeJS for the backend</li>
 <li>Authentication using JWT</li>
 <li>Typescript</li>
 <li>Nodemailer</li>   
 <li>Webpack with ESLint, Prettier</li>
 <li>SCSS for styling</li>
</ul>
<br><br>

<h2>Installation Steps</h2>
<ol>
    <li>
        <h3>Frontend</h3>
        <code>
            npm install
        </code>
    </li>
    <li>
        <h3>Backend</h3>
        <p>Add .env file at root of backend folder and add</p>
        <ul>
            <li>JWT_TOKEN=Your JWT TOKEN</li>
            <li>DB_URL=mongodb://localhost:27017</li>
            <li>DB=quickfix</li>
            <li>PORT=3001</li>
            <li>EMAIL=Your Email ID</li>
            <li>PASSWORD=Email ID password</li>
        </ul>
        <br/>
        <p>and then run <code>npm install</code></p>
    </li>
</ol>
<br><br>


<h2>✅ User Stories</h2>

<h3>Client- Teaching Assistant:</h3>
<ul>
<li>View details of: </li>
<ul>
<li>Course professor</li>
<li>All the students in the course</li>
</ul>
<li>Able to enter his basic information which will be visible to all the course students (LinkedIn URL / course-related information)</li>
<li>Able to post the most frequently asked student doubts to save time</li>
<li>Able to post his availability for scheduling the meeting</li>
<li>Will receive emails on meetings being scheduled by students</li>
</ul>
<br>

<h3>Client- Student:</h3>
<ul>
<li>View details of:</li>
<ul>
<li>Courses the student is enrolled in</li>
<li>List of professor and teaching assistants for each course</li>
<li>Each TA (Their information such as LinkedIn profile and work experience)</li>
<li>FAQs related to various assignments and general queries</li>
</ul>
<li>Able to book a slot with TA and receive an email for the scheduled meeting</li>
</ul>
<br>

<h3>Future Scope<h3>
<hr>
<h3>Client- Professor: </h3>
<ul>
<li>View details of: </li>
<ul>
<li>All students and teaching assistants in the course</li>
<li>Total hours booked by students for each TA for doubt clarification</li>
<li>TA hour utilization in terms of a graph/report (Pie chart)</li>
<li>General FAQs posted by TAs for all the assignments</li>
<li>Ratings given by students to each TA</li>
</ul>
<li>Able to post office hours for students to book slots for doubts</li>
<li>Will receive emails on meetings being scheduled by students</li>
</ul>
<br><br>

<h3>Client- Student: </h3>
<ul>
<li>Able to book a slot with Professor and receive an email for the scheduled meeting</li>
</ul>
<br><br>

<h2>📊 Domain Model</h2>
<img src="Images/DDD.jpeg" title="DDD">
<br><br><br>

<h2> Service Models </h2>
<hr>
<br>
<h3> Authorization </h3>
<img src="Images/Authentication.png" title="Authentication">
<br><br><br>
<h3> Slot Booking </h3>
<img src="Images/Slot Booking.png" title="Slot Booking">
<br> <br>

