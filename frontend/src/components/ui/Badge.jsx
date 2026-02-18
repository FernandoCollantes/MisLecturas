import React from 'react';

const Badge = ({ children, status = 'pending', className = '' }) => {
    const statusStyles = {
        pending: { backgroundColor: 'rgba(251, 191, 36, 0.2)', color: '#d97706' },
        reading: { backgroundColor: 'rgba(34, 211, 238, 0.2)', color: '#0891b2' },
        finished: { backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#059669' },
        default: { backgroundColor: '#f3f4f6', color: '#4b5563' }
    };

    const style = statusStyles[status] || statusStyles.default;

    return (
        <span
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                ...style
            }}
        >
            {children}
        </span>
    );
};

export default Badge;
