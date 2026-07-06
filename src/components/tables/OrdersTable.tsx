import { useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Checkbox,
  Divider,
  Tag,
} from "antd";

import type { ColumnsType, TableProps } from "antd/es/table";

import { SettingOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import type { Order } from "@/redux/order/types/orderTypes";

export default function OrdersTable() {
  const { data: invoices, loading } = useSelector(
    (state: RootState) => state.order
  );

  const allColumns: ColumnsType<Order> = [
    {
      title: "Invoice ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status: string) => {
        const colorMap: Record<string, string> = {
          Paid: "green",
          Pending: "orange",
          Overdue: "red",
          Processing: "blue",
          "Duplicate Risk": "purple",
        };

        return (
          <Tag color={colorMap[status] || "default"}>
            {status}
          </Tag>
        );
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",

      sorter: (a, b) =>
        (a.amount ?? 0) - (b.amount ?? 0),

      render: (val: number) =>
        val == null
          ? "—"
          : `₹${val.toLocaleString()}`,
    },

    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",

      sorter: (a, b) =>
        new Date(a.invoiceDate).getTime() -
        new Date(b.invoiceDate).getTime(),
    },

    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Invoice Type",
      dataIndex: "invoiceType",
      key: "invoiceType",
    },

    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",

      sorter: (a, b) =>
        (a.riskScore ?? 0) -
        (b.riskScore ?? 0),

      render: (score: number) => {
        let color = "green";

        if (score > 70) {
          color = "red";
        } else if (score > 40) {
          color = "orange";
        }

        return (
          <Tag color={color}>
            {score}
          </Tag>
        );
      },
    },

    {
      title: "Duplicate %",
      dataIndex: "duplicateProbability",
      key: "duplicateProbability",

      render: (val: number) => (
        <Tag color={val > 70 ? "red" : "blue"}>
          {val}%
        </Tag>
      ),
    },

    {
      title: "Payment",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },

    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },

    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const defaultSelected = allColumns
    .slice(0, 8)
    .map((c) => String(c.key));

  const [selectedCols, setSelectedCols] =
    useState<string[]>(defaultSelected);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [tempSelected, setTempSelected] =
    useState<string[]>(selectedCols);

  const [search, setSearch] = useState("");

  const filteredColumns = useMemo(
    () =>
      allColumns.filter((col) =>
        selectedCols.includes(String(col.key))
      ),
    [selectedCols]
  );

  const filteredData = useMemo(() => {
    if (!search) return invoices;

    const s = search.toLowerCase();

    return invoices.filter((row) =>
      Object.values(row).some((value) =>
        value
          ?.toString()
          .toLowerCase()
          .includes(s)
      )
    );
  }, [invoices, search]);

  const openColumnsModal = () => {
    setTempSelected(selectedCols);
    setIsModalOpen(true);
  };

  const applyColumns = () => {
    setSelectedCols(tempSelected);
    setIsModalOpen(false);
  };

  const cancelModal = () => {
    setTempSelected(selectedCols);
    setIsModalOpen(false);
  };

  const toggleColumnTemp = (key: string) => {
    setTempSelected((prev) =>
      prev.includes(key)
        ? prev.filter((p) => p !== key)
        : [...prev, key]
    );
  };

  const setDefault8 = () => {
    setTempSelected(
      allColumns
        .slice(0, 8)
        .map((c) => String(c.key))
    );
  };

  const tableProps: TableProps<Order> = {
    columns: filteredColumns,
    dataSource: filteredData,
    rowKey: "id",
    loading,
    pagination: { pageSize: 8 },
    scroll: { x: "max-content" },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ width: 300 }}>
          <Input.Search
            placeholder="Search invoices..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            allowClear
            enterButton
            size="middle"
          />
        </div>

        <Button
          icon={<SettingOutlined />}
          onClick={openColumnsModal}
        >
          Columns
        </Button>
      </div>

      <Table {...tableProps} />

      <Modal
        title="Select invoice columns"
        open={isModalOpen}
        onOk={applyColumns}
        onCancel={cancelModal}
        okText="Apply"
        cancelText="Cancel"
        width={520}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "rgba(0,0,0,0.65)",
            }}
          >
            Choose visible columns
          </div>

          <div>
            <Button
              size="small"
              onClick={setDefault8}
              style={{ marginRight: 8 }}
            >
              Default 8
            </Button>

            <Button
              size="small"
              onClick={() =>
                setTempSelected(
                  allColumns.map((c) =>
                    String(c.key)
                  )
                )
              }
            >
              Select All
            </Button>
          </div>
        </div>

        <Divider style={{ margin: "8px 0" }} />

        <div
          style={{
            maxHeight: 340,
            overflowY: "auto",
            paddingRight: 8,
          }}
        >
          {allColumns.map((col) => {
            const key = String(col.key);

            const title =
              typeof col.title === "string"
                ? col.title
                : String(col.key);

            return (
              <div
                key={key}
                style={{ marginBottom: 8 }}
              >
                <Checkbox
                  checked={tempSelected.includes(
                    key
                  )}
                  onChange={() =>
                    toggleColumnTemp(key)
                  }
                >
                  {title}
                </Checkbox>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}