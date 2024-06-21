declare const QuickSelector: ({ startDate, endDate, setStartDate, setEndDate, setCurrentDate, }: {
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<null | Date>>;
    setEndDate: React.Dispatch<React.SetStateAction<null | Date>>;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => import("react/jsx-runtime").JSX.Element;
export default QuickSelector;
