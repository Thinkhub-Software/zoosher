import { CircularProgress, InputAdornment, List, Paper, Stack, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { MainColumn } from '../../components/MainColumn';
import { MovieListItem } from '../../components/MovieListItem';
import { Icons } from '../../misc/icons';
import { styleConstraints } from '../../misc/styleConstraints';
import { trpc } from '../../system/InitTrpcWrapper';

export default function Home() {

  const [searchTitle, setSearchTitle] = useState('');

  const searchRequestParam = useMemo(() => {

    if (searchTitle.length <= 2)
      return '';

    return searchTitle;
  }, [searchTitle]);

  const { data, isLoading } = trpc
    .movieRouter
    .getMovies
    .useQuery({ title: searchRequestParam });

  const moviesList = useMemo(() => data ?? [], [data]);

  return (
    <>
      {/* header */}
      <Paper
        elevation={0}
        sx={{
          height: '150px',
          borderRadius: '0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end'
        }}>

        <MainColumn
          sx={{
            marginBottom: styleConstraints.spacing.large
          }}>

          <TextField
            id="search"
            type="search"
            value={searchTitle}
            onChange={x => setSearchTitle(x.currentTarget.value)}
            placeholder="Title, description, etc..."
            sx={{
              alignSelf: 'flex-end',
              width: '100%',
              maxWidth: '400px'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end">
                  <Icons.Search />
                </InputAdornment>
              )
            }}
            size="small" />
        </MainColumn>
      </Paper>

      {/* body */}
      <MainColumn>

        {isLoading
          ? (
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              alignSelf="stretch"
              padding={styleConstraints.spacing.large}>
              <CircularProgress />
            </Stack>
          )
          : (
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
          )}
      </MainColumn >
    </>
  )
}
