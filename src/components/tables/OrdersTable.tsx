import { useMemo, useState } from "react";
import { Table, Input, Button, Modal, Checkbox, Divider } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { SettingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { Order } from "@/redux/order/types/orderTypes";

export default function OrdersTable() {
  const { data: orders, loading } = useSelector((state: RootState) => state.order);

  const allColumns: ColumnsType<Order> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => (a.amount ?? 0) - (b.amount ?? 0),
      render: (val: number) => (val == null ? "—" : `₹${val}`),
    },
    { title: "Payment", dataIndex: "paymentMode", key: "paymentMode" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Delivery", dataIndex: "deliveryPartner", key: "deliveryPartner" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => (a.rating ?? 0) - (b.rating ?? 0),
    },
  ];

  const defaultSelected = allColumns.slice(0, 7).map((c) => String(c.key));
  const [selectedCols, setSelectedCols] = useState<string[]>(defaultSelected);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedCols);
  const [search, setSearch] = useState("");

  const filteredColumns = useMemo(
    () => allColumns.filter((col) => selectedCols.includes(String(col.key))),
    [selectedCols]
  );

  const filteredData = useMemo(() => {
    if (!search) return orders;
    const s = search.toLowerCase();
    return orders.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(s)
      )
    );
  }, [orders, search]);

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
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const setDefault7 = () => {
    setTempSelected(allColumns.slice(0, 7).map((c) => String(c.key)));
  };

  const tableProps: TableProps<Order> = {
    columns: filteredColumns,
    dataSource: filteredData,
    rowKey: "id",
    loading,
    pagination: { pageSize: 10 },
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
        <div style={{ width: 260 }}>
          <Input.Search
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            enterButton
            size="middle"
          />
        </div>

        <Button icon={<SettingOutlined />} onClick={openColumnsModal}>
          Columns
        </Button>
      </div>

      <Table {...tableProps} />
      <Modal
        title="Select columns to display"
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
          <div style={{ fontSize: 14, color: "rgba(0,0,0,0.65)" }}>
            Choose columns
          </div>

          <div>
            <Button size="small" onClick={setDefault7} style={{ marginRight: 8 }}>
              Default 7
            </Button>
            <Button
              size="small"
              onClick={() =>
                setTempSelected(allColumns.map((c) => String(c.key)))
              }
            >
              Select All
            </Button>
          </div>
        </div>

        <Divider style={{ margin: "8px 0" }} />

        <div style={{ maxHeight: 340, overflowY: "auto", paddingRight: 8 }}>
          {allColumns.map((col) => {
            const key = String(col.key);
            const title =
              typeof col.title === "string"
                ? col.title
                : String(col.key);

            return (
              <div key={key} style={{ marginBottom: 8 }}>
                <Checkbox
                  checked={tempSelected.includes(key)}
                  onChange={() => toggleColumnTemp(key)}
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
