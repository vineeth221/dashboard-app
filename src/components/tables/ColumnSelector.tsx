import { Button, Dropdown, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import type { Order } from "@/redux/order/types/orderTypes";

type Props = {
  allColumns: ColumnsType<Order>;
  selected: string[];
  onChange: (keys: string[]) => void;
};

export default function ColumnSelector({ allColumns, selected, onChange }: Props) {

  const toggleColumn = (key: string) => {
    const isSelected = selected.includes(key);

    if (isSelected) {
      onChange(selected.filter((col) => col !== key));
    } else {
      onChange([...selected, key]);
    }
  };

  const renderMenuContent = () => (
    <div style={{ padding: 8, width: 280 }}>
      {allColumns.map((column) => {
        const key = String(column.key);
  
        return (
          <div key={key} style={{ marginBottom: 6 }}>
            <Checkbox
              checked={selected.includes(key)}
              onChange={() => toggleColumn(key)}
            >
              {String(column.title)}
            </Checkbox>
          </div>
        );
      })}
  
      <div style={{ marginTop: 8 }}>
        <Button
          size="small"
          onClick={() => {
            const firstSeven = allColumns
              .slice(0, 7)
              .map((col) => String(col.key));
            onChange(firstSeven);
          }}
        >
          Default 7
        </Button>
      </div>
    </div>
  );
  
  const menuItems: MenuProps["items"] = [
    {
      key: "column-selector",
      label: renderMenuContent(),
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <Button>Columns</Button>
    </Dropdown>
  );
}
