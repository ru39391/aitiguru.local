import type { FC } from "react";
import { Heading } from "@/entities/heading";
import { LogoutBtn } from "@/features/logout-btn";
import { SearchForm } from "@/features/search-form";

const PositionsHeader: FC = () => <Heading title="Товары" aside={<LogoutBtn />}><SearchForm /></Heading>;

export default PositionsHeader;
