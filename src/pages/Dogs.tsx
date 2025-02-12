import DogItem from "@/components/DogItem";
import SearchFilters from "@/components/SearchFilters";
import SortButton from "@/components/SortButton";
import useDogDetails from "@/queries/useDogDetails";
import useDogs from "@/queries/useDogs";
import { Button, Container, HStack, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const SkeletonGallery = () => (
    Array(16).fill('').map(() => (
        <Skeleton w="100%" h="190px" loading={true} />
    ))
)

const Dogs = () => {
    const [page, setPage] = useState(0)
    const { data, isLoading } = useDogs({from: page});
    const { data: dogs, isLoading: detailsLoading } = useDogDetails(data?.resultIds)

    return (
        <>
            <SearchFilters />
            <Container maxW="7xl" py="4">
            <Stack gap={4}>
                <HStack justifyContent="space-between">
                    <Skeleton h={3} loading={isLoading}>
                        <Text>{`${data?.total ?? 0} results`}</Text>
                    </Skeleton>
                    <SortButton />
                </HStack>
                <SimpleGrid columns={{ base: 2, md: 4 }} gap="2">
                    {detailsLoading ? (
                        <SkeletonGallery />
                    ): (
                        dogs?.map((dog) => (
                            <DogItem key={dog.id} data={dog} />
                        ))
                    )}           
                </SimpleGrid>
                <HStack justify="center">
                    <Button minW="95px" disabled={!data?.prev} onClick={() => setPage(page - 1)}>Previous</Button>
                    <Button minW="95px" disabled={!data?.next} onClick={() => setPage(page + 1)}>Next</Button>
                </HStack>
            </Stack>
        </Container>
        </>
    )
}

export default Dogs;