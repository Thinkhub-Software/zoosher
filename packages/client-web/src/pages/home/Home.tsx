import { Box, Chip, InputAdornment, List, Paper, Stack, StackProps, TextField, Typography } from '@mui/material';
import { SimpleMovieDTO } from '@zoosher/server-api';
import Image from 'next/image';
import { useMemo } from 'react';
import { trpc } from '../../system/InitTrpcWrapper';
import { useIsMobile } from '../../misc/hooks';
import { styleConstraints } from '../../misc/styleConstraints';
import { Icons } from '../../misc/icons';

const MainColumn = ({ children, sx, ...props }: StackProps) => {

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

const MovieListItem = ({ movie: { genres, name, rating } }: { movie: SimpleMovieDTO }) => {

  const desc = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a";
  const { isMobile } = useIsMobile();

  return (
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
                    marginRight: styleConstraints.spacing.normal,
                    marginTop: styleConstraints.spacing.normal
                  }}
                  label={genreName} />
              ))}
          </Box>

          <Typography
            marginTop={styleConstraints.spacing.normal}
            color="GrayText"
            sx={{
              display: isMobile ? 'none' : undefined
            }}>
            {desc}
          </Typography>
        </Box>
      </Stack>

      <Typography
        marginTop={styleConstraints.spacing.normal}
        color="GrayText"
        sx={{
          display: isMobile ? undefined : 'none'
        }}>
        {desc}
      </Typography>
    </Paper>
  )
}

export default function Home() {

  const { data } = trpc.movieRouter.getMovies.useQuery({ title: 'Asd' });
  const moviesList = useMemo(() => data ?? [], [data]);

  return (
    <>
      {/* header */}
      <Paper
        elevation={0}
        sx={{
          height: '200px',
          borderRadius: '0px',
          display: 'flex',
          flexDirection: 'column'
        }}>

        <MainColumn
          sx={{
            justifyContent: 'space-between',
            flex: '1',
            margin: styleConstraints.spacing.large
          }}>

          <Typography
            variant="h4">
            Zoosher Movie Store
          </Typography>

          <TextField
            id="search"
            type="search"
            placeholder="Title, description, etc..."
            sx={{
              alignSelf: 'flex-end',
              width: '100%',
              maxWidth: '400px'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment >
                  <Icons.Search />
                </InputAdornment>
              ),
            }}
            size="small" />
        </MainColumn>
      </Paper>

      {/* body */}
      <MainColumn>
        <List
          sx={{
            alignSelf: 'center',
          }}>
          {moviesList
            .map((movie, index) => (
              <MovieListItem
                key={index}
                movie={movie} />
            ))}
        </List>
      </MainColumn>
    </>
  )
}
