import { FC } from 'react';
import { getItemById, getItemIds } from '../../_services/graphql';
import { IoPersonSharp, IoCalendarSharp } from 'react-icons/io5';
import { Review } from '@/app/_components';
import '../../_styles/item.scss';

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
  const result = await getItemIds();
  return result.data.items;
}

const Item: FC<PageProps> = async ({ params }) => {
  const id = (await params).id;
  const result = await getItemById(id);
  const { title, image, date, author, tags } = result.data.item;

  return (
    <main>
      <section className="item">
        <h1>{title}</h1>
        <img src={`/images/${image}`} alt={title} />
        <h2>
          <IoPersonSharp />
          {author.name}
        </h2>
        <h3>
          <IoCalendarSharp />
          {new Date(date).toLocaleDateString()}
        </h3>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </section>
      <Review id={id} />
    </main>
  );
};

export default Item;
