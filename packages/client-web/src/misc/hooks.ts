import useMediaQuery from '@mui/material/useMediaQuery';

export const useIsMobile = () => {

    const isLargerThan600 = useMediaQuery('(min-width:600px)');

    return { isMobile: !isLargerThan600 };
}