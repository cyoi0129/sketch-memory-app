import '../_styles/navigator.scss';
import { FC } from 'react';
import Link from 'next/link';
import { getMetas } from '../_services/graphql';

const Navigator: FC = async () => {
  const result = await getMetas();
  const authors = result.data.authors;
  const tags = result.data.tags;

  return (
    <section className='navigator'>
      <div>
        <h2>作者</h2>
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              <Link href={'/author/' + author.id}>{author.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>タグ</h2>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link href={'/tag/' + tag.id}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Navigator;
