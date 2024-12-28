import { FC } from 'react';
import Link from 'next/link';
import { IoPersonSharp, IoCalendarSharp } from 'react-icons/io5';

const ListItem: FC<ItemProps> = (props) => {
  const { id, title, image, date, author } = props.data;
  return (
    <li>
      <Link href={'/item/' + id}>
        <div className="image">
          <img src={`/images/${image}`} alt={title} />
        </div>
        <h2>{title}</h2>
        <div className="meta">
          <h3>
            <IoPersonSharp />
            {author.name}
          </h3>
          <div className="date">
            <IoCalendarSharp />
            {new Date(date).toLocaleDateString('ja-JP')}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
