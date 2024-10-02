import React from "react";
import { Table } from "antd";

const CategoriesTable = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Active",
      dataIndex: "active",
    },
  ];
  const data = [
    {
      key: "1",
      id: "1",
      name: "Men clothes",
      description: "New York No. 1 Lake Park",
      active: "...",
    },
    {
      key: "2",
      id: "2",
      name: "Women fashion",
      description: "New York No. 2 Lake Park",
      active: "...",
    },
    {
      key: "3",
      id: "3",
      name: "Kids clothes",
      description: "New York No. 3 Lake Park",
      active: "...",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div className="border-2 border-indigo-600 m-2 p-2">
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        rowSelection={{
          ...rowSelection,
        }}
      />
    </div>
  );
};

export default CategoriesTable;
