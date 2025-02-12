import { Box, BoxProps, Container, HStack, Icon, Show, Text } from '@chakra-ui/react'
import FetchIcon from './FetchIcon';
import useFavoritesStore from '@/stores/favorites';
import { FaUser } from 'react-icons/fa';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"
import useMatch from '@/queries/useMatch';
import useLogout from '@/queries/useLogout';
import resetOnNavigate from '@/hooks/resetOnNavigate';
import { useLocation } from 'wouter';

const Navbar = (props: BoxProps) => {
    const [location] = useLocation();
    const navigate = resetOnNavigate()
    const { favorites, clearFavorites } = useFavoritesStore(state => state)
    const { mutate: postMatch } = useMatch();
    const { mutate: postLogout } = useLogout();
    const reset = () => {
        clearFavorites()
        navigate('/browse')
    }
    const match = () => {
        postMatch([...favorites.values()], {
            onSuccess: data => navigate(`/match/${data}`)
        })
    }
    const logout = () => {
        postLogout(undefined, {
            onSuccess: () => navigate('/')
        })
    }

    return (
        <Box display="flex" w="100%" bg='bg.muted' p="2" minH="16" borderBottomWidth="1px" {...props}>
            <Container display="flex" alignItems="center" justifyContent="space-between">
                <Show when={location !== '/'} fallback={<span />}>
                <MenuRoot>
                    <MenuTrigger asChild>
                        <Icon cursor="pointer" as={FaUser} boxSize="24px" />
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem value="logout">
                            <Text onClick={logout}>Logout</Text>
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
                </Show>
                <MenuRoot>
                    <MenuTrigger asChild disabled={!favorites.size}>
                        <HStack gap={1}>
                            <FetchIcon color={!!favorites.size ? 'orange.solid' : undefined} />
                            {!!favorites.size && <Text fontWeight="semibold">{favorites.size}</Text>}
                        </HStack>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem value="Clear" onClick={reset}>
                            <Text>Clear Favorites</Text>
                        </MenuItem>
                        <MenuItem bg='orange.solid' value="Find Match" onClick={match}>
                            <Text>Find Match</Text>
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
            </Container>
        </Box>
    )
}

export default Navbar;
