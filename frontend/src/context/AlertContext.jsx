import React, { createContext, useState, useContext, useCallback } from 'react';
import Alert from '../components/ui/Alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = 'info', duration = 4000) => {
        setAlert({ message, type, duration });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert(null);
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    duration={alert.duration}
                    onClose={hideAlert}
                />
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
