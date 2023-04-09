import { Box, Chip, Paper, Rating, Stack, Typography } from "@mui/material";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { MainColumn } from "../../components/MainColumn";
import { useTextLoadingEffect } from "../../misc/hooks";
import { styleConstraints } from "../../misc/styleConstraints";
import { trpcStaticClient } from "../../system/trpcStatic";
import Link from "next/link";
import { routes } from "../../misc/routes";
import { useMemo } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext<{ movie_id: string }>) {

    const { movie_id } = context.params ?? {};

    if (!movie_id)
        throw new Error(`Incorrect url param: ${movie_id} typeof ${typeof movie_id}!`);

    const data = await trpcStaticClient
        .movieRouter
        .getMovieDetails
        .query({ movieId: movie_id });

    return {
        props: {
            movieDetails: data
        }
    }
}

export default function MoviePage({ movieDetails }: InferGetStaticPropsType<typeof getServerSideProps>) {

    const router = useRouter();
    const { movie_id } = router.query;

    if ((typeof movie_id !== 'string') && !!movie_id)
        throw new Error(`Incorrect url param: ${movie_id} typeof ${typeof movie_id}!`);

    const isLoaded = true;

    const {
        genres,
        imdbUrl,
        movieTitle,
        posterUrl,
        rating,
        wikiUrl,
        relatedMovies
    } = movieDetails;

    const {
        description,
        shortDescription
    } = useMemo(() => ({
        description: movieDetails.description ?? '',
        shortDescription: movieDetails.shortDescription ?? ''
    }), [movieDetails]);

    return (
        <>
            {/* header */}
            <Paper
                id="header-root"
                elevation={0}
                sx={{
                    height: "300px",
                    width: '100vw',
                    position: "relative",
                    borderRadius: 0,
                    display: 'flex'
                }}>

                <Stack
                    id="header-root-stack"
                    overflow="hidden"
                    position="relative"
                    flex="1"
                    justifyContent="center">

                    {/* black backdrop */}
                    <Box
                        sx={{
                            position: 'absolute',
                            background: 'black',
                            width: '100%',
                            height: '100%',
                            top: 0
                        }} />

                    {/* bg image */}
                    <Image
                        fill
                        src={posterUrl}
                        alt="movie-banner"
                        style={{
                            objectFit: 'fill',
                            display: posterUrl === '' ? 'none' : undefined,
                            filter: 'contrast(0.6) blur(30px) brightness(0.8)',
                            margin: "-5px -10px -10px -5px",
                        }} />

                    {/* contents */}
                    <Stack
                        id="content-stack"
                        sx={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1
                        }}>

                        <MainColumn>

                            <Stack
                                flexDirection="row">

                                {/* thumbnail */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '130px',
                                        height: '200px',
                                        flexShrink: '0',
                                        marginRight: styleConstraints.spacing.normal,
                                        background: 'gray'
                                    }}>

                                    <Image
                                        fill
                                        src={posterUrl}
                                        alt="movie-banner"
                                        style={{
                                            display: posterUrl === '' ? 'none' : undefined,
                                            objectFit: 'cover',
                                        }} />
                                </Box>

                                {/* info */}
                                <Stack>
                                    <Typography
                                        variant="h5"
                                        color="white"
                                        sx={useTextLoadingEffect(isLoaded, '40px')}>
                                        {movieTitle}
                                    </Typography>

                                    <Box
                                        sx={{
                                            marginTop: styleConstraints.spacing.normal,
                                            ...useTextLoadingEffect(isLoaded, '40px')
                                        }}>
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
                                        color="white"
                                        sx={useTextLoadingEffect(isLoaded, '60px')}>
                                        {shortDescription}
                                    </Typography>

                                    <Rating
                                        value={rating}
                                        max={10}
                                        readOnly />
                                </Stack>
                            </Stack>
                        </MainColumn>
                    </Stack>
                </Stack>
            </Paper>

            <MainColumn>

                {/* content */}
                <Paper
                    sx={{
                        padding: styleConstraints.spacing.large,
                        alignSelf: 'stretch',
                    }}>

                    <Typography
                        variant="h6"
                        sx={{
                            marginBottom: styleConstraints.spacing.small
                        }}>
                        Description
                    </Typography>

                    <Typography
                        sx={useTextLoadingEffect(isLoaded, '200px')}>
                        {description}
                    </Typography>

                    <Typography
                        sx={{
                            marginTop: styleConstraints.spacing.normal,
                            marginBottom: styleConstraints.spacing.small
                        }}
                        variant="h6">
                        Links
                    </Typography>

                    <Typography>
                        Wikipedia:
                        <a target="_blank" href={wikiUrl}>
                            {wikiUrl}
                        </a>
                    </Typography>

                    <Typography>
                        Imdb:
                        <a target="_blank" href={imdbUrl}>
                            {imdbUrl}
                        </a>
                    </Typography>

                    <Typography
                        sx={{
                            marginTop: styleConstraints.spacing.normal,
                            marginBottom: styleConstraints.spacing.small
                        }}
                        variant="h6">
                        Related movies
                    </Typography>

                    <Stack
                        sx={{
                            overflowX: 'scroll'
                        }}
                        flexDirection="row">

                        {relatedMovies
                            .map((relatedMovie, index) => (

                                <Link
                                    key={index}
                                    href={routes.movie.replace('{movie_id}', relatedMovie.id)}>
                                    <Image
                                        title={relatedMovie.title}
                                        width={130}
                                        height={200}
                                        src={relatedMovie.posterUrl ?? "/poster.jpg"}
                                        alt="movie-banner"
                                        style={{
                                            objectFit: 'cover',
                                            marginRight: styleConstraints.spacing.normal
                                        }} />
                                </Link>
                            ))}
                    </Stack>
                </Paper>
            </MainColumn>
        </>
    )
}