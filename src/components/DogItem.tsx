import { Box, IconButton, Span, Stack, Text, HStack, Icon } from '@chakra-ui/react'
import { FiHeart } from 'react-icons/fi'
import type { Dog } from '@/types'
import useFavoritesStore from '@/stores/favorites'
import { FaHeart } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

interface DogItemProps {
    data: Dog
}

export const DogItem = (props: DogItemProps) => {
    const { data } = props;
    const { favorites, toggleFavorite } = useFavoritesStore(state => state)

    return (
        <Stack borderWidth="1px">
            <Box position="relative">
                <Box asChild w="full" objectFit="cover" h="180px">
                    <img src={data.img} alt={data.name} />
                </Box>
                <Span position="absolute" top="2" insetEnd="2" className="dark">
                    <IconButton
                        colorPalette="gray"
                        size="xs"
                        _hover={{ transform: 'scale(1.1)' }}
                        aria-label={`Add ${data.name} to your favourites`}
                        onClick={() => toggleFavorite(data.id)}
                    >
                        {favorites.has(data.id) ? <FaHeart /> : <FiHeart />}
                    </IconButton>
                </Span>
            </Box>

            <Stack px={2} pb="4" pt="1" gap="0" bg="bg.panel">
                <HStack justify="space-between">
                    <Text textStyle="sm" fontWeight="semibold">
                        {data.name}
                    </Text>
                    <Text textStyle="sm">
                        {`${data.age} years old`}
                    </Text>
                </HStack>
                <HStack justify="space-between">
                    <HStack align="center" gap={1}>
                        <Icon as={FaLocationDot} />
                        <Text textStyle="sm" color="fg.muted">
                            {data.zip_code}
                        </Text>
                    </HStack>
                    <Text textStyle="sm" color="fg.muted">
                        {data.breed}
                    </Text>
                </HStack>
            </Stack>
        </Stack>
    )
}

export default DogItem;
