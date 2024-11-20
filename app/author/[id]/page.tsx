import { FC } from 'react';
import { ListItem } from '../../_components';
import { getItemByAuthor, getAuthorById, getAuthorIds } from '../../_services/graphql';
import '../../_styles/list.scss';

export const generateStaticParams = async (): Promise<{id: string}[]> => {
  const result = await getAuthorIds();
  return result.data.authors;
}

const Author: FC<PageProps> = async ({ params }) => {
  const id = (await params).id;
  const result = await getItemByAuthor(id);
  const author_result = await getAuthorById(id);
  const item_list = result.data.authorItems;
  return (
    <main>
      <h1>{author_result.data.author.name}の作品一覧</h1>
      <ul className='item_list'>
        {item_list.map((item) => (
          <ListItem key={item.id} data={item} />
        ))}
      </ul>
    </main>
  );
};

export default Author;
