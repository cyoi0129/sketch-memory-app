import { ListItem } from '../../_components';
import { getItemByTag, getTagById } from '../../_services/graphql';
import '../../_styles/list.scss';

const Tag = async ({ params }: { params: { id: string } }) => {
  const result = await getItemByTag(params.id);
  const tag_result = await getTagById(params.id);
  const item_list = result.data.tagItems;
  return (
    <main>
      <h1>{tag_result.data.tag.name}の作品一覧</h1>
      <ul className='item_list'>
        {item_list.map((item) => (
          <ListItem key={item.id} data={item} />
        ))}
      </ul>
    </main>
  );
};

export default Tag;