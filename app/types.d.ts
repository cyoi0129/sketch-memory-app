type BasicItemType = {
  id: string;
  name: string;
};

type ItemType = {
  id: string;
  title: string;
  image: string;
  date: string;
  author: BasicItemType;
  tags: Array<BasicItemType>;
};

type ReviewItem = {
  id: string;
  comment: string;
  score: number;
  reviewer: string;
  item: string;
};

type PostReviewData = {
  comment: string;
  score: number;
  reviewer: string;
  item: string;
};

type ItemProps = {
  data: ItemType;
};

type ItemListResponse = {
  data: {
    items: Array<ItemType>;
  };
};

type ItemIdsResponse = {
  data: {
    items: Array<{ id: string }>;
  };
};

type AuthorIdsResponse = {
  data: {
    authors: Array<{ id: string }>;
  };
};

type TagIdsResponse = {
  data: {
    tags: Array<{ id: string }>;
  };
};

type MetaListResponse = {
  data: {
    tags: Array<BasicItemType>;
    authors: Array<BasicItemType>;
  };
};

type TagItemListResponse = {
  data: {
    tagItems: Array<ItemType>;
  };
};

type TagItemResponse = {
  data: {
    tag: BasicItemType;
  };
};

type AuthorItemResponse = {
  data: {
    author: BasicItemType;
  };
};

type AuthorItemListResponse = {
  data: {
    authorItems: Array<ItemType>;
  };
};

type ReviewListResponse = {
  data: {
    itemReviews: Array<ReviewItemType>;
  };
};

type ReviewPostResponse = {
  data: {
    createReview: { id: string };
  };
};

type ItemResponse = {
  data: {
    item: ItemType;
  };
};

type ImageType = {
  name: string;
  url: string;
};

type ReviewProps = {
  id: string;
};

type FormProps = {
  id: string;
  action: (review: ReviewItem) => void;
};

type PageProps = {
  params: Promise<{ id: string }>
}
