import useDogBreeds from '@/queries/useDogBreeds';
import {
    Center,
    CollapsibleContent,
    CollapsibleRoot,
    Container,
    HStack,
    Button,
    Input,
    Tag,
    createListCollection,
    Stack,
    Heading,
    CollapsibleTrigger,
    useDisclosure,
    Icon,
    SelectValueChangeDetails,
    SimpleGrid,
    GridItem,
    Box,
} from '@chakra-ui/react'
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from '@/components/ui/select';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Field } from './ui/field';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import useFilterStore from '@/stores/filters';
import SortButton from './SortButton';

const useBreedCollection = () => {
    const { data = [] } = useDogBreeds();
    return createListCollection({
        items: data.map(breed => ({
            label: breed,
            value: breed,
        }))
    })
}

const Filters = () => {
    const { setBreeds, zipCodes, addZipCode, removeZipCode } = useFilterStore((state) => state)
    const { open, onToggle } = useDisclosure({defaultOpen: true})
    const breeds = useBreedCollection();
    const [valid, setValid] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)
    const validate = (event: ChangeEvent<HTMLInputElement>) => {
        setValid(event.currentTarget.validity.valid)
    }
    const onSubmit = useCallback(() => {
        if (!inputRef.current) return;
        addZipCode(inputRef.current.value)
        inputRef.current.value = ''
    }, [inputRef.current?.value])
    const updateBreedFilter = useCallback((e: SelectValueChangeDetails) => {
        console.log(e.value)
        setBreeds(e.value)
    }, [])

    return (
        <Center
            position="sticky"
            zIndex="docked"
            top="16"
            left={0}
            right={0}
        >
            <Container
                background="bg.panel"
                boxShadow="xs"
                maxW={{ base: 'full', md: 'full' }}
                px="4"
                py="3"
            >
                    <HStack direction={{base: 'column'}}>
                        <Box minW={{base: '40%', md: "300px"}}>
                        <SelectRoot multiple collection={breeds} onValueChange={updateBreedFilter}>
                                <SelectTrigger clearable>
                                    <SelectValueText placeholder="Breeds" />
                                </SelectTrigger>
                                <SelectContent>
                                    {breeds.items?.map((breed) => (
                                        <SelectItem item={breed} key={breed.value}>
                                            {breed.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectRoot>
                        </Box>
                        <Box flexGrow={1}>
                        <Field>
                                <HStack gap={2} w="100%">
                                    <Input ref={inputRef} placeholder="Search zipcode" pattern="[0-9]{5}" required onChange={validate} />
                                    <Button disabled={!valid} onClick={onSubmit}>Add</Button>
                                </HStack>
                            </Field>
                        </Box>
                    </HStack>
                <HStack pt={2}>
                                {[...zipCodes.values()]?.map(zipCode => (
                                    <Tag.Root key={zipCode}>
                                        <Tag.Label>{zipCode}</Tag.Label>
                                        <Tag.EndElement>
                                            <Tag.CloseTrigger onClick={() => removeZipCode(zipCode)} />
                                        </Tag.EndElement>
                                    </Tag.Root>

                                ))}
                            </HStack>
            </Container>
        </Center>
    )
    return (
        <Center
            position="sticky"
            zIndex="docked"
            top="16"
            left={0}
            right={0}
        >
            <Container
                background="bg.panel"
                // borderRadius="l3"
                boxShadow="xs"
                // maxW={{ base: 'full', md: 'full' }}
                px="4"
                py="3"
            >
                <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "24px", md: "40px" }}>
                    <GridItem colSpan={{ base: 1, md: 3 }}>
                                    <SelectRoot multiple collection={breeds} size="sm" onValueChange={updateBreedFilter}>
                    <SelectLabel>Select Breeds</SelectLabel>
                                <SelectTrigger clearable>
                                    <SelectValueText placeholder="Breeds" />
                                </SelectTrigger>
                                <SelectContent>
                                    {breeds.items?.map((breed) => (
                                        <SelectItem item={breed} key={breed.value}>
                                            {breed.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectRoot>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 1 }}>
                    <SortButton />

                    </GridItem>
                </SimpleGrid>
                <Stack dir='column'>
                     
                </Stack>
                <Stack>
                    <CollapsibleRoot as={Stack} gap={3} open={open}>
                        <CollapsibleTrigger as={HStack} cursor="pointer" onClick={onToggle} justifyContent="center">
                            <Heading textAlign="center">Filters</Heading>
                            <Icon as={open ? FaCaretUp : FaCaretDown} />
                        </CollapsibleTrigger>
                        <CollapsibleContent as={Stack} gap={3}>
                            <SelectRoot multiple collection={breeds} size="sm" onValueChange={updateBreedFilter}>
                                <SelectLabel>Select Breeds</SelectLabel>
                                <SelectTrigger clearable>
                                    <SelectValueText placeholder="Breeds" />
                                </SelectTrigger>
                                <SelectContent>
                                    {breeds.items?.map((breed) => (
                                        <SelectItem item={breed} key={breed.value}>
                                            {breed.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectRoot>
                            <Field label="Zip Codes">
                                <HStack gap={2} w="100%">
                                    <Input ref={inputRef} placeholder="Search zipcode" pattern="[0-9]{5}" required onChange={validate} />
                                    <Button disabled={!valid} onClick={onSubmit}>Add</Button>
                                </HStack>
                            </Field>
                            <HStack>
                                {[...zipCodes.values()]?.map(zipCode => (
                                    <Tag.Root key={zipCode}>
                                        <Tag.Label>{zipCode}</Tag.Label>
                                        <Tag.EndElement>
                                            <Tag.CloseTrigger onClick={() => removeZipCode(zipCode)} />
                                        </Tag.EndElement>
                                    </Tag.Root>

                                ))}
                            </HStack>
                        </CollapsibleContent>
                    </CollapsibleRoot>
                </Stack>
            </Container>
        </Center>
    )
}

export default Filters;

