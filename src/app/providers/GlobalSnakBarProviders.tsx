import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Define context type
interface SnackbarContextType {
    triggerSnackbar: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
}

// Create the context
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

let triggerSnackbarGlobally: SnackbarContextType['triggerSnackbar'] = () => { };

// Custom hook for consuming the context
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

// Provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const triggerSnackbar = (msg: string, severityType: 'success' | 'error' | 'warning' | 'info' = 'success') => {
        setMessage(msg);
        setSeverity(severityType);
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Set the global trigger function
    triggerSnackbarGlobally = triggerSnackbar;

    return (
        <SnackbarContext.Provider value={{ triggerSnackbar }}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

// Export the global trigger function
export const globalTriggerSnackbar = (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => {
    triggerSnackbarGlobally(message, severity);
};