import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to finish before unmounting
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const styles = {
        success: {
            backgroundColor: 'rgba(52, 211, 153, 0.9)', // Emerald 400
            color: '#fff',
            icon: <FiCheckCircle size={20} />
        },
        error: {
            backgroundColor: 'rgba(239, 68, 68, 0.9)', // Red 500
            color: '#fff',
            icon: <FiAlertCircle size={20} />
        },
        info: {
            backgroundColor: 'rgba(99, 102, 241, 0.9)', // Indigo 500
            color: '#fff',
            icon: <FiInfo size={20} />
        }
    };

    const currentStyle = styles[type] || styles.info;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: `translateX(-50%) translateY(${isVisible ? '0' : '-20px'})`,
            opacity: isVisible ? 1 : 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 24px',
            borderRadius: '16px', // Rounded corners matching design
            backgroundColor: currentStyle.backgroundColor,
            color: currentStyle.color,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            transition: 'all 0.3s ease-in-out',
            minWidth: '300px',
            maxWidth: '90%'
        }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
                {currentStyle.icon}
            </span>
            <span style={{ flex: 1, fontWeight: '500', fontSize: '0.95rem' }}>
                {message}
            </span>
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'currentColor',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0.8
                }}
            >
                <FiX size={18} />
            </button>
        </div>
    );
};

export default Alert;
