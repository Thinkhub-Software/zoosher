import { Stack, StackProps } from '@mui/material';
import { useIsMobile } from '../misc/hooks';

export const MainColumn = ({ children, sx, ...props }: StackProps) => {

    const { isMobile } = useIsMobile();

    return (
        <Stack
            id={`${MainColumn.name}`}
            sx={{
                width: isMobile ? '100vw' : 'calc(min(66vw, 1000px))',
                alignItems: 'flex-start',
                alignSelf: 'center',
                ...sx
            }}
            {...props}>
            {children}
        </Stack>
    )
}