Create a complete, modern, professional and fully responsive web application called:

"SmartCity – Citizen Services & Complaint Management System"

IMPORTANT:
Build this as a functional web application/prototype, not just a static UI mockup. All navigation, forms, buttons, filters, complaint tracking, admin functions and interactions should work in the prototype.

The application should look like a real-world Smart City / Digital Government platform suitable for a college final-year project and portfolio.

==================================================

1. TECHNOLOGY & GENERAL REQUIREMENTS
   ==================================================

Use:

* React
* JavaScript
* Modern component-based architecture
* Responsive HTML/CSS
* Lucide icons or another free icon library
* Local/mock data for the prototype
* localStorage-style persistence where supported

Do not depend on paid APIs.

For maps, use a free OpenStreetMap/Leaflet-style solution or a realistic interactive map mockup if external map functionality is unavailable.

Make the application work on:

* Desktop
* Laptop
* Tablet
* Mobile

Use reusable components and maintain a clean project structure.

==================================================
2. DESIGN SYSTEM
================

Create a professional Smart City visual identity.

Style:

* Modern
* Clean
* Minimal
* Government/digital-services inspired
* Technology-focused
* Trustworthy
* Professional

Use:

* White/light backgrounds
* Blue and teal accent colors
* Dark navy text
* Subtle shadows
* Rounded cards
* Modern typography
* Consistent spacing
* Clear hierarchy
* Professional icons
* Smooth hover animations
* Subtle page transitions

Do not make it look like a generic AI-generated template.

Create a SmartCity logo/wordmark using a simple city/building + technology concept.

==================================================
3. GLOBAL NAVIGATION
====================

Create a responsive navigation bar.

Logo:
SmartCity

Navigation:

* Home
* City Services
* Report Complaint
* Track Complaint
* Complaints
* City Monitoring
* Emergency
* Announcements
* About

Right side:

* Citizen Login / Profile
* Admin Login

On mobile:

* Use a hamburger menu
* Navigation should work correctly

Highlight the active page.

Create a footer containing:

* SmartCity logo
* Quick Links
* Citizen Services
* Emergency Contacts
* Contact Information
* Privacy / Terms placeholders
* Copyright

==================================================
4. HOME PAGE
============

Create an attractive hero section.

Heading:

"Building a Smarter, Safer and Better City"

Subtitle:

"One connected platform for citizen services, civic complaints, emergency assistance and smart city monitoring."

Buttons:

* Report a Complaint
* Explore City Services

Add a professional city/technology visual on the hero section.

Create a statistics section:

* Total Complaints
* Resolved Complaints
* Pending Complaints
* Active City Services

Statistics should update based on the complaint data where possible.

Create a feature section with cards:

1. Report Civic Issues
2. Track Complaints
3. City Services
4. Emergency Services
5. Smart Infrastructure
6. Citizen Support

Create "How SmartCity Works":

Step 1:
Report
"Submit a civic issue with location and details."

Step 2:
Track
"Monitor the progress of your complaint."

Step 3:
Resolve
"Authorities take action and update the status."

Add a final CTA:

"Help us build a better city."

Button:
"Report an Issue"

==================================================
5. CITY SERVICES PAGE
=====================

Create professional service cards for:

* Water Supply
* Electricity
* Waste Management
* Roads & Transportation
* Street Lights
* Public Parks
* Drainage
* Public Health
* Sanitation
* Public Safety

Each card must contain:

* Icon
* Service name
* Short description
* View Details button

Add search/filter functionality.

When "View Details" is clicked, show a detailed service panel/modal containing:

* Service description
* Common issues
* How to request the service
* Related contact information
* Report Issue button

==================================================
6. REPORT COMPLAINT PAGE
========================

Create a professional multi-section complaint form.

Fields:

Citizen Information:

* Full Name
* Email
* Phone Number

Complaint Information:

* Complaint Category
* Complaint Title
* Complaint Description
* Location
* Priority

Categories:

* Roads
* Garbage
* Water
* Electricity
* Street Lights
* Drainage
* Public Transport
* Sanitation
* Other

Priority:

* Low
* Medium
* High
* Critical

Optional:

* Upload Image

Add:

* Form validation
* Required field indicators
* Helpful validation messages
* Character counter for description
* Clear Submit button
* Reset button

When submitted:

1. Validate all fields.
2. Generate a unique Complaint ID such as:
   SC-2026-0001
