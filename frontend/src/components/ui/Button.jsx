import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--radius-sm)',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)',
        },
        secondary: {
            backgroundColor: 'white',
            color: 'var(--text-main)',
            border: '1px solid #e5e7eb',
        },
        danger: {
            backgroundColor: '#fee2e2',
            color: '#ef4444',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
        }
    };

    // Hover effects via standard CSS would be better, but inline for now or via className
    // Ideally we use CSS modules or styled-components, but standard CSS class utility is requested.
    // I will use `className` prop to allow overriding.

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ ...baseStyle, ...variants[variant] }}
            className={`btn-${variant} ${className}`}
            onMouseOver={(e) => {
                if (!disabled && variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
            }}
            onMouseOut={(e) => {
                if (!disabled && variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--primary-color)';
            }}
        >
            {children}
        </button>
    );
};

export default Button;
