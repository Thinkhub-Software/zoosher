import useMediaQuery from '@mui/material/useMediaQuery';

export const useIsMobile = () => {

    const isLargerThan600 = useMediaQuery('(min-width:600px)');

    return { isMobile: !isLargerThan600 };
}

export const useTextLoadingEffect = (isLoaded: boolean, height: string | number) => {

    return {
        height: isLoaded ? undefined : height,
        // background: isLoaded ? undefined : '#ededed'
    }
}