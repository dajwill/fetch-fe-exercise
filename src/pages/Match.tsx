import { Skeleton } from '@/components/ui/skeleton';
import useDogDetails from '@/queries/useDogDetails';
import useFavoritesStore from '@/stores/favorites';
import { Center, Image, Box, Container, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useLocation, useParams } from 'wouter';

const Match = () => {
    const params = useParams();
    const [_, navigate] = useLocation();
    const clearFavorites = useFavoritesStore(state => state.clearFavorites)
    const { data, isLoading } = useDogDetails(params?.id ? [params.id] : [])

    const exit = () => {
        clearFavorites();
        navigate('/browse')
    }

    return (
        <Box position="relative" height={{ lg: '720px' }}>
            <Container py={{ base: '16', md: '24' }} height="full">
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    gap={{ base: '16' }}
                    align={{ lg: 'center' }}
                    height="full"
                    flexDir={{base: "column-reverse", lg: "initial"}}
                >
                    <Stack
                        gap={{ base: '6', md: '8' }}
                        justifyContent="center"
                        maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                    >
                        <Stack gap={{ base: '5', md: '6' }}>
                            <Stack gap={{ base: '3', md: '4' }}>
                                <Skeleton h={4} w="40%" loading={isLoading}>
                                <Text textStyle={{ base: 'sm', md: 'md' }} fontWeight="medium" color="colorPalette.fg">
                                    Congratulations!
                                </Text>
                                </Skeleton>
                                <Skeleton h={10} loading={isLoading}>
                                <Heading as="h1" textStyle={{ base: '4xl', md: '6xl' }} fontWeight="bold">
                                    {`Say hi to ${data?.[0].name}`}
                                </Heading>
                                </Skeleton>
                            </Stack>
                            <Skeleton h={6} loading={isLoading}>
                            <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="3xl">
                                You future best friend can't wait to meet you.
                            </Text>
                            </Skeleton>
                        </Stack>
                        <Stack direction={{ base: 'column', md: 'row' }} mt={{ base: 4, md: 0}} gap="3">
                            <Button size={{ base: 'lg', md: '2xl' }} onClick={exit}>Browse Again</Button>
                        </Stack>
                    </Stack>
    
                    <Box
                        pos={{ lg: 'absolute' }}
                        right="0"
                        bottom="0"
                        w={{ base: 'full', lg: '50%' }}
                        height={{ base: '96', lg: 'full' }}
                        css={{
                            clipPath: { lg: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)' },
                        }}
                    >
                        <Center w="full" h="full" bg="bg.muted" color="fg.subtle">
                            <Image src={data?.[0].img} />
                        </Center>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Match;