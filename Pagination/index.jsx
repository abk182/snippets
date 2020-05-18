// @flow
import React from 'react';
import { useDictionary } from 'context/LanguageProvider';
import { Select } from '@lora/components';

import './style.css';

type Props = {
  offset?: number,
  limit?: number,
  count?: number,
  options?: Array<{ text: string, value: number }>,
  onChange: ({ offset: number, limit: number }) => void,
  className?: string
};

const Pagination = ({
  offset = Pagination.defaultProps.offset,
  limit = Pagination.defaultProps.limit,
  count = Pagination.defaultProps.count,
  options = Pagination.defaultProps.options,
  onChange,
  className = Pagination.defaultProps.className,
}: Props) => {
  const dictionary = useDictionary();

  const page = Math.floor(+offset / +limit) + 1;
  const pages = Math.ceil(+count / +limit);

  const setPage = (num: number) => {
    onChange({ offset: (+num - 1) * limit, limit });
  };

  const setRange = (num: number) => {
    onChange({ offset: 0, limit: +num });
  };

  return (
    <div styleName="pagintaion-container" className={className}>
      <div styleName="current-records-range">
        {+offset + 1}
        {' - '}
        {+offset + 1 + +limit > +count ? +count : +offset + +limit}
        {' '}
        {dictionary.outOf.toLocaleLowerCase()}
        {' '}
        {count}
      </div>
      <div styleName="page-control">
        <span
          role="button"
          tabIndex={0}
          onKeyPress={() => page > 1 && setPage(1)}
          onClick={() => page > 1 && setPage(1)}
          styleName="btn to-first"
        />
        <span
          role="button"
          tabIndex={0}
          onKeyPress={() => page > 1 && setPage(page - 1)}
          onClick={() => page > 1 && setPage(page - 1)}
          styleName="btn to-prev"
        />
        <span>{dictionary.page}</span>
        <input
          type="text"
          styleName="page-num-input"
          value={page}
          onChange={({ target: { value } }) => {
            const num = Number(value);
            if (Number.isInteger(num)) {
              if (num >= 1 && num <= pages) setPage(num);
              if (num > pages) setPage(pages);
              if (num < 1) setPage(1);
            }
          }}
        />
        <span>{`/ ${pages}`}</span>
        <span
          role="button"
          tabIndex={0}
          onKeyPress={() => page < pages && setPage(page + 1)}
          onClick={() => page < pages && setPage(page + 1)}
          styleName="btn to-next"
        />
        <span
          role="button"
          tabIndex={0}
          onKeyPress={() => page < pages && setPage(pages)}
          onClick={() => page < pages && setPage(pages)}
          styleName="btn to-last"
        />
      </div>
      <div styleName="records-range-selector">
        <span>{`${dictionary.show}:`}</span>
        <Select
          key={limit}
          options={options}
          width={70}
          height={30}
          defaultValue={limit}
          onChange={setRange}
          styleName="records-range-select-input"
        />
      </div>
    </div>
  );
};

Pagination.defaultProps = {
  offset: 0,
  limit: 100,
  count: 0,
  options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(num => ({
    text: `${num}`,
    value: num,
  })),
  className: undefined,
};

export default Pagination;
