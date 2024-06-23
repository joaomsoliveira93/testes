import { useCallback } from 'react';
import Swal from 'sweetalert2';
import useColorMode from '@/hooks/useColorMode';

const useSwal = () => {
    const [colorMode] = useColorMode();

    const showSwal = useCallback((title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' | 'question') => {
        Swal.fire({
            title: title,
            text: message,
            icon: type,
            showConfirmButton: false,
            timer: 2000,
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: colorMode === 'dark' ? '#1C2434' : '#fff',
            color: colorMode === 'dark' ? '#fff' : '#000',
        });
    }, [colorMode]);

    const showOKSwal = useCallback((title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' | 'question') => {
        return Swal.fire({
            title: title,
            text: message,
            icon: type,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'OK',
            background: colorMode === 'dark' ? '#1C2434' : '#fff',
            color: colorMode === 'dark' ? '#fff' : '#000',
        });
    }, [colorMode]);

    return {showSwal,showOKSwal};
};

export default useSwal;