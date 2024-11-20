import { ListItem } from '../../_components';
import { getItemByAuthor, getAuthorById } from '../../_services/graphql';
import '../../_styles/list.scss';

const Author = async ({ params }: { params: { id: string } }) => {
  const result = await getItemByAuthor(params.id);
  const author_result = await getAuthorById(params.id);
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
