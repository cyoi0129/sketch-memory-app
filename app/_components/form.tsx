'use client';
import { FC, useEffect, useState } from 'react';
import Loading from './loading';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../_services/graphql';
import { IoHeart } from 'react-icons/io5';
import { BiSolidMessageRoundedEdit } from 'react-icons/bi';
import '../_styles/form.scss';

const Form: FC<FormProps> = (props) => {
  const { id, action } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  /**
   * Check Validation
   * @returns
   */
  const checkValidate = (): boolean => {
    if (name === '') return true;
    if (comment === '') return true;
    if (score === 0) return true;
    return false;
  };

  /**
   * Change Name
   * @param value
   */
  const changeName = (value: string): void => {
    setName(value);
  };

  /**
   * Change Comment
   * @param value
   */
  const changeComment = (value: string): void => {
    setComment(value);
  };

  /**
   * Change Score
   * @param value
   */
  const changeScore = (value: number): void => {
    setScore(value);
  };

  /**
   * Send Review Data to API
   */
  const sendReview = (): void => {
    postProcess({
      variables: {
        comment: comment,
        score: score,
        reviewer: name,
        item: id,
      },
    });
  };

  const [postProcess, { data, loading, error }] = useMutation(CREATE_REVIEW);

  const doReset = (): void => {
    setName('');
    setComment('');
    setScore(0);
  };

  useEffect(() => {
    if (error) {
      alert('送信失敗');
      console.log(error.message);
      setIsLoading(false);
    } else if (data) {
      alert('送信成功');
      const new_review: ReviewItem = {
        id: data.createReview.id,
        comment: comment,
        score: score,
        reviewer: name,
        item: id,
      };
      action(new_review);
      doReset();
      setIsLoading(false);
    } else if (loading) {
      setIsLoading(true);
    }
  }, [data, loading, error]);

  return (
    <div className="form">
      <h2>
        <BiSolidMessageRoundedEdit />
        この作品のレビューを投稿する
      </h2>
      <dl>
        <dt>名前</dt>
        <dd>
          <input type="text" name="name" autoComplete="off" value={name} onChange={(e) => changeName(e.target.value)} />
        </dd>
        <dt>レビューを投稿する</dt>
        <dd>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < score ? 'filled' : ''} onClick={() => changeScore(i + 1)}>
              <IoHeart />
            </span>
          ))}
        </dd>
        <dt>コメント</dt>
        <dd>
          <textarea name="comment" value={comment} onChange={(e) => changeComment(e.target.value)}></textarea>
        </dd>
      </dl>
      <button disabled={checkValidate()} onClick={sendReview}>
        送信
      </button>
      {isLoading ? <Loading /> : null}
    </div>
  );
};

export default Form;
