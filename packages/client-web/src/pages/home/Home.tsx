import { CircularProgress, InputAdornment, List, Paper, Stack, TextField } from '@mui/material';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { useMemo, useState } from 'react';
import { MainColumn } from '../../components/MainColumn';
import { MovieListItem } from '../../components/MovieListItem';
import { Icons } from '../../misc/icons';
import { styleConstraints } from '../../misc/styleConstraints';
import { TrpcReactQueryContext } from '../../system/InitTrpcWrapper';
import { trpcStaticClient } from '../../system/trpcStatic';

export async function getServerSideProps() {

  const movies = await trpcStaticClient
    .movieRouter
    .getMovies
    .query({ title: '' });

  return {
    props: {
      defaultMovies: movies
    }
  }
}

export default function Home({ defaultMovies }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [searchTitle, setSearchTitle] = useState('');

  const searchRequestParam = useMemo(() => {

    if (searchTitle.length <= 2)
      return '';

    return searchTitle;
  }, [searchTitle]);


  const isQueryEnabled = searchTitle !== '';

  const { data, isLoading: isQueryLoading } = TrpcReactQueryContext
    .movieRouter
    .getMovies
    .useQuery({ title: searchRequestParam }, { enabled: isQueryEnabled });

  const isLoading = isQueryLoading && isQueryEnabled;

  const moviesList = useMemo(() => data ?? defaultMovies, [data, defaultMovies]);

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
