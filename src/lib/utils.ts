import { type ClassValue, clsx } from 'clsx';
import { format, isThisYear } from 'date-fns';
import { vi } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDateFormatted = (params: string) => {
    const date = new Date(params);
    const dateFormat = isThisYear(date) ? 'd MMM, HH:mm' : 'd MMM, yyyy, HH:mm';
    return format(date, dateFormat, { locale: vi });
};
