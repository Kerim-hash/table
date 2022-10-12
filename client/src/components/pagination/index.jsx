import React from "react";
import "./index.css";
const PaginationNav = ({ prevPage, pagination, nextPage, changePage }) => {
  return (
    <nav className="pagination">
      <a href="/#" className="pagination-previous" onClick={prevPage}>
        Previous
      </a>
      <ul className="pagination-list">
        {pagination.map((page) => {
          if (!page.ellipsis) {
            return (
              <li key={page.id}>
                <a
                  href="/#"
                  className={
                    page.current
                      ? "pagination-link is-current"
                      : "pagination-link"
                  }
                  onClick={(e) => changePage(page.id, e)}
                >
                  {page.id}
                </a>
              </li>
            );
          } else {
            return (
              <li key={page.id}>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            );
          }
        })}
      </ul>
      <a href="/#" className="pagination-next" onClick={nextPage}>
        Next
      </a>
    </nav>
  );
};

export default PaginationNav;
