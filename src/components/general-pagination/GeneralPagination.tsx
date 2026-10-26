import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function GeneralPagination({currentPage,totalPages,onPageChange}: PaginationProps) {
    if (totalPages <= 1) return null;
    return (
        <div className="mt-6">
            <Pagination>
                <PaginationContent className="flex space-x-2" key={"123"}>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-accent"}`}
                        />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => {
                        if ( i+1-currentPage>6) {
                            return <></>
                        }
                        return (
                            <PaginationItem key={i + 1}>
                                <PaginationLink
                                    onClick={() => onPageChange(i + 1)}
                                    isActive={currentPage === i + 1}
                                    className={`cursor-pointer hover:bg-accent ${
                                        currentPage === i + 1 ? "bg-accent" : ""
                                    }`}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-accent"}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}