import { Box, Chip, Paper, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { MainColumn } from "../../components/MainColumn";
import { styleConstraints } from "../../misc/styleConstraints";
import { trpc } from "../../system/InitTrpcWrapper";

const useTextLoadingEffect = (isLoaded: boolean, height: string | number) => {

    return {
        height: isLoaded ? undefined : height,
        // background: isLoaded ? undefined : '#ededed'
    }
}

export const MoviePage = () => {

    const router = useRouter();
    const { movie_id } = router.query;

    if ((typeof movie_id !== 'string') && !!movie_id)
        throw new Error(`Incorrect url param: ${movie_id} typeof ${typeof movie_id}!`);

    const { data } = trpc
        .movieRouter
        .getMovieDetails
        .useQuery({ movieId: movie_id! }, { enabled: !!movie_id });

    const {
        description,
        imdbUrl,
        movieTitle,
        wikiUrl,
        genres,
        shortDescription,
        posterUrl
    } = useMemo(() => ({
        description: data?.description ?? '',
        shortDescription: data?.shortDescription ?? '',
        genres: data?.genres ?? [],
        imdbUrl: data?.imdbUrl ?? '',
        movieTitle: data?.movieTitle ?? '',
        wikiUrl: data?.wikiUrl ?? '',
        posterUrl: data?.posterUrl ?? ''
    } satisfies (typeof data)), [data])

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
                                <Image
                                    width={130}
                                    height={200}
                                    src={posterUrl}
                                    alt="movie-banner"
                                    style={{
                                        objectFit: 'cover',
                                        marginRight: styleConstraints.spacing.normal
                                    }} />

                                {/* info */}
                                <Stack>
                                    <Typography
                                        variant="h5"
                                        color="white"
                                        sx={useTextLoadingEffect(!!data, '40px')}>
                                        {movieTitle}
                                    </Typography>

                                    <Box
                                        sx={{
                                            marginTop: styleConstraints.spacing.normal,
                                            ...useTextLoadingEffect(!!data, '40px')
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
                                        sx={useTextLoadingEffect(!!data, '60px')}>
                                        {shortDescription}
                                    </Typography>

                                    <Rating
                                        value={8}
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
                        sx={useTextLoadingEffect(!!data, '200px')}>
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
                        flexDirection="row">

                        <Image
                            width={130}
                            height={200}
                            src="/poster.jpg"
                            alt="movie-banner"
                            style={{
                                objectFit: 'cover',
                                marginRight: styleConstraints.spacing.normal
                            }} />

                        <Image
                            width={130}
                            height={200}
                            src="/poster.jpg"
                            alt="movie-banner"
                            style={{
                                objectFit: 'cover',
                                marginRight: styleConstraints.spacing.normal
                            }} />

                        <Image
                            width={130}
                            height={200}
                            src="/poster.jpg"
                            alt="movie-banner"
                            style={{
                                objectFit: 'cover',
                                marginRight: styleConstraints.spacing.normal
                            }} />

                        <Image
                            width={130}
                            height={200}
                            src="/poster.jpg"
                            alt="movie-banner"
                            style={{
                                objectFit: 'cover',
                                marginRight: styleConstraints.spacing.normal
                            }} />
                    </Stack>
                </Paper>
            </MainColumn>
        </>
    )
}