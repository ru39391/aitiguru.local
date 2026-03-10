import type { FC } from "react";
import { Heading } from "@/entities/heading";
import { SearchForm } from "@/features/search-form";

const PositionsHeader: FC = () => <Heading title="Товары"><SearchForm /></Heading>;

export default PositionsHeader;
