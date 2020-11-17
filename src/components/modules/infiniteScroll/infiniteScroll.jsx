import React, { useState, useRef, useCallback } from "react";
import propTypes from "prop-types";
import useCustomHook from "./useCustomHook";
import InfiniteScrollContainer from "./infiniteScroll.style";

function InfiniteScroll({ ListItem }) {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, listData, hasMore } = useCustomHook(pageNumber);
  const observer = useRef();

  const lastListItemElementRef = useCallback(
    (node) => {
      // last item visible event
      // if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const firstListItemElementRef = useCallback(
    (node) => {
      // last item visible event
      // if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const renderList = () => {
    return listData.map((data, index) => {
      if (listData.length === index + 1) {
        return (
          <div ref={lastListItemElementRef} key={index} className="lastItem">
            <ListItem {...data} />
          </div>
        );
      }
      if (index === 0) {
        return (
          <div ref={firstListItemElementRef} key={index} className="firstItem">
            <ListItem {...data} />
          </div>
        );
      }
      return (
        <div key={index}>
          <ListItem {...data} />
        </div>
      );
    });
  };

  return (
    <InfiniteScrollContainer>
      {renderList ? renderList() : null}
      {loading ? <div>Loading...</div> : null}
      {error ? <div>Error...</div> : null}
    </InfiniteScrollContainer>
  );
}

InfiniteScroll.propTypes = {
  ListItem: propTypes.node,
};

export default InfiniteScroll;