3. Save the complaint.
4. Set initial status to:
   "Submitted"
5. Store the submission date/time.
6. Show a professional success screen.

Success screen must show:

"Complaint Submitted Successfully"

Complaint ID:
SC-2026-XXXX

Buttons:

* Track Complaint
* Submit Another Complaint

==================================================
7. TRACK COMPLAINT PAGE
=======================

Create a complaint tracking interface.

At the top:

"Track Your Complaint"

Input:
Complaint ID

Button:
Track Complaint

When a valid complaint ID is entered, display:

* Complaint ID
* Complaint Title
* Category
* Description
* Location
* Priority
* Date Submitted
* Current Status

Create a visual status timeline:

Submitted
↓
Under Review
↓
Assigned
↓
In Progress
↓
Resolved

Highlight completed/current stages.

Show status information:

Submitted:
Complaint received.

Under Review:
Complaint is being reviewed by the responsible department.

Assigned:
Complaint has been assigned to the relevant department.

In Progress:
Action is currently being taken.

Resolved:
The issue has been resolved.

If the complaint ID doesn't exist, show:

"Complaint not found. Please check your Complaint ID."

==================================================
8. COMPLAINTS PAGE
==================

Create a professional complaint management/list page.

Display complaints as a responsive table on desktop and cards on mobile.

Columns:

* Complaint ID
* Title
* Category
* Location
* Date
* Priority
* Status
* Action

Add:

Search:

* Complaint ID
* Title
* Location

Filters:

* Category
* Status
* Priority

Sort options:

* Newest
* Oldest
* Priority

Clicking a complaint opens a detailed view.

Use status badges:

Submitted
Under Review
Assigned
In Progress
Resolved

Use priority badges:

Low
Medium
High
Critical

==================================================
9. CITY MONITORING PAGE
=======================

Create a "Smart City Monitoring" page.

Display an interactive city map.

Use free OpenStreetMap/Leaflet if possible.

Show civic issue markers:

* Garbage Collection Required
* Full Waste Bin
* Damaged Street Light
* Road Damage
* Water Leakage
* Drainage Issue

Each marker should contain:

* Issue Type
* Location
* Status
* Priority
* Last Updated

Add filters:

All
Waste
Roads
Water
Electricity
Street Lights
Drainage

Add a side panel showing:

"Active City Issues"

Each issue card should show:

* Issue type
* Area
* Priority
* Status

Use realistic mock city locations.

Do not require a paid map API.

==================================================
10. EMERGENCY PAGE
==================

Create an emergency services page.

Cards:

Police
Ambulance
Fire & Rescue
Disaster Management
Women Safety
Child Helpline

Each card should contain:

* Icon
* Service name
* Description
* Emergency contact number
* Call button

Create a prominent emergency banner:

"In an emergency, contact the appropriate emergency service immediately."

Make emergency information easy to find.

==================================================
11. ANNOUNCEMENTS PAGE
======================

Create an announcements/news page.

Display announcement cards containing:

* Title
* Date
* Category
* Description
* Read More

Example announcements:

* Road Maintenance Update
* Water Supply Interruption
* Garbage Collection Schedule
* Public Transport Update
* Smart City Infrastructure Project
* Community Cleanliness Drive

Add category filtering.

==================================================
12. ABOUT PAGE
==============

Create an About SmartCity page.

Sections:

"About SmartCity"

Explain that the platform connects citizens and civic authorities through a digital platform for reporting, tracking and managing civic issues.

"Objectives"

* Improve citizen participation
* Improve complaint transparency
* Speed up issue reporting
* Improve civic service management
* Provide emergency information
* Support smart city monitoring

"Benefits"

Citizen Benefits:

* Easy complaint reporting
* Complaint tracking
* Better transparency
* Centralized services

Authority Benefits:

* Centralized complaint management
* Priority-based issue handling
* Analytics
* Location-based monitoring

==================================================
13. ADMIN LOGIN
===============

Create an Admin Login page.

Fields:

* Username
* Password

Demo credentials:

Username:
admin

Password:
admin123

This is only a frontend prototype login and should not be presented as production-grade security.

After successful login:
Redirect to:

/admin

Add logout functionality.

==================================================
14. ADMIN DASHBOARD
===================

Create a professional Admin Dashboard.

Use a sidebar.

Sidebar:

Dashboard
Complaints
City Monitoring
Analytics
Announcements
Settings
Logout

