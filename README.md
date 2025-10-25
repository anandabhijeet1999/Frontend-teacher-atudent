# Teacher-Student Portal - Frontend

A React.js frontend application for the Teacher-Student Portal with role-based dashboards and assignment management.

## Features

- **Single Login Page**: Unified authentication for both teachers and students
- **Role-based Dashboards**: Different interfaces for teachers and students
- **Assignment Management**: Full lifecycle management with state transitions
- **Submission System**: Students can submit and view their assignments
- **Responsive Design**: Mobile-friendly interface with TailwindCSS
- **Form Validation**: Client-side validation with react-hook-form
- **State Management**: Context API for authentication state
- **Error Handling**: Toast notifications for user feedback

## Tech Stack

- React.js 18
- React Router DOM
- TailwindCSS
- React Hook Form
- Axios
- React Hot Toast
- Date-fns

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on port 5000

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd teacher-student-portal/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will start on `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── Login.js
│   │   ├── Layout/
│   │   │   ├── Header.js
│   │   │   └── Layout.js
│   │   ├── Teacher/
│   │   │   ├── TeacherDashboard.js
│   │   │   ├── AssignmentList.js
│   │   │   ├── CreateAssignment.js
│   │   │   └── AssignmentDetails.js
│   │   ├── Student/
│   │   │   ├── StudentDashboard.js
│   │   │   ├── AssignmentList.js
│   │   │   ├── SubmissionModal.js
│   │   │   └── MySubmissions.js
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── config.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Key Components

### Authentication
- **Login**: Single login page for both roles
- **AuthContext**: Global authentication state management
- **ProtectedRoute**: Route protection based on authentication and roles

### Teacher Dashboard
- **Assignment Management**: Create, edit, delete assignments
- **State Transitions**: Draft → Published → Completed
- **Submission Review**: View and review student submissions
- **Analytics**: Assignment statistics and submission counts

### Student Dashboard
- **Assignment Viewing**: See only published assignments
- **Submission System**: Submit answers with validation
- **Submission History**: View past submissions
- **Due Date Tracking**: Visual indicators for deadlines

## Features by Role

### Teacher Features
- Create and manage assignments
- Publish assignments to make them visible to students
- Mark assignments as completed after review
- View all student submissions for each assignment
- Mark submissions as reviewed
- Filter assignments by status
- View assignment statistics

### Student Features
- View only published assignments
- Submit one answer per assignment
- View submission history
- Cannot edit submissions once submitted
- See assignment due dates and status
- Track submission status (pending/reviewed)

## State Management

The application uses React Context API for state management:

- **Authentication State**: User info, token, login status
- **Role-based Routing**: Automatic redirection based on user role
- **API Integration**: Axios interceptors for token management

## Styling

- **TailwindCSS**: Utility-first CSS framework
- **Custom Components**: Reusable styled components
- **Responsive Design**: Mobile-first approach
- **Status Indicators**: Color-coded status badges
- **Loading States**: Skeleton loaders and spinners

## Form Validation

- **React Hook Form**: Efficient form handling
- **Client-side Validation**: Real-time validation feedback
- **Server-side Integration**: API error handling
- **User-friendly Messages**: Clear error and success messages

## API Integration

- **Axios**: HTTP client with interceptors
- **Token Management**: Automatic token attachment
- **Error Handling**: Centralized error handling
- **Loading States**: Request state management

## Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Environment Variables
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to hosting service**
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Heroku

3. **Environment Configuration**
   - Set production API URL
   - Configure CORS on backend
   - Set up SSL certificates

## Testing

### Manual Testing
1. **Login Flow**
   - Test with teacher credentials
   - Test with student credentials
   - Test invalid credentials

2. **Teacher Flow**
   - Create assignment
   - Publish assignment
   - View submissions
   - Mark as completed

3. **Student Flow**
   - View published assignments
   - Submit assignment
   - View submission history

### Demo Accounts
The application includes demo account information on the login page for testing purposes.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Code Splitting**: Lazy loading of components
- **Optimized Builds**: Production optimizations
- **Image Optimization**: Responsive images
- **Bundle Analysis**: Webpack bundle analyzer

## Security

- **Token Storage**: Secure token management
- **Route Protection**: Authentication-based routing
- **Input Sanitization**: XSS prevention
- **HTTPS**: Secure communication

## Troubleshooting

### Common Issues
1. **API Connection**: Ensure backend is running on port 5000
2. **CORS Errors**: Check backend CORS configuration
3. **Authentication**: Clear localStorage and re-login
4. **Build Errors**: Check Node.js version compatibility

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and debugging information.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
