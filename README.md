# QR Attendance System

A comprehensive React-based QR code attendance system designed for educational institutions. This system allows faculty to manage student attendance through QR code scanning, with real-time tracking, analytics, and reporting capabilities.

## 🚀 Features

### Authentication & Security
- **Faculty-only login** with secure authentication
- **Protected routes** ensuring only authorized access
- **Session management** with auto-logout after inactivity
- **Remember me** functionality for convenience

### Dashboard
- **Class overview** with attendance statistics
- **Today's summary** with real-time metrics
- **Quick actions** for scanning and viewing attendance
- **Responsive design** for desktop, tablet, and mobile

### QR Code Scanning
- **Live camera scanning** using HTML5 QR Code reader
- **Real-time feedback** with toast notifications
- **Manual attendance entry** as backup option
- **Continuous scanning** for efficient classroom use
- **Scan validation** with duplicate detection

### Attendance Management
- **Real-time attendance table** with live updates
- **Search and filter** capabilities
- **Sortable columns** for easy data organization
- **Pagination** for large class sizes
- **Status indicators** (Present, Absent, Late)

### Reports & Analytics
- **Interactive charts** using Recharts
- **Attendance trends** over time
- **Class comparison** analytics
- **Export functionality** (CSV/PDF)
- **Key insights** and recommendations

### History & Records
- **Date-based filtering** for historical data
- **Class-specific history** views
- **Comprehensive statistics** and metrics
- **Export capabilities** for record keeping

## 🛠 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: TailwindCSS 4
- **Routing**: React Router DOM
- **QR Scanning**: HTML5-QRCode
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: Date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qr-attendance-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: `faculty@example.com`
- **Password**: `password123`

## 📱 Usage

### For Faculty

1. **Login** with your faculty credentials
2. **View Dashboard** to see your classes and today's summary
3. **Start Scanning** by clicking "Start Scanning" on any class
4. **Scan QR Codes** using your device's camera
5. **View Attendance** in real-time tables
6. **Generate Reports** for insights and analytics
7. **Export Data** for record keeping

### QR Code Scanning Process

1. Students present their QR codes (containing their student ID)
2. Faculty scans the QR code using the camera
3. System validates the student and marks attendance
4. Real-time feedback is provided via toast notifications
5. Attendance is immediately reflected in the system

## 🏗 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── ProtectedRoute.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── scanner/
│   │   └── QRScanner.jsx
│   ├── attendance/
│   │   └── AttendanceTable.jsx
│   ├── history/
│   │   └── AttendanceHistory.jsx
│   └── reports/
│       └── Reports.jsx
├── contexts/
│   └── AuthContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on all devices
- **Dark/Light Mode**: Toggle for different environments
- **Modern UI**: Clean, professional interface
- **Accessibility**: Keyboard navigation and screen reader support
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth user experience during operations

## 📊 Analytics & Reporting

### Available Charts
- **Weekly Attendance Trends**: Bar charts showing daily attendance
- **Attendance Distribution**: Pie charts for present/absent/late ratios
- **Monthly Trends**: Area charts for long-term analysis
- **Class Comparisons**: Comparative analytics across classes

### Export Options
- **CSV Export**: For spreadsheet analysis
- **PDF Export**: For official documentation
- **Filtered Exports**: Based on date ranges and classes

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_backend_api_url
VITE_APP_NAME=QR Attendance System
```

### Customization
- Modify colors in `tailwind.config.js`
- Update mock data in components for testing
- Customize authentication logic in `AuthContext.jsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🔮 Future Enhancements

- [ ] **Backend Integration**: Connect to real API endpoints
- [ ] **Student Portal**: Allow students to view their attendance
- [ ] **Push Notifications**: Real-time alerts for faculty
- [ ] **Offline Support**: Work without internet connection
- [ ] **Multi-language Support**: Internationalization
- [ ] **Advanced Analytics**: Machine learning insights
- [ ] **Mobile App**: Native mobile application
- [ ] **Biometric Integration**: Fingerprint/face recognition

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **TailwindCSS** for the utility-first CSS framework
- **Recharts** for the charting library
- **HTML5-QRCode** for QR scanning capabilities
- **Lucide** for the beautiful icons

---

**Built with ❤️ for better education management**
