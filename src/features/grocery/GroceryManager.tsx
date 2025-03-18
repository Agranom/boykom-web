import { Tabs } from 'antd';
import Grocery from './Grocery';
import FridgeProducts from './FridgeProducts';

const items = [
  {
    key: 'groceries',
    label: 'Список покупок',
    children: <Grocery />,
  },
  {
    key: 'fridge',
    label: 'В холодильнике',
    children: <FridgeProducts />,
  },
];

const GroceryManager = () => {
  return (
    <Tabs
      defaultActiveKey="groceries"
      items={items}
      destroyInactiveTabPane
    />
  );
};

export default GroceryManager; 