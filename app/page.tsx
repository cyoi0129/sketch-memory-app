import { FC } from 'react';
import { ListItem, Navigator } from './_components';
import { getItems } from './_services/graphql';
import './_styles/list.scss';

const Home: FC = async () => {
  const result = await getItems();
  const item_list = result.data.items;
  return (
    <main>
      <Navigator />
      <ul className="item_list">
        {item_list.map((item) => (
          <ListItem key={item.id} data={item} />
        ))}
      </ul>
    </main>
  );
};

export default Home;
