import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { SimpleMovieDTO } from '@zoosher/server-api';
import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '../misc/hooks';
import { styleConstraints } from '../misc/styleConstraints';

export const MovieListItem = ({
    movie: {
        genres,
        name,
        rating,
        id
    }
}: { movie: SimpleMovieDTO }) => {

    const desc = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a";
    const { isMobile } = useIsMobile();

    return (
        <Link href={`/movie/${id}`}>
            <Paper
                sx={{
                    margin: '0 0 10px 0',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    transition: '0.3s',
                    cursor: 'pointer',
                    flexDirection: 'column',
                }}>

                <Stack direction="row">

                    {/* thumbnail */}
                    <Box
                        sx={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            marginRight: '20px',
                            flexShrink: 0
                        }}>

                        <Image
                            alt="movie-thumbnail"
                            src="/bee.avif"
                            width={100}
                            height={100}
                            style={{ objectFit: 'cover' }} />
                    </Box>

                    {/* content */}
                    <Box>
                        <Typography>
                            {name}
                        </Typography>

                        <Box>
                            {genres
                                .map((genreName, index) => (
                                    <Chip
                                        key={index}
                                        size="small"
                                        color="primary"
                                        sx={{
                                            marginRight: styleConstraints.spacing.small,
                                            marginTop: styleConstraints.spacing.small
                                        }}
                                        label={genreName} />
                                ))}
                        </Box>

                        <Typography
                            marginTop={styleConstraints.spacing.small}
                            color="GrayText"
                            sx={{
                                display: isMobile ? 'none' : undefined
                            }}>
                            {desc}
                        </Typography>
                    </Box>
                </Stack>

                <Typography
                    marginTop={styleConstraints.spacing.small}
                    color="GrayText"
                    sx={{
                        display: isMobile ? undefined : 'none'
                    }}>
                    {desc}
                </Typography>
            </Paper>
        </Link>
    )
}