# TrackSync - GPS Tracking & Telemetry Application

A comprehensive GPS tracking and telemetry application with a React Native mobile frontend and Spring Boot backend.

## 📁 Project Structure

```
TrackSync/
├── frontend/          # React Native mobile application
│   ├── src/          # Source code
│   ├── android/      # Android native code
│   ├── ios/          # iOS native code
│   └── ...           # Configuration files
│
└── backend/          # Spring Boot backend services
    └── authentication/  # User authentication service
```

## 🚀 Getting Started

### Frontend (React Native)
Navigate to the `frontend` directory and follow the instructions in the [Frontend README](./frontend/README.md).

```bash
cd frontend
npm install
npm start
```

### Backend (Spring Boot)
Navigate to the `backend` directory for backend setup instructions.

```bash
cd backend/authentication
./mvnw spring-boot:run
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React Native 0.82
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: React Hooks
- **Networking**: Axios

### Backend
- **Framework**: Spring Boot
- **Language**: Java
- **Security**: JWT Authentication
- **Database**: (To be configured)

## 📱 Features

### Sprint 1 (Current)
- ✅ User authentication (Login/Signup)
- ✅ JWT token management
- ✅ Protected routes
- ✅ Form validation
- ✅ Responsive UI components

### Upcoming Features
- 🔄 Real-time GPS tracking
- 🔄 Route recording and visualization
- 🔄 Telemetry data logging
- 🔄 Offline mode support
- 🔄 Data export (GPX/CSV)
- 🔄 Live location sharing

## 🔒 Privacy & Security

- User location data is stored locally by default
- JWT-based secure authentication
- Encrypted communication between frontend and backend
- User consent required for data sharing

## 📖 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Sprint 1 Details](./frontend/SPRINT1_README.md)
- Backend Documentation (Coming soon)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source. Please specify an appropriate license (e.g., MIT, Apache 2.0).

## 👥 Team

Development team working on GPS tracking and telemetry solutions.

---

**Last Updated**: December 10, 2025
