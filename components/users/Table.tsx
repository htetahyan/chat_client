'use client';
import React, { useEffect } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Input, Pagination} from "@nextui-org/react";


import { EyeClosedIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {columns, users} from "./data";
import { useGetUsersListQuery } from "~/actions/query/UsersApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import TableHead from "./TableHead";
import { toast } from "sonner";
import { setPage } from "~/actions/query/UsersListSlice";

const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  null: "success",
  paused: "danger",
  vacation: "warning",
};



export default function TableUsers() {
  const {users,totalPages,page,name,role,status}=useSelector((state:RootState)=>state.userSlice)
const dispatch=useDispatch()
  const {isLoading,isFetching,data}=useGetUsersListQuery({page,name:name??'',role:role??'',status:''},{
    refetchOnMountOrArgChange:true
  })

  const renderCell = React.useCallback((user:any, columnKey: React.Key) => {
    const cellValue = user[columnKey as any ];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={user?.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user?.team}</p>
          </div>
        );case "phone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[null]} size="sm" variant="flat">
            {cellValue ?? "Active"}
          </Chip>
        );
        case "createdAt":
          return (
            <div className="capitalize"  >
              { new Date(cellValue).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }  
            </div>
          );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeClosedIcon />
              </span>
            </Tooltip>
            <Tooltip  content="Edit user">
              <span onClick={()=> toast.success(user.role)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <h1>Edit</h1>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
Delete              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
   <TableHead/>
            <Table
              bottomContent={
                totalPages > 0 ? (
                  <div className="flex w-full justify-center">
                  <Pagination
                  isDisabled={isLoading || isFetching}
  isCompact
  showControls
  showShadow
  color="primary"
  page={page + 1} // Adjust for display (1-based index)
  onChange={(p) =>{ dispatch(setPage(p - 1))

    
  }} // Convert to 0-based index
  total={totalPages} // This should be the total number of pages, typically 1-based
/>

                  </div>
                ) : null
              }
           
            aria-label="Example table with custom cells">
      <TableHeader columns={columns} >
        {(column) => (
          <TableColumn key={column?.uid} align={column?.uid === "actions" ? "center" : "start"}>
            {column?.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody isLoading={isLoading || isFetching} items={users??{}}>
        {(item) => (
          <TableRow  key={item?.phone}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
      
    </Table>

    </>
  );
}
