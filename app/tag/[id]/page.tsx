import { FC } from 'react';
import { ListItem } from '../../_components';
import { getItemByTag, getTagById, getTagIds } from '../../_services/graphql';
import '../../_styles/list.scss';

export const generateStaticParams = async (): Promise<{id: string}[]> => {
  const result = await getTagIds();
  return result.data.tags;
}

const Tag: FC<PageProps> = async ({ params }) => {
  const id = (await params).id;
  const result = await getItemByTag(id);
  const tag_result = await getTagById(id);
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