# PODO AgTech Team public components-DatePicker

install

```
npm i podo-datepicker-component
```

import

```ts
import DatePicker from "podo-datepicker-component";
```

usage

```ts
const [open, setOpen] = useState(true);
const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);

return (
  <DatePicker
    isOpen={open}
    setIsOpen={setOpen}
    returnStartDate={setStartDate}
    returnEndDate={setEndDate}
  />
);
```
