# Verity — NGO Impact Tracking Platform

Verity is a full-stack web application designed to help nonprofit organizations manage events, coordinate volunteers, and measure community impact through a centralized dashboard.

The platform enables NGOs to move beyond spreadsheets by providing a single system to track initiatives, volunteer participation, and beneficiary outcomes.

## Features

### Public Landing Page

- Responsive, mobile-first design
- Real-time impact statistics
- Featured events section
- Mission and platform overview
- Direct access to analytics dashboard

### Dashboard

- Centralized overview of NGO operations
- Key performance indicators (KPIs)
- Recent activity tracking
- Quick action shortcuts
- Performance snapshot metrics

### Event Management

- Create and manage community events
- View event details and participation data
- Search events by title or location
- Track beneficiaries reached

### Volunteer Management

- Add and manage volunteer profiles
- Store contact information and skills
- Monitor participation history
- Search volunteers by name, email, phone number, or skills

### Impact Analytics

- Measure total community reach
- Monitor participation trends
- Track volunteer growth over time
- Identify top volunteers
- Analyze event impact metrics

## Tech Stack

### Frontend

- Next.js 15
- React
- Tailwind CSS
- Lucide React

### Backend

- Next.js API Routes

### Database

- MongoDB

### Deployment

- Vercel

## Screenshots

Add screenshots of the following pages after deployment:

- Landing Page
- Dashboard
- Events Page
- Volunteers Page
- Analytics Page
- Mobile View

## Project Structure

```bash
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   └── page.jsx
├── components/
├── context/
├── lib/
└── styles/
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB Atlas account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/verity.git
```

2. Navigate to the project directory:

```bash
cd verity
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and visit:

```bash
http://localhost:3000
```

## Environment Variables

| Variable      | Description                     |
| ------------- | ------------------------------- |
| `MONGODB_URI` | MongoDB Atlas connection string |

## Sample Data

The project includes sample volunteer and event data to demonstrate:

- Event creation and management
- Volunteer participation tracking
- Impact analytics and reporting
- Search functionality

## Future Improvements

- Authentication and authorization
- Role-based access control
- Export reports as PDF or CSV
- Event image uploads
- Email notifications
- Volunteer attendance tracking
- Advanced analytics and filtering
- Settings management
- Dark mode support

## Learning Outcomes

Through this project, I gained practical experience with:

- Building full-stack applications using Next.js
- Designing RESTful APIs
- Integrating MongoDB with server-side applications
- Managing state in React
- Creating responsive user interfaces with Tailwind CSS
- Implementing search and analytics features
- Structuring scalable frontend applications

## Author

**Shaurya**

- GitHub: https://github.com/shauryasync
- Email: [edshaurya@gmail.com](mailto:edshaurya@gmail.com)

---

If you have feedback, suggestions, or collaboration opportunities, feel free to connect.