Dashboard overview cards:

* Total Complaints
* Submitted
* Under Review
* Assigned
* In Progress
* Resolved

Values should be calculated dynamically from complaint data.

==================================================
15. ADMIN COMPLAINT MANAGEMENT
==============================

Create an admin complaint table.

Columns:

Complaint ID
Citizen
Category
Title
Location
Priority
Date
Status
Actions

Actions:

View
Update Status
Delete

Update Status options:

Submitted
Under Review
Assigned
In Progress
Resolved

When the admin changes a complaint status:

* Update the complaint data
* Update tracking page
* Update dashboard statistics
* Update charts

Delete:

When Delete is clicked:

* Show confirmation dialog
* If confirmed, delete only that complaint
* Update the table immediately
* Update statistics
* Update charts
* Make sure the deleted complaint cannot be tracked anymore

==================================================
16. ADMIN ANALYTICS
===================

Create an Analytics section.

Use free chart components if available.

Charts:

1. Complaints by Category
2. Complaints by Status
3. Complaints by Priority
4. Complaints over Time

Use actual complaint data.

Add summary insights such as:

Total complaints
Resolution count
Pending count
High-priority complaints

Do not hard-code the dashboard statistics if complaint data is available.

==================================================
17. ADMIN CITY MONITORING
=========================

Inside the admin dashboard, add city monitoring.

Display:

* City map
* Active civic issues
* Issue categories
* Priority
* Status

Allow admin to view issue details.

==================================================
18. ADMIN ANNOUNCEMENTS
=======================

Create an admin announcement management page.

Admin can:

* View announcements
* Add announcement
* Edit announcement
* Delete announcement

Fields:

* Title
* Category
* Description
* Date

Changes should immediately update the public Announcements page.

==================================================
19. DATA MANAGEMENT
===================

Use localStorage or an equivalent client-side persistence mechanism.

Complaint object should contain:

{
id,
citizenName,
email,
phone,
category,
title,
description,
location,
priority,
image,
status,
createdAt,
updatedAt
}

Generate unique complaint IDs.

Example:

SC-2026-0001
SC-2026-0002
SC-2026-0003

Ensure data survives page refresh.

==================================================
20. RESPONSIVE DESIGN
=====================

The entire application must be responsive.

Desktop:

* Full navigation
* Sidebar dashboard
* Tables
* Multi-column cards

Tablet:

* Adaptive layout

Mobile:

* Hamburger navigation
* Stacked cards
* Responsive forms
* Horizontal scrolling only where absolutely necessary
* Tables converted to cards where appropriate
* Touch-friendly buttons

Test all pages at different screen sizes.

==================================================
21. UI/UX DETAILS
=================

Add:

* Loading states
* Empty states
* Error states
* Success notifications
* Confirmation dialogs
* Hover states
* Focus states
* Smooth transitions
* Form validation
* Accessible labels
* Keyboard-friendly controls

Never leave a button that appears functional but does nothing.

Every navigation link must work.

Every major action must have visible feedback.

==================================================
22. SAMPLE DATA
===============

Initially populate the application with realistic sample complaints so that the dashboard and analytics aren't empty.

Example:

SC-2026-0001
Road Damage Near Main Road
Category: Roads
Priority: High
Status: In Progress

SC-2026-0002
Overflowing Waste Bin
Category: Garbage
Priority: Medium
Status: Submitted

SC-2026-0003
Street Light Not Working
Category: Street Lights
Priority: Medium
Status: Resolved

SC-2026-0004
Water Leakage
Category: Water
Priority: Critical
Status: Under Review

Use realistic but fictional citizen names and locations.

==================================================
23. FINAL QUALITY REQUIREMENTS
==============================

Before finishing:

Test every page.

Test:

* Navigation
* Complaint submission
* Complaint ID generation
* Complaint tracking
* Search
* Filters
* Status updates
* Delete complaint
* Admin login
* Admin logout
* Analytics
* Announcements
* City monitoring
* Responsive layouts

Fix:

* Broken buttons
* Broken links
* Console errors
* Layout problems
* Missing icons
* Form validation issues
* State management issues
* Data persistence issues

Do not replace functional features with placeholders.

Do not remove existing functionality when making improvements.

The final result should feel like a complete Smart City citizen-service platform rather than a simple website mockup.

Make the final UI polished enough to demonstrate as a college project and include in a software/web-development resume.
