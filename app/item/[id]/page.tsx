import { getItemById } from '../../_services/graphql';
import { IoPersonSharp, IoCalendarSharp } from 'react-icons/io5';
import { Review } from '@/app/_components';
import '../../_styles/item.scss';

const Item = async ({ params }: { params: { id: string } }) => {
  const result = await getItemById(params.id);
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
      <Review id={params.id} />
    </main>
  );
};

export default Item;
