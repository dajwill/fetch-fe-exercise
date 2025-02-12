import useSortStore from "@/stores/sorts";
import { Tag } from "@chakra-ui/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const SortButton = () => {
    const { order, toggleOrder } = useSortStore(state => state)
    return (
        <Tag.Root size="xl" rounded="full" alignSelf="end" onClick={toggleOrder}>
            <Tag.Label>Breed</Tag.Label>
            <Tag.EndElement>
                {order === 'desc' ? <FaCaretDown /> : <FaCaretUp />}
            </Tag.EndElement>
        </Tag.Root>
    )
}

export default SortButton;