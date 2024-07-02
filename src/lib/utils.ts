import { type ClassValue, clsx } from 'clsx';
import { format, formatDistanceToNow, isThisYear } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { getImageSize } from 'react-image-size';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDateFormatted = (params: string) => {
    const date = new Date(params);
    const dateFormat = isThisYear(date) ? 'd MMM, HH:mm' : 'd MMM, yyyy, HH:mm';
    return format(date, dateFormat, { locale: vi });
};

export const createUrl = (
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
) => {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
};

export const getFormatDistanceToNow = (params: string) => {
    const date = new Date(params);
    return formatDistanceToNow(date, {
        addSuffix: true,
    });
}; // dung cai nay

export const fetchImageSize = async (url: string) => {
    const dimensions = await getImageSize(url)
        .then((size) => {
            return {
                width: size.width,
                height: size.height,
            };
        })
        .catch((error) => {
            console.log(error);
            return {
                width: 0,
                height: 0,
            };
        });
    return dimensions;
};
