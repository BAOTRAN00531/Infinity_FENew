import React from 'react';
import { Link } from 'react-router-dom';
import CRUDDashboard from './CRUDDashboard'; // Điều chỉnh đường dẫn nếu cần

// AdminDashboard - Entry point chính cho trang quản trị
// Component này đóng vai trò là wrapper cho CRUDDashboard

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <CRUDDashboard /> {/* Nhúng CRUDDashboard */}
        </div>
    );
};

export default AdminDashboard;