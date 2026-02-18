import React, { createContext, useState, useContext, useCallback } from 'react';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
    const [confirmation, setConfirmation] = useState(null);

    const confirm = useCallback((title, message) => {
        return new Promise((resolve) => {
            setConfirmation({
                title,
                message,
                onConfirm: () => {
                    setConfirmation(null);
                    resolve(true);
                },
                onCancel: () => {
                    setConfirmation(null);
                    resolve(false);
                }
            });
        });
    }, []);

    return (
        <ConfirmationContext.Provider value={confirm}>
            {children}
            {confirmation && (
                <ConfirmationModal
                    isOpen={!!confirmation}
                    title={confirmation.title}
                    message={confirmation.message}
                    onConfirm={confirmation.onConfirm}
                    onCancel={confirmation.onCancel}
                />
            )}
        </ConfirmationContext.Provider>
    );
};

export const useConfirm = () => {
    const context = useContext(ConfirmationContext);
    if (!context) {
        throw new Error('useConfirm must be used within a ConfirmationProvider');
    }
    return context;
};
