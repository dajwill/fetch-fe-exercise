import { Container, Heading, Input, Stack, Text, Button } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import useLogin from '@/queries/useLogin'
import { useCallback } from 'react'
import { useLocation } from 'wouter'


export const Block = () => {
    const [_, navigate] = useLocation();
    const { mutate } = useLogin();

    const onSubmit = useCallback((formData: FormData) => {
        const name = formData.get('name') as string | null
        const email = formData.get('email') as string | null

        if (!name || !email) return;

        mutate({name, email}, {
            onSuccess: () => navigate('/browse')
        })
    }, [mutate])

    return (
        <Container maxW="md" py={{ base: '12', md: '24' }}>
            <form action={onSubmit}>
                <Stack gap={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: '2xl', md: '3xl' }}>Welcome</Heading>
                    <Text color="fg.muted">Login to browse dogs.</Text>
                </Stack>
    
                <Stack gap="6">
                    <Stack gap="4">
                        <Field label="Name" required>
                            <Input type="text" name='name' />
                        </Field>
                        <Field label="Email" required>
                            <Input type="email" name="email" />
                        </Field>
                    </Stack>
                    <Stack>
                        <Button type="submit">Sign in</Button>
                    </Stack>
                </Stack>
            </form>
        </Container>
    )
}

export default Block;
