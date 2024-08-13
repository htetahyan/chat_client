import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setName, setRole } from '~/actions/query/UsersListSlice'
import { RootState } from '~/store'

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timerId;
  return (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
};

const TableHead = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
const {name}=useSelector((state:RootState)=>state.userSlice)
  // Debounce the dispatch function for search term
  const debouncedDispatch = debounce((value) => {
    dispatch(setName(value));
  }, 300); // Adjust the debounce delay as needed

  useEffect(() => {
    debouncedDispatch(searchTerm);
  }, [searchTerm]);

  return (
    <div className='flex w-full h-[10vh] justify-between gap-2 items-center'>
      <div className='w-full sm:max-w-[44%]'>
        <h2>Search</h2>
        <Input
          isClearable
          color='primary'
          className="w-full sm:max-w-[44%] mb-2"
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onClear={() => setSearchTerm('')}
          startContent={<MagnifyingGlassIcon />}
        />
      </div>
      <div className='flex gap-2 w-[50vw]'>
        <Select
          color='primary'
          label='filter by user role'
          items={animals}
          defaultSelectedKeys={["null"]}
          onChange={(e) => dispatch(setRole(e.target.value))}
        >
          {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
        </Select>
        <Select
          color='primary'
          label='filter by status'
          items={filterByStatus}
          defaultSelectedKeys={["null"]}
          onChange={(e) => dispatch(setRole(e.target.value))}
        >
          {(filterByStatus) => <SelectItem key={filterByStatus.key}>{filterByStatus.label}</SelectItem>}
        </Select>
      </div>
    </div>
  );
};

export default TableHead;

export const filterByAscOrDesc = [
  { key: "asc", label: "Ascending" },
  { key: "desc", label: "Descending" },
];
export const filterByStatus = [
  { key: "null", label: "ALL" },
  { key: "ACTIVE", label: "ACTIVE" },
  { key: "INACTIVE", label: "INACTIVE" },
]
export const animals = [
  { key: "null", label: "ALL" },
  { key: "USER", label: "USER" },
  { key: "CUSTOMER_SERVICE", label: "CUSTOMER_SERVICE" },
  { key: "ADMIN", label: "ADMIN" },
  { key: "HTET_AH_YAN", label: "HTET_AH_YAN" },
  { key: "STUDENT_AFFAIR", label: "STUDENT_AFFAIR" },
 
];
